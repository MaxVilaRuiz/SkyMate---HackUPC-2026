from fastapi import FastAPI
from pydantic import BaseModel
from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.tools import tool

# Inicializar la aplicación FastAPI
app = FastAPI()

# Definir un endpoint (una ruta)
@app.get("/")
def read_root():
    return {"message": "¡Hola desde FastAPI!"}
