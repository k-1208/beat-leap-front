"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";

// Dynamically import the PixelEditorApp, assuming it has a prop to set the initial image data
// and a way to retrieve the final image data.
const PixelEditorApp = dynamic(() => import("@/components/pixel-editor/App"), { ssr: false });

export default function PixelFogPage() {


  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0C0614] text-white font-['Press_Start_2P']">
      {/* Logo */}
      <img
        src="/images/leap_purple 1.png"
        alt="LEAP Experience"
        className="fixed top-8 left-10 w-24 z-20"
      />

      {/* Content container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-24">
        {/* Title */}
        <h1 className="mb-8 text-center text-[60px] font-normal text-[#FFD4EB] whitespace-nowrap animate-[neonPulse_2.5s_ease-in-out_infinite] [text-shadow:_0_0_10px_#FFD4EB,_0_0_20px_#FF99CC,_0_0_40px_#FF33CC,_0_0_80px_#FF00FF]">
          Pixel Fog
        </h1>

        {/* Editor & Loading State */}
        <div className="mt-4">
            <PixelEditorApp
            />
        </div>
      </div>

      {/* Floor grid (remains the same) */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[50vh] w-[140vw] z-0"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255,0,255,0.35) 25%, rgba(255,0,255,0.35) 26%, transparent 27%, transparent 74%, rgba(255,0,255,0.35) 75%, rgba(255,0,255,0.35) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(255,0,255,0.35) 25%, rgba(255,0,255,0.35) 26%, transparent 27%, transparent 74%, rgba(255,0,255,0.35) 75%, rgba(255,0,255,0.35) 76%, transparent 77%, transparent)
          `,
          backgroundSize: "104px 90px",
          transform: "perspective(520px) rotateX(50deg)",
          transformOrigin: "bottom",
          maskImage:
            "radial-gradient(100% 70% at 50% 100%, black 55%, transparent 100%), linear-gradient(to top, black 65%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(120% 70% at 50% 100%, black 55%, transparent 100%), linear-gradient(to top, black 65%, transparent 100%)",
        }}
      />
    </div>
  );
}