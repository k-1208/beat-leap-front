"use client";
import React, { useMemo, useEffect, useRef, useState } from "react";



export default function InterrogationRoom() {
  const [prompt, setPrompt] = useState("");
  const [score, setScore] = useState(0);
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Optional: cancel in-flight requests if user spams "Send"
  const abortRef = useRef<AbortController | null>(null);

  const [response, setResponse] = useState("");

  async function sendPrompt() {
  if (!prompt.trim() || loading) return;

  // cancel previous request
  if (abortRef.current) abortRef.current.abort();
  abortRef.current = new AbortController();

  setLoading(true);
  try {
    const res = await fetch("http://127.0.0.1:8000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_input: prompt,
        session_id: "session1",
      }),
      signal: abortRef.current.signal,
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    const data = await res.json();
    setScore(score+1);
    setReply(data.response || "No reply received from Oracle.");
    setPrompt("");
  } catch (e: any) {
    if (e?.name === "AbortError") return; // user cancelled
    console.error(e);
    setReply(e?.message || "…the room hums; the agent just stares back (try again).");
  } finally {
    setLoading(false);
  }
}

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendPrompt();
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0C0614] text-white font-['Press_Start_2P'] flex flex-col items-center justify-center">

      <div className="absolute top-8 left-10 z-10">
        <img src="/images/leap_purple 1.png" alt="LEAP Experience" className="w-24" />
      </div>

      {/* Timer & Score */}
      <div className="absolute top-8 right-10 z-10 text-right">
        <div className="mt-1 text-3xl text-fuchsia-300 opacity-80">
          Prompts: {score}
        </div>      
      </div>

      {/* Title */}
      <h1 className="text-center text-[60px] font-['Press_Start_2P'] font-normal text-[#FFD4EB] mb-6 whitespace-nowrap animate-[neonPulse_2.5s_ease-in-out_infinite] [text-shadow:_0_0_10px_#FFD4EB,_0_0_20px_#FF99CC,_0_0_40px_#FF33CC,_0_0_80px_#FF00FF]">
        Interrogation Room
      </h1>

      {/* Screen */}
      <div className="relative z-10 mb-6">
        <div className="border-4 border-[#ff6b35] rounded-[22px] p-2 shadow-[0_0_30px_rgba(255,107,53,0.4)] bg-[url('/images/texture.jpg')] bg-no-repeat bg-center" style={{ backgroundSize: "120%" }}>
          <div className="border-8 border-[#ff00ff] rounded-[18px] overflow-hidden bg-[#1a0e30] shadow-[inset_0_0_30px_rgba(255,0,255,0.3)]">
            <div className="w-[860px] h-[360px] p-8 flex flex-col gap-5">
              <div className="flex-1 rounded-lg p-4 bg-[#25133f] text-pink-100/90 text-base leading-7 overflow-auto">
                {reply ?? "Enter your prompt, and see if you can beat the cryptic keeper of the secret "}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prompt input */}
      <div className="z-10 flex items-stretch gap-4">
        <div className="border-4 border-[#ff6b35] rounded-2xl shadow-[0_8px_20px_rgba(255,107,53,0.3)]">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-[720px] h-[72px] px-5 text-[15px] tracking-[1px] bg-[#2a1548] text-white rounded-xl outline-none placeholder:text-pink-200/40"
            placeholder="Type your interrogation prompt…"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <button
          onClick={sendPrompt}
          disabled={loading || !prompt.trim()}
          className="w-[220px] h-[72px] bg-[#E428B1] rounded-2xl text-2xl text-white tracking-[2px] shadow-[0_8px_20px_rgba(255,0,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Thinking…" : "Send Prompt"}
        </button>
      </div>

      {/* Floor grid */}
      <div
        className="pointer-events-none absolute bottom-[-2vh] h-[50vh] w-[140vw] z-0"
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
