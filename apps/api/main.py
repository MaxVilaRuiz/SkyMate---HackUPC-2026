from fastapi import FastAPI
from pydantic import BaseModel
from langchain_ollama import ChatOllama
from langchain.agents import create_agent
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.tools import tool

# Inicializar la aplicación FastAPI
app = FastAPI()

# Define toolset
@tool
def test_tool(location: str):
    """Returns the weather for a specific location."""
    return f"The weather in {location} is currently 273 degrees kelvin."

# Create model
model = ChatOllama(model="gemma4:e2b", temperature=0)
tools = [test_tool]
agent = create_agent(model, tools=tools)

# Definir un endpoint (una ruta)
@app.get("/")
def read_root():
    result = agent.invoke({"messages": [{"role": "user", "content": "What's the weather in San Francisco?"}]})
    return {"message": result["messages"][-1].content}
