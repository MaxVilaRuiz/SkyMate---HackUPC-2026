"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "@vnedyalk0v/react19-simple-maps";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

interface UserMenuProps {
  onFormComplete?: (preferences: string[]) => void;
}

export default function UserMenuButton({ onFormComplete }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const [userName, setUserName] = useState("");
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [newCountry, setNewCountry] = useState("");

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const handleOpenForm = () => { setIsOpen(false); setShowForm(true); setCurrentQIndex(0); setUserAnswers([]); };
  const handleOpenProfile = () => { setIsOpen(false); setShowProfile(true); };

  const addCountry = () => {
    const countryName = newCountry.trim();
    if (countryName !== "" && !visitedCountries.some(c => c.toLowerCase() === countryName.toLowerCase())) {
      const formattedCountry = countryName.charAt(0).toUpperCase() + countryName.slice(1).toLowerCase();
      setVisitedCountries([...visitedCountries, formattedCountry]);
      setNewCountry("");
    }
  };

  return (
    <>
      {/* BOTÓN PRINCIPAL */}
      <div className="absolute left-4 top-4 z-50 md:fixed">
        <button onClick={handleOpenProfile} className="relative flex h-11 w-11 items-center justify-center rounded-full border border-sky-100 bg-white/90 shadow-sm backdrop-blur transition-colors hover:bg-sky-50 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>

      {showProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
          <div className="flex h-[80vh] w-full max-w-5xl flex-col rounded-3xl bg-white p-6 shadow-2xl overflow-hidden">
            
            <div className="mb-4 flex flex-col items-center shrink-0">
                <input 
                  type="text" 
                  placeholder="Your Name..." 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-transparent text-center text-3xl font-bold text-slate-800 focus:outline-none placeholder:text-slate-300"
                />
                <p className="text-xs text-sky-500 font-semibold uppercase tracking-widest mt-1">Global Traveler</p>
            </div>

            <div className="flex flex-1 gap-6 min-h-0">
              
              <div className="flex-[2] flex items-center justify-center relative rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-sky-50/50 p-4">
                <ComposableMap 
                  projectionConfig={{ scale: 140 }} 
                  className="w-full h-full outline-none"
                >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo, index) => {
                      const countryName = geo.properties?.name ?? "Unknown";

                      const isVisited = visitedCountries.some(
                        (c) => c.toLowerCase() === countryName.toLowerCase()
                      );

                      return (
                        <Geography
                          key={`${geo.id ?? countryName}-${index}`}
                          geography={geo}
                          fill={isVisited ? "#0770E3" : "#E2E8F0"}
                          stroke="#FFFFFF"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: "none" },
                            hover: {
                              fill: isVisited ? "#055ab5" : "#cbd5e1",
                              outline: "none",
                            },
                            pressed: { outline: "none" },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
                </ComposableMap>
              </div>

              <div className="flex-1 flex flex-col min-w-[250px]">
                <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Visited Countries</h3>
                
                <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-2">
                    {visitedCountries.length === 0 && (
                      <p className="text-slate-400 italic text-sm text-center mt-10">
                        Type a country below to light up the map!
                      </p>
                    )}
                    {visitedCountries.map((country, i) => (
                        <div key={i} className="px-4 py-3 rounded-xl bg-sky-50 border border-sky-100 text-sky-800 font-medium text-sm flex items-center shadow-sm">
                            📍 {country}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 bg-slate-100 p-2 rounded-xl shrink-0">
                    <input 
                        type="text" 
                        placeholder="e.g. Spain, Japan..." 
                        value={newCountry}
                        onChange={(e) => setNewCountry(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addCountry()}
                        className="flex-1 bg-transparent px-2 py-2 text-sm focus:outline-none"
                    />
                    <button onClick={addCountry} className="bg-[#0770E3] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                        Add
                    </button>
                </div>
              </div>

            </div>

            <button onClick={() => setShowProfile(false)} className="mt-4 text-sm font-bold text-slate-400 hover:text-slate-600 shrink-0">
              Close Profile
            </button>
          </div>
        </div>
      )}
    </>
  );
}