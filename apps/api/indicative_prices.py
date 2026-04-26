import requests
import os
import time
from dotenv import load_dotenv
from langchain_core.tools import tool
from pydantic import BaseModel, Field
from typing import Optional, Literal


load_dotenv()  # Carga las variables de entorno desde el archivo .env


API_KEY = os.getenv("SKYSCANNER_API_KEY")

class FlightSearchSchema(BaseModel):
    origin: str = Field(..., description="3-letter IATA code for origin")
    destination: str = Field(..., description="3-letter IATA code for destination")
    adults: Optional[int] = Field(None, description="Number of adults in the flight. If none are specified you can assume it's 1.")

    search_type: Literal["fixed", "range", "anytime"] = Field(
        ...,
        description="Type of search. Use 'fixed' for a specific date, 'range' for a span of months/dates, or 'anytime' if the user doesn't specify when."
    )

    start_year: Optional[int] = Field(None, description="Year for fixed date or start of range.")
    start_month: Optional[int] = Field(None, description="Month for fixed date or start of range.")
    start_day: Optional[int] = Field(None, description="Day for fixed date.")

@tool(args_schema=FlightSearchSchema)
def search_indicative_flights(
    origin: str,
    destination: str,
    search_type: str,
    adults: Optional[int] = 1,
    start_year: Optional[int] = None,
    start_month: Optional[int] = None,
    start_day: Optional[int] = None,
    end_year: Optional[int] = None,
    end_month: Optional[int] = None,
):
   """
    Returns the best flight options for different time ranges depending on price. 
    IMPORTANT: 'origin' and 'destiny' must be 3-letter IATA codes (e.g., 'LHR', 'JFK').
    """
   
   print("AI AGENT CALLED THE FUNCTION search_indicative_flights")
   url = "https://partners.api.skyscanner.net/apiservices/v3/flights/indicative/search"

   leg = {
       "originPlace": {"queryPlace": {"iata": origin}},
       "destinationPlace": {"queryPlace": {"iata": destination}}
   }

   if search_type == "anytime":
       leg["anytime"] = True

   elif search_type == "fixed":
       if not (start_year and start_month and start_day):
            return "Error: Missing year, month, or day for a fixed date search."
       
       leg["fixedDate"] = {
           "year": start_year,
           "month": start_month,
           "day": start_day
       }
   elif search_type == "range":
       if not (start_year and start_month and end_year and end_month):
           return "Error: Missing start/end year or month for a range search."
       
       leg["dateRange"] = {
           "startDate": {"year": start_year, "month": start_month},
           "endDate": {"year": end_year, "month": end_month}
       }
  
   body = {
       "query": {
           "market": "UK",
           "locale": "en-GB",
           "currency": "GBP",
           "queryLegs": [leg],
           "cabinClass": "CABIN_CLASS_ECONOMY",
           "adults": adults,
       }
   }

   print(f"leg: {leg}")

   headers = {
       "Content-Type": "application/json",
       "x-api-key": API_KEY
   }

   print(f"body: {body}")
   print(f"headers: {headers}")
   resp = requests.post(url, json=body, headers=headers)
   if resp.status_code != 200:
       print(f"API Error {resp.status_code}: {resp.text}")
       return f"Skyscanner API returned an error: {resp.text}"
   data = resp.json()["content"]

   print(resp)

   quotes = data["results"]["quotes"]

   final_results = []

   for item in quotes.values():
       print(f"item: {item["inboundLeg"]}")
       price = int(item["minPrice"]["amount"])
       origin_outbound_id = item["outboundLeg"]["originPlaceId"]
       destination_outbound_id = item["outboundLeg"]["destinationPlaceId"]
       outbound_carrier_id = item["outboundLeg"]["marketingCarrierId"]
       isDirect = item["isDirect"]
       
       
       final_results.append({
           'price': price,
           'outbound_origin': data["results"]["places"][origin_outbound_id],
           'outbound_destination': data["results"]["places"][destination_outbound_id],
           'outbound_carrier': data["results"]["carriers"][outbound_carrier_id],
           'outbound_departure_date': item["outboundLeg"]["departureDateTime"],
           'is_direct_flight': isDirect
       })

   print(final_results[:5])
   return final_results[:5]
   