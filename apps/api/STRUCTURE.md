After initializing the Python FastAPI project in this folder, the folder structure must be similar to the following. 

The Python enviroment must be in the api/ folder.

```
api/                         # Backend FastAPI
│     ├─ pyproject.toml
│     ├─ requirements.txt
│     │
│     ├─ app/
│     │  ├─ main.py                # Entrada FastAPI
│     │  ├─ config.py              # Settings/env vars
│     │  ├─ dependencies.py
│     │  │
│     │  ├─ routes/
│     │  │  ├─ chat.py             # POST /chat
│     │  │  ├─ health.py           # GET /health
│     │  │  └─ ingest.py           # Importación datos SkyScanner
│     │  │
│     │  ├─ schemas/
│     │  │  ├─ chat.py             # Pydantic models
│     │  │  ├─ flights.py
│     │  │  └─ tools.py
│     │  │
│     │  ├─ agents/
│     │  │  ├─ travel_agent.py     # Agente LangChain principal
│     │  │  ├─ prompts.py          # System prompts / roles
│     │  │  └─ memory.py           # Historial conversacional
│     │  │
│     │  ├─ llm/
│     │  │  ├─ ollama_client.py    # Conexión con Ollama/Gemma
│     │  │  └─ embeddings.py
│     │  │
│     │  ├─ tools/
│     │  │  ├─ skyscanner.py       # Tool: buscar vuelos
│     │  │  ├─ rag.py              # Tool: recuperar contexto
│     │  │  ├─ web_search.py       # Tool: búsqueda internet
│     │  │  └─ tool_registry.py    # Registro de tools disponibles
│     │  │
│     │  ├─ services/
│     │  │  ├─ skyscanner_service.py
│     │  │  ├─ ingestion_service.py
│     │  │  ├─ vector_service.py
│     │  │  └─ chat_service.py
│     │
│     └─ scripts/
│        ├─ ingest_skyscanner.py
│        └─ create_vector_index.py
```