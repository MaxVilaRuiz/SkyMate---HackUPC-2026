from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from langchain_ollama import ChatOllama
from langchain.agents import create_agent
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.tools import tool

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
model = ChatOllama(model="gemma4:e2b", temperature=1.5)
tools = [test_tool]
agent = create_agent(model, tools=tools)

class SendPromptRequest(BaseModel):
    prompt: str
    conversation_id: Optional[str] = None

# Definir un endpoint (una ruta)
@app.post("/")
def send_prompt_to_agent(request: SendPromptRequest):
    messages_to_invoke = [
        {"role": "user", "content": request.prompt}
    ]

    result = agent.invoke({"messages": messages_to_invoke})
    print(result["messages"][-1].content)
    return {
        "answer": result["messages"][-1].content,
        "conversationId": request.conversation_id
    }
    
    #result = agent.invoke({"messages": [{"role": "user", "content": "What's the weather in San Francisco?"}]})
    #return {"message": result["messages"][-1].content}
