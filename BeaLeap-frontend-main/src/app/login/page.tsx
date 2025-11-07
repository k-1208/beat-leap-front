"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveTeamSession } from "@/lib/session";


export default function LoginPage() {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🚀 Redirect if already logged in
  useEffect(() => {
    const team = localStorage.getItem("team_name");
    const pass = localStorage.getItem("team_password");
    const serverSession = localStorage.getItem("server_session");

    if (team && pass && serverSession) {
      // User is already logged in, could redirect to main page
      // router.replace("/");
    }
  }, [router]);

  // 🧠 Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("WHATS GOING ON GUYS")
    try {
      const res = await fetch("/backend/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team_name: teamName, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
                  console.log("GOT HERE....1")

          setError("Invalid team name or password.");
        } else {
                  console.log("GOT HERE...2.")

          setError(data.detail || "Login failed. Try again.");
        }
              console.log("GOT HERE....3")

        setLoading(false);
        return;
      }

      // ✅ Store credentials and session
      console.log("GOT HERE....")
      localStorage.setItem("team_name", teamName);
      localStorage.setItem("team_password", password);
      localStorage.setItem("server_session", data.server_session);;

    saveTeamSession(teamName, password, data.server_session);


      router.replace("/"); // redirect to main menu
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#1a0a2e] to-[#0f0520] text-white font-['Press_Start_2P'] overflow-hidden">
      {/* Glow Grid Background */}
      <div
        className="absolute bottom-0 h-[60vh] w-full"
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

      {/* Title */}
      <h1 className="text-[64px] text-[#FFD4EB] mb-10 animate-[neonPulse_2.5s_ease-in-out_infinite] [text-shadow:_0_0_10px_#FF99CC,_0_0_20px_#FF33CC,_0_0_40px_#FF00FF]">
        TEAM
      </h1>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center gap-6 bg-[rgba(30,10,50,0.7)] border-4 border-[#ff00ff] rounded-2xl p-10 shadow-[0_0_25px_#ff00ff,inset_0_0_20px_rgba(255,0,255,0.3)]"
      >
        <input
          type="text"
          placeholder="Team Name"
          className="p-3 rounded-md bg-[#2a1548] border-2 border-[#ff00ff] text-center text-xl text-[#FFD4EB] w-80 focus:outline-none"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded-md bg-[#2a1548] border-2 border-[#ff00ff] text-center text-xl text-[#FFD4EB] w-80 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`bg-[#E428B1] px-8 py-4 text-2xl rounded-xl mt-4 transition-all ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105 active:scale-95"
          }`}
        >
          {loading ? "LOGGING IN..." : "LOGIN"}
        </button>

        {error && (
          <p className="mt-4 text-red-400 text-sm text-center w-72">{error}</p>
        )}
      </form>
    </div>
  );
}
