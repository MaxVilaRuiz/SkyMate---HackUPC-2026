import requests
import os
from dotenv import load_dotenv
from langchain_core.tools import tool


load_dotenv()
API_KEY = os.getenv("SKYSCANNER_API_KEY")


@tool
def search_airport_code(search_term: str):
   """
   Given a geographical location, this function queries the Skyscanner API to get information such as the name,
   the iata code or the type of place, whether it is an airport or a city.
   You can use this function when you need to search for flights to a specific location but don't know the airport name
   or the IATA code.
   """

   print("AI AGENT CALLED THE FUNCTION search_airport_code")
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