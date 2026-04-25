import requests
import os
from dotenv import load_dotenv
from langchain_core.tools import tool

load_dotenv()
API_KEY = os.getenv("SKYSCANNER_API_KEY")


def search_airport_code(search_term: str):
    """
    Returns the 3-letter IATA code for a given city or airport name.
    IMPORTANT: Always use this tool FIRST if the user provides a city name 
    (like 'Barcelona' or 'London') instead of an exact IATA code, so you can 
    pass the correct IATA code to the search_flights tool.
    """
    url = "https://partners.api.skyscanner.net/apiservices/v3/autosuggest/flights"
    
    body = {
        "query": {
            "market": "UK",
            "locale": "en-GB",
            "searchTerm": search_term,
            "includedEntityTypes": ["PLACE_TYPE_CITY", "PLACE_TYPE_AIRPORT"]
        }
    }
    
    headers = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
    }

    try:
        resp = requests.post(url, json=body, headers=headers)
        data = resp.json()
        
        if "places" not in data:
            return {"error": "No results found"}
            
        results = []
        for place in data["places"][:5]:
            results.append({
                "name": place.get("name"),
                "iata": place.get("iataCode"),
                "type": place.get("type")
            })

        
        return results

        
        
    except Exception as e:
        return {"error": f"Failed to fetch autosuggest: {str(e)}"}
