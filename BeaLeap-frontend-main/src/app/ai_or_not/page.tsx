
"use client";
import React, { useState, useEffect, useRef } from "react";
import { getTeamSession } from "@/lib/session"; // adjust import path

export default function AIorNOT() {
  const [timeLeft, setTimeLeft] = useState(1800); // 8 minutes
  const [score, setScore] = useState(0);
  const [currentImage, setCurrentImage] = useState<{ url: string } | null>(null);
  const [feedback, setFeedback] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const session = getTeamSession();
  if (!session) return null;

  const { team_name, password, server_session } = session;

  const imageiter = useRef(0); // ✅ persists across renders

  // --- Load next image (authenticated) ---
  const loadNextImage = async () => {
    try {
      const res = await fetch("/backend/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_name,
          password,
          session_id: "session_001",
          server_session,
          imageiter: imageiter.current
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          alert("Not logged in. Redirecting to login...");
          window.location.href = "../login";
        }
        return;
      }
      
      const data = await res.json();
      if (data.image_url == "game over") {
        setCurrentImage({ url: ""})
        submitScore();
        window.location.href = "/"
      }
      setCurrentImage({ url: data.image_url });
      setFeedback("");
      setLightboxOpen(false);
    } catch (err) {
      console.error("Error fetching image:", err);
    }
  };

  // --- Handle guess ---
  const handleGuess = async (guessIsAI: boolean) => {
    if (!currentImage) return;

    try {
      const res = await fetch("/backend/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_name,
          password,
          session_id: "session_001",
          server_session,
          user_guess: guessIsAI ? "ai" : "human",
          imageiter: imageiter.current
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          alert("Session expired. Please log in again.");
          window.location.href = "/login";
        }
        return;
      }

      const data = await res.json();
      setFeedback(data.result); // ✅ show feedback immediately

      // Delay loading the next image to let user SEE the feedback
      setTimeout(() => {
        imageiter.current += 1; // ✅ increment persistent counter
        loadNextImage();
      }, 1200); 
    } catch (err) {
      console.error("Error verifying guess:", err);
    }
  };

  // --- NEW: Submit final score ---
  const submitScore = async () => {
    try {
      setIsSubmitting(true);
      const res = await fetch("http://localhost:3000/submitscore", {
        method: "POST",
        body: JSON.stringify({
          team_name,
          score,
          server_session: server_session, 
        }),
      });

      // const data = await res.json();
      // alert(✅ Score submitted successfully! Server says: ${data.message || "OK"});
    } catch (err) {
      console.error("Error submitting score:", err);
      alert("Error submitting score. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Timer countdown ---
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // --- On mount ---
  useEffect(() => {
    loadNextImage();
  }, []);

  // --- Lightbox ---
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "Enter" && lightboxOpen) setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
  }, [lightboxOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0C0614] text-white font-['Press_Start_2P'] flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="absolute top-8 left-10 z-10">
        <img src="/images/leap_purple 1.png" alt="LEAP Experience" className="w-24" />
      </div>

      {/* Timer */}
      <div className="absolute top-8 right-10 z-10 text-3xl text-[#FFD4EB] [text-shadow:0_0_10px#FFD4EB]">
        {formatTime(timeLeft)}
      </div>

      {/* Title */}
      <h1 className="text-center text-[60px] text-[#FFD4EB] mb-10 whitespace-nowrap animate-[neonPulse_2.5s_ease-in-out_infinite] [text-shadow:0_0_10px#FFD4EB,0_0_20px#FF99CC,0_0_40px#FF33CC,0_0_80px#FF00FF]">
        AI or NOT
      </h1>

      {/* Image Display */}
      <div className="relative mb-8 z-10">
        <div className="border-4 border-[#ff6b35] p-8 rounded-3xl shadow-[0_0_30px_rgba(255,107,53,0.4)] bg-[url('/images/texture.jpg')] bg-no-repeat bg-center" style={{ backgroundSize: "120%" }}>
          <div className="border-8 border-[#ff00ff] rounded-2xl overflow-hidden bg-[#1a0e30] shadow-[inset_0_0_30px_rgba(255,0,255,0.3)]">
            <div className="w-[700px] h-[350px] flex items-center justify-center bg-gradient-to-br from-[#2a1548] to-[#1a0e30] relative">
              {currentImage ? (
                <img
                  src={currentImage.url}
                  alt="Guess if AI or Human"
                  className="w-full h-full object-contain cursor-zoom-in"
                  onClick={() => setLightboxOpen(true)}
                />
              ) : (
                <div className="text-[#FFD4EB] text-2xl">Loading...</div>
              )}

              {feedback && (
                <div
                  className={`absolute inset-0 flex items-center justify-center text-6xl font-bold ${
                    feedback.includes("CORRECT") ? "text-green-400" : "text-red-400"
                  } [text-shadow:_0_0_20px_currentColor] bg-black/50`}
                >
                  {feedback}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-6 z-10">
        <div className="flex gap-[120px]">
          <button
            onClick={() => handleGuess(false)}
            className="w-[200px] h-[80px] bg-[#EC6A16] rounded-xl text-3xl shadow-[0_8px_20px_rgba(255,107,53,0.4)] hover:-translate-y-2 transition-all"
          >
            HUMAN
          </button>

          <button
            onClick={() => handleGuess(true)}
            className="w-[200px] h-[80px] bg-[#E428B1] rounded-xl text-3xl shadow-[0_8px_20px_rgba(255,0,255,0.4)] hover:-translate-y-2 transition-all"
          >
            AI
          </button>
        </div>
      </div>

      {/* Floor grid (unchanged) */}
      {/* ... keep your floor grid and lightbox code here ... */}
    </div>
  );
}