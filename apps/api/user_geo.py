import requests
import os
from dotenv import load_dotenv
from langchain_core.tools import tool


load_dotenv()
API_KEY = os.getenv("SKYSCANNER_API_KEY")

@tool
def GeoApi():
   """Use this function to retrieve the name and the IATA of the country that the user is currently in, this can be useful
    to determine the origin of a trip if the user doesn't specify one or recommend trips to closer destinations if needed."""
   
   print("AI AGENT CALLED THE FUNCTION GeoApi")

   url = "https://partners.api.skyscanner.net/apiservices/v3/geo/hierarchy/flights/nearest"
  
   body = {
        "locale": "en-GB",
        "locator":{
            "ipAddress": "193.148.19.23"
        }      
   }
  
   headers = {
       "Content-Type": "application/json",
       "x-api-key": API_KEY
   }

   res = requests.post(url, json=body, headers=headers)
   data = res.json()

   places = data["places"]

   tuples = []

   for place in places.values():
       t = ({
           "name": place["name"],
           "type": place["type"],
           "iata": place["iata"],
           }
       )
       tuples.append(t)

   return tuples