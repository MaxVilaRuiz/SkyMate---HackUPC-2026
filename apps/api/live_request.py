import requests
import os
import time
from dotenv import load_dotenv
from langchain_core.tools import tool


load_dotenv()  # Carga las variables de entorno desde el archivo .env


API_KEY = os.getenv("SKYSCANNER_API_KEY")

@tool
def search_flights(origin: str, destiny: str, year: int, month: int, day: int, adults: int, childrenages: list[int]):
   """
    Returns the best flight options. 
    IMPORTANT: 'origin' and 'destiny' must be 3-letter IATA codes (e.g., 'LHR', 'JFK').
    'childrenages' must be a list of integers, or an empty list [] if no children.
    If the user doesn't provide very specific information, you can assume that the date is for this year, for one adult and no children ages
    """
   
   print("AI AGENT CALLED THE FUNCTION search_flights")
   url = "https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create"
  
   body = {
       "query": {
           "market": "UK",
           "locale": "en-GB",
           "currency": "GBP",
           "queryLegs": [
           {
               "originPlaceId": {
                   "iata": origin,
               },
               "destinationPlaceId": {
                   "iata": destiny,
               },
               "date": {
                   "year": year,
                   "month": month,
                   "day": day
               }
           }
           ],
           "cabinClass": "CABIN_CLASS_ECONOMY",
           "adults": adults,
           "childrenAges": childrenages,
           "includedCarriersIds": [],
           "excludedCarriersIds": [],
           "includedAgentsIds": [],
           "excludedAgentsIds": [],


       }
   }

   headers = {
       "Content-Type": "application/json",
       "x-api-key": API_KEY
   }

   resp = requests.post(url, json=body, headers=headers)
   session_token = resp.json().get("sessionToken")

   if not session_token:
        print(f"Failed to create session")
        return {"error": "Could not create Skyscanner session"}

   poll_url = f"https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/poll/{session_token}"
   time.sleep(2)
   poll_resp = requests.post(poll_url, headers=headers)
   data = poll_resp.json()["content"]

   itineraries = data["results"]["itineraries"]
   legs = data["results"]["legs"]
   carriers = data["results"]["carriers"]
   places = data["results"]["places"]

   final_results = []

   for item in itineraries.values():
      target_leg_id = item["legIds"][0]
      leg = legs[target_leg_id]
      target_carrier_id = leg["marketingCarrierIds"][0]
      carrier = carriers[target_carrier_id]
      origin_id = leg["originPlaceId"]
      destination_id = leg["destinationPlaceId"]
      origin_place = places[origin_id]
      dest_place = places[destination_id]
      final_results.append({
         'airline': carrier["name"],
         'price': int(item["pricingOptions"][0]["price"]["amount"]) / 1000,
         'origin': origin_place["name"],
         'destination': dest_place["name"],
         'departure': leg["departureDateTime"],
      })

   return final_results[:5]
