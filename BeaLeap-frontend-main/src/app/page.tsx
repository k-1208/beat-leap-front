"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BeatLeap() {
  const [status, setStatus] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginAndFetch = async () => {
      const storedTeam = localStorage.getItem("team_name");
      const storedPass = localStorage.getItem("team_password");
      const serverSession = localStorage.getItem("server_session");

      // ⛔ Redirect if not logged in
      if (!storedTeam || !storedPass || !serverSession) {
        console.warn("User not logged in — redirecting to login...");
        setNotLoggedIn(true);
        router.replace("/login");
        return;
      }

      try {
        // ✅ Fetch game status
        const res = await fetch("http://127.0.0.1:8000/games/status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(`${storedTeam}:${storedPass}`)}`,
          },
        });

        if (res.status === 401) {
          console.warn("Session expired or invalid credentials. Redirecting...");
          localStorage.clear();
          setNotLoggedIn(true);
          router.replace("/login");
          return;
        }

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();
        setStatus(data);
      } catch (err) {
        console.error("Error fetching game status:", err);
      } finally {
        setLoading(false);
      }
    };

    // ✅ Add a slight delay to ensure localStorage is fully available
    setTimeout(checkLoginAndFetch, 100);
  }, [router]);

  // 🌀 Loading screen
  if (loading) {
    return (
      <div className="text-white flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // 🚨 Not logged in (extra guard)
  if (notLoggedIn) {
    return (
      <div className="text-white flex h-screen items-center justify-center text-xl">
        Not logged in. Redirecting to login...
      </div>
    );
  }

  // 🎮 Render game cards
  const renderCard = (
    href: string,
    img: string,
    label: string,
    open: boolean
  ) => {
    const baseClasses =
      "w-[300px] h-[220px] flex flex-col items-center justify-center rounded-xl p-6 text-center bg-gradient-to-br from-[#2a1548] to-[#1a0e30] border-4 border-[#ff6b35] shadow-[0_8px_15px_rgba(255,107,53,0.25)] transition-all duration-300";
    const disabled = "opacity-40 cursor-not-allowed";

    return open ? (
      <Link href={href} className={`${baseClasses} hover:-translate-y-2`}>
        <img src={img} alt={label} className="h-28 mb-5" />
        <div className="text-sm tracking-[2px] text-[#FFC9F0]">{label}</div>
      </Link>
    ) : (
      <div className={`${baseClasses} ${disabled}`}>
        <img src={img} alt={label} className="h-28 mb-5" />
        <div className="text-sm tracking-[2px] text-[#999]">
          {label} (Closed)
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-[#1a0a2e] to-[#0f0520] text-white font-['Press_Start_2P'] flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="absolute top-8 left-10 z-10">
        <img
          src="/images/leap_purple 1.png"
          alt="LEAP Experience"
          className="w-24"
        />
      </div>

      {/* Title */}
      <h1 className="text-center text-[100px] text-[#FFD4EB] mb-10">
        BEAT LEAP
      </h1>

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
          "#",
          "/images/image 219.png",
          "STORY HUNT",
          status.story_hunt
        )}
        {renderCard(
          "#",
          "/images/image 220.png",
          "PIXEL FOG",
          status.pixel_fog
        )}
      </div>

      {/* Logout */}
      <div className="mt-10">
        <button
          onClick={() => {
            localStorage.clear();
            router.replace("/login");
          }}
          className="text-lg px-6 py-3 border-2 border-[#ff00ff] rounded-xl text-[#FFD4EB] hover:bg-[#ff00ff22] transition-all duration-300"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}