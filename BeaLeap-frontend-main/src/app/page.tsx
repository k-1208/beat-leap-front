"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BeatLeap() {
  const router = useRouter();
  const [status, setStatus] = useState<Record<string, boolean> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyLogin = async () => {
      const team = localStorage.getItem("team_name");
      const pass = localStorage.getItem("team_password");
      const session = localStorage.getItem("server_session");


      // ✅ If not logged in → redirect immediately
      if (!team || !pass || !session) {
        localStorage.clear();
        router.replace("/login");
        return;
      }

      try {
        const res = await fetch("/backend/games/status", {
          headers: {
            "Content-Type": "application/json",
            "server-session": session,  // ✅ must match backend
          },
        });


        // 🚫 Invalid session or backend expired → force logout
        if (res.status === 401) {
          localStorage.clear();
          router.replace("/login");
          return;
        }

        if (!res.ok) throw new Error(`Server responded ${res.status}`);

        const data = await res.json();
        setStatus(data);
      } catch (err) {
        console.error("Login/session check failed:", err);
        localStorage.clear();
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyLogin();
  }, [router]);

  // ⏳ While checking login or redirecting
  if (loading) {
    return (
      <div className="text-white flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!status) return null;

  const renderCard = (
    href: string,
    img: string,
    label: string,
    open: boolean
  ) => {
    const base =
      "w-[300px] h-[220px] flex flex-col items-center justify-center rounded-xl p-6 text-center bg-gradient-to-br from-[#2a1548] to-[#1a0e30] border-4 border-[#ff6b35] shadow-[0_8px_15px_rgba(255,107,53,0.25)] transition-all duration-300";
    const disabled = "opacity-40 cursor-not-allowed";

    return open ? (
      <Link href={href} className={`${base} hover:-translate-y-2`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={label} className="h-28 mb-5" />
        <div className="text-sm tracking-[2px] text-[#FFC9F0]">{label}</div>
      </Link>
    ) : (
      <div className={`${base} ${disabled}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={label} className="h-28 mb-5" />
        <div className="text-sm tracking-[2px] text-[#999]">{label} (Closed)</div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-[#1a0a2e] to-[#0f0520] text-white font-['Press_Start_2P'] flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="absolute top-8 left-10 z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/leap_purple 1.png" alt="LEAP Experience" className="w-24" />
      </div>

      {/* Title */}
      <h1 className="text-center text-[100px] text-[#FFD4EB] mb-10  animate-[neonPulse_2.5s_ease-in-out_infinite] [text-shadow:0_0_10px#FFD4EB,0_0_20px#FF99CC,0_0_40px#FF33CC,0_0_80px#FF00FF]">BEAT LEAP</h1>

      {/* Game Menu */}
      <div
        className="grid [grid-template-columns:repeat(2,max-content)] gap-x-3 gap-y-6 p-10
                   border-4 border-[#ff00ff] rounded-2xl bg-[rgba(20,10,35,0.7)]
                   shadow-[0_0_25px_#ff00ff,inset_0_0_20px_rgba(255,0,255,0.2)]
                   z-10 bg-[url('/images/texture.jpg')] bg-no-repeat bg-center
                   w-[min(58rem,88vw)] mx-auto justify-center items-center"
        style={{ backgroundSize: "120%" }}
      >
        {renderCard(
          "/ai_or_not",
          "/images/image 217.png",
          "AI OR NOT",
          status.ai_or_not
        )}
        {renderCard(
          "/interro_room",
          "/images/image 218.png",
          "INTERROGATION ROOM",
          status.interro_room
        )}
        {renderCard(
          "/story_hunt",
          "/images/image 219.png",
          "STORY HUNT",
          status.story_hunt
        )}
        {renderCard(
          "/pixel_fog",
          "/images/image 220.png",
          "PIXEL FOG",
          status.pixel_fog
        )}
      </div>
    </div>
  );
}