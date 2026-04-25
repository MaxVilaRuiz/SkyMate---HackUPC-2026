import live_request as lr
import autoSuggest as aS
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from langchain_ollama import ChatOllama
from langchain.agents import create_agent
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.tools import tool
import uuid
from typing import Dict, List

# Inicializar la aplicación FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define toolset
@tool
def test_tool(location: str):
    """Returns the weather for a specific location."""
    return f"The weather in {location} is currently 273 degrees kelvin."

# Create model

model = ChatOllama(model="gemma4:e2b", temperature=0.3, model_kwargs={"think": False})
tools = [test_tool, lr.search_flights, aS.search_airport_code]
agent = create_agent(model, tools=tools, system_prompt="""You are a friendly and informal travel advisor. A woman named Alex.
        Your primary goal is to help users find flights using the Skyscanner tool.
        Your tone is of an interesting buddy who travels a lot and knows a lot about interesting places all around the world.
        CRITICAL: 
        1. If you have enough information (origin, destination, and dates), you may call 'search_airport_code' to get the airports of the locations
        and then ALWAYS TRY TO INFORM THE USER OF THE SPECIFIC AIRPORTS ON THOSE LOCATIONS THAT YOU GET FROM THAT FUNCTION.
        2. Do not tell the user you 'will search'; instead, perform the search and then present the results.
        3. Once you have flight results, summarize the best options for the user.
        4. DO NOT ask for permission to search. 
        5. DO NOT say "I will now search for flights." 
        6. If you have the origin, destination, and date, try using the search_airport_code function to find the specific airport of
        the origin and destination AND THEN CALL 'search_flights' IMMEDIATELY
        7. Only respond to the user AFTER you have the flight results from the tool.
        You MUST use the search_flights tool. Convert city names to 3-letter
        IATA codes (e.g., 'London' to 'LHR') before calling the tool.
        Always provide dates in year, month, day integers.""")

class SendPromptRequest(BaseModel):
    prompt: str
    conversation_id: Optional[str] = None

history_store: Dict[str, List] = {}

# Definir un endpoint (una ruta)
@app.post("/")
def send_prompt_to_agent(request: SendPromptRequest):
    # 1. Generate a new ID if it's the first message, otherwise use the existing one
    conv_id = request.conversation_id or str(uuid.uuid4())

    if conv_id not in history_store:
        history_store[conv_id] = []

    # 3. Add current user message to the history
    history_store[conv_id].append({"role": "user", "content": request.prompt})

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
