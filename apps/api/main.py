import live_request as lr
import autoSuggest as aS
import indicative_prices as iP
import user_geo as uG
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from langchain_ollama import ChatOllama
from langchain.agents import create_agent
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.tools import tool
import uuid
from typing import Optional, Dict, List

# Inicializar la aplicación FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create model

model = ChatOllama(model="gemma4:e2b", temperature=0.3, model_kwargs={"think": False})
tools = [lr.search_flights, aS.search_airport_code, iP.search_indicative_flights, uG.GeoApi]
agent = create_agent(model, tools=tools, system_prompt="""You are a friendly and informal travel advisor. A woman named Alex.
        Your primary goal is to help users find flights using the Skyscanner tool.
        Your tone is of an interesting buddy who travels a lot and knows a lot about interesting places all around the world.
        CRITICAL: 
        1. If you have the origin and destination of a trip, you MUST call 'search_indicative_flights' and give the user the relevant results.
        2. If you have enough information (origin, destination, and dates), you may call 'search_airport_code' to get the airports of the locations
        and then ALWAYS TRY TO INFORM THE USER OF THE SPECIFIC AIRPORTS ON THOSE LOCATIONS THAT YOU GET FROM THAT FUNCTION.
        3. Do not tell the user you 'will search'; instead, perform the search and then present the results.
        4. Once you have flight results, summarize the best options for the user.
        5. DO NOT ask for permission to search. 
        6. DO NOT say "I will now search for flights." 
        7. If you have the origin, destination, and date, try using the search_airport_code function to find the specific airport of
        the origin and destination AND THEN CALL 'search_flights' IMMEDIATELY
        8. Only respond to the user AFTER you have the flight results from the tool.
        9. NEVER, EVER say "hold on a moment while I check Skyscanner tool for the best options".
        10. If the user doesn't specify where they are flying from (the origin of the trip) YOU MUST CALL 'GeoApi' to get the user location
        AND IF YOU USE THAT LOCATION MAKE SURE TO ASK THE USER IF THAT IS THE LOCATION THEY WANT TO USE OR IF THEY PREFER ANOTHER.
        You MUST use the search_flights tool. Convert city names to 3-letter
        IATA codes (e.g., 'London' to 'LHR') before calling the tool.
        Always provide dates in year, month, day integers.""")

class AgentFormAnswer(BaseModel):
    questionId: str
    question: str
    answer: str

class SendPromptRequest(BaseModel):
    prompt: str
    conversation_id: Optional[str] = None
    agent_type: Optional[str] = None
    agent_answers: List[AgentFormAnswer] = []

history_store: Dict[str, List] = {}

# Definir un endpoint (una ruta)
@app.post("/")
def send_prompt_to_agent(request: SendPromptRequest):
    # 1. Generate a new ID if it's the first message, otherwise use the existing one
    conv_id = request.conversation_id or str(uuid.uuid4())

    if conv_id not in history_store:
        history_store[conv_id] = []

    agent_context = ""

    if request.agent_type and request.agent_answers:
        formatted_answers = "\n".join(
            [
                f"- {item.question}: {item.answer}"
                for item in request.agent_answers
            ]
        )

        agent_context = f"""
            Selected travel mode: {request.agent_type}

            User preferences collected from the form:
            {formatted_answers}

            Use these preferences as context when answering. Do not repeat them mechanically unless useful.
        """

    user_content = request.prompt

    if agent_context:
        user_content = f"""
            {agent_context}

            User prompt:
            {request.prompt}
        """

    # 3. Add current user message to the history
    history_store[conv_id].append({"role": "user", "content": user_content})

    # 4. Invoke the agent with the entire history for context
    result = agent.invoke({"messages": history_store[conv_id]})

    # 5. Extract the AI response and update the history
    ai_message = result["messages"][-1]
    history_store[conv_id].append(ai_message)

    # 6. Return the answer AND the conversationId
    return {
        "answer": ai_message.content,
        "conversationId": conv_id  # The frontend MUST save this and send it back next time
    }
