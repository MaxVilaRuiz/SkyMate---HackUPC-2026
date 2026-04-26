
"use client";


import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const videos = ["/Video.webm", "/Video2.webm"];




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
              rgba(25, 25, 25, 1) 0%,
              rgba(35, 35, 35, 0.95) 25%,
              rgba(173, 215, 255, 0.64) 70%,
              rgba(170, 214, 255, 0.18) 100%
            ),
            conic-gradient(
              from 0deg,
              transparent 0deg 40deg,
              rgba(173, 215, 255, 0.26) 40deg 50deg,
              transparent 50deg 130deg,
              rgba(173, 215, 255, 0.28) 130deg 140deg,
              transparent 140deg 220deg,
              rgba(173, 215, 255, 0.26) 220deg 230deg,
              transparent 230deg 310deg,
              rgba(173, 215, 255, 0.29) 310deg 320deg,
              transparent 320deg 360deg
            )
          `,
          filter: "blur(70px)",
          transform: "scale(1.4)",
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