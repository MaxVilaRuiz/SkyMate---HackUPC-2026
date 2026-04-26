
"use client";


import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const videos = ["/BCN.mp4", "/NYbo.mp4"];




export default function ReelsPage() {

  const [visible, setVisible] = useState(false);

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => Math.min(prev + 1, videos.length - 1));
  };

  const prev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const router = useRouter();

  useEffect(() => {
    setVisible(true);
  }, []);

    const [transitioning, setTransitioning] = useState(false);


    const handleGoHome = () => {
    setTransitioning(true);

    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000",

        transition: "opacity 0.4s ease, transform 0.4s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(1.02)",
      }}
    >
      {/* FONS ESTRELLA */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at center,
              rgba(28, 32, 40, 1) 0%,        /* centre fosc suau (no negre) */
              rgba(50, 60, 80, 0.85) 30%,    /* blau gris */
              rgba(160, 200, 255, 0.18) 65%, /* blau cel molt suau */
              rgba(230, 240, 255, 0.25) 100% /* blanc molt difuminat */
            ),
            conic-gradient(
              from 0deg,
              transparent 0deg 45deg,
              rgba(160, 200, 255, 0.12) 45deg 55deg,
              transparent 55deg 135deg,
              rgba(180, 210, 255, 0.12) 135deg 145deg,
              transparent 145deg 225deg,
              rgba(160, 200, 255, 0.12) 225deg 235deg,
              transparent 235deg 315deg,
              rgba(180, 210, 255, 0.12) 315deg 325deg,
              transparent 325deg 360deg
            )
          `,
          filter: "blur(80px)",   // més suau
          transform: "scale(1.5)",
        }}
      />

      {/* CONTINGUT */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* CONTINGUT */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 🎬 VIDEO REELS */}
        <div
          style={{
            height: "100vh",
            aspectRatio: "9 / 16",
            maxWidth: "100vw",
            overflow: "hidden",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          }}
        >
          <video
            key={videos[index]}
            src={videos[index]}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div>
            <button
              onClick={prev}
              style={{
                position: "fixed",
                top: "60px",    
                left: "50%",
                transform: "translateX(-50%)",

                width: "64px",
                height: "64px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",

                backgroundColor: "black",
                opacity: 0.7,

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                color: "white",
                fontSize: "52px",

                zIndex: 9999, // 👈 IMPORTANT: per sobre de tot
              }}
            >
              ↑
            </button>

            <button
              onClick={next}
              style={{
                position: "fixed", // 👈 clau perquè no depengui del layout
                bottom: "60px",     // 👈 una mica separat de baix
                left: "50%",
                transform: "translateX(-50%)",

                width: "64px",
                height: "64px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",

                backgroundColor: "black",
                opacity: 0.7,

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                color: "white",
                fontSize: "52px",

                zIndex: 9999, // 👈 IMPORTANT: per sobre de tot
              }}
            >
              ↓
            </button>

            <button
                onClick={handleGoHome}
                style={{
                  position: "fixed",
                  top: "90vh",
                  left: "80%",
                  transform: "translateX(-50%)",
                  padding: "8px 12px",
                  fontSize: "14px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#111",
                  color: "white",
                }}
              >
                Anar a l'ajudant
              </button>

          </div>
        </div>
      </div>
      </div>
    </div>
  );
}