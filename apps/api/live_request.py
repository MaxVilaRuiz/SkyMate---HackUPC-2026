import requests
import os
from dotenv import load_dotenv

print("El impostor está en:", requests.__file__)

load_dotenv()  # Carga las variables de entorno desde el archivo .env


API_KEY = os.getenv("SKYSCANNER_API_KEY")


def buscar_vols(origin, destiny, year, month, day, adults, childrenages):
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


   res = requests.post(url, json=body, headers=headers)


   #print("Status:", res.status_code)
   aux = res.json()
   print(aux)


   return res.json()




if __name__ == "__main__":
   buscar_vols("BCN", "TLV", 2026, 4, 25, 1, [2, 5])
