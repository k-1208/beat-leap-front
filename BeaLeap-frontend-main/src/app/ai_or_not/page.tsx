  // "use client";
  // import React, { useState, useEffect } from "react";

  // export default function AIorNOT() {
  //   const [timeLeft, setTimeLeft] = useState(480); 
  //   const [score, setScore] = useState(0);
  //   const [currentImage, setCurrentImage] = useState(null);
  //   const [feedback, setFeedback] = useState("");


  //   const images = [
  //     { url: "https://picsum.photos/600/400?random=1", isAI: false },
  //     { url: "https://picsum.photos/600/400?random=2", isAI: true },
  //     { url: "https://picsum.photos/600/400?random=3", isAI: false },
  //     { url: "https://picsum.photos/600/400?random=4", isAI: true },
  //   ];

  //   useEffect(() => {
  //     // Load first image
  //     loadNextImage();
  //   }, []);

  //   useEffect(() => {
  //     // Timer countdown
  //     if (timeLeft > 0) {
  //       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  //       return () => clearTimeout(timer);
  //     }
  //   }, [timeLeft]);

  //   const loadNextImage = () => {
  //     const randomImage = images[Math.floor(Math.random() * images.length)];
  //     setCurrentImage(randomImage);
  //     setFeedback("");
  //   };

  //   const handleGuess = (guessIsAI) => {
  //     if (!currentImage) return;

  //     const correct = guessIsAI === currentImage.isAI;
  //     if (correct) {
  //       setScore(score + 10);
  //       setFeedback("✓ CORRECT!");
  //     } else {
  //       setFeedback("✗ WRONG!");
  //     }

  //     setTimeout(() => {
  //       loadNextImage();
  //     }, 1000);
  //   };

  //   const formatTime = (seconds) => {
  //     const mins = Math.floor(seconds / 60);
  //     const secs = seconds % 60;
  //     return `${mins}:${secs.toString().padStart(2, "0")}`;
  //   };

  //   return (
  //     <div className="fixed inset-0 overflow-hidden bg-[#0C0614] text-white font-['Press_Start_2P'] flex flex-col items-center justify-center">
  //       {/* Logo */}
  //       <div className="absolute top-8 left-10 z-10">
  //         <img src="/images/leap_purple 1.png" alt="LEAP Experience" className="w-24" />
  //       </div>

  //       {/* Timer */}
  //       <div className="absolute top-8 right-10 z-10 text-3xl text-[#FFD4EB] [text-shadow:_0_0_10px_#FFD4EB]">
  //         {formatTime(timeLeft)}
  //       </div>

  //       {/* Title */}
  // <h1
  //   className="text-center text-[60px] font-['Press_Start_2P'] font-normal text-[#FFD4EB]
  //             mb-10 whitespace-nowrap
  //             animate-[neonPulse_2.5s_ease-in-out_infinite]
  //             [text-shadow:_0_0_10px_#FFD4EB,_0_0_20px_#FF99CC,_0_0_40px_#FF33CC,_0_0_80px_#FF00FF]">
  //   AI or NOT
  // </h1>

  //       {/* Image Display Container */}
  //       <div className="relative mb-8 z-10">
  //         {/* Outer orange border */}
  //         <div className="border-4 border-[#ff6b35] p-8 rounded-3xl p-2 shadow-[0_0_30px_rgba(255,107,53,0.4)] bg-[url('/images/texture.jpg')] bg-no-repeat bg-center"
  //             style={{ backgroundSize: "120%" }}>
  //           {/* Inner purple border */}
  //           <div className="border-8 border-[#ff00ff] rounded-2xl overflow-hidden bg-[#1a0e30] shadow-[inset_0_0_30px_rgba(255,0,255,0.3)]">
  //             {/* Image */}
  //             <div className="w-[700px] h-[350px] flex items-center justify-center bg-gradient-to-br from-[#2a1548] to-[#1a0e30]">
  //               {currentImage ? (
  //                 <img
  //                   src={currentImage.url}
  //                   alt="Guess if AI or Human"
  //                   className="w-full h-full object-cover"
  //                 />
  //               ) : (
  //                 <div className="text-[#FFD4EB] text-2xl">Loading...</div>
  //               )}
                
  //               {/* Feedback overlay */}
  //               {feedback && (
  //                 <div className={`absolute inset-0 flex items-center justify-center text-6xl font-bold ${
  //                   feedback.includes("CORRECT") ? "text-green-400" : "text-red-400"
  //                 } [text-shadow:_0_0_20px_currentColor] bg-black/50`}>
  //                   {feedback}
  //                 </div>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       {/* Buttons */}
  //       <div className="flex gap-[120px] z-10">
  //         {/* Human Button */}
  //         <button
  //           onClick={() => handleGuess(false)}
  //           className="w-[200px] h-[80px] bg-[#EC6A16] rounded-xl text-3xl text-white tracking-[2px] shadow-[0_8px_20px_rgba(255,107,53,0.4)] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(255,107,53,0.6)] transition-all duration-300 active:translate-y-0"
  //         >
  //           HUMAN
  //         </button>

  //         {/* AI Button */}
  //         <button
  //           onClick={() => handleGuess(true)}
  //           className="w-[200px] h-[80px] bg-[#E428B1] drop_shadow rounded-xl text-3xl text-white tracking-[2px] shadow-[0_8px_20px_rgba(255,0,255,0.4)] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(255,0,255,0.6)] transition-all duration-300 active:translate-y-0"
  //         >
  //           AI
  //         </button>
  //       </div>


  //       {/* Floor grid */}
  //       <div
  //         className="pointer-events-none absolute bottom-[-2vh] h-[50vh] w-[140vw] z-0"
  //         style={{
  //           backgroundImage: `
  //             linear-gradient(0deg, transparent 24%, rgba(255,0,255,0.35) 25%, rgba(255,0,255,0.35) 26%, transparent 27%, transparent 74%, rgba(255,0,255,0.35) 75%, rgba(255,0,255,0.35) 76%, transparent 77%, transparent),
  //             linear-gradient(90deg, transparent 24%, rgba(255,0,255,0.35) 25%, rgba(255,0,255,0.35) 26%, transparent 27%, transparent 74%, rgba(255,0,255,0.35) 75%, rgba(255,0,255,0.35) 76%, transparent 77%, transparent)
  //           `,
  //           backgroundSize: "104px 90px",
  //           transform: "perspective(520px) rotateX(50deg)",
  //           transformOrigin: "bottom",
  //           maskImage:
  //             "radial-gradient(100% 70% at 50% 100%, black 55%, transparent 100%), linear-gradient(to top, black 65%, transparent 100%)",
  //           WebkitMaskImage:
  //             "radial-gradient(120% 70% at 50% 100%, black 55%, transparent 100%), linear-gradient(to top, black 65%, transparent 100%)",
  //         }}
  //       />
  //     </div>
  //   );
  // }

  "use client";
import React, { useState, useEffect } from "react";

export default function AIorNOT() {
  const [timeLeft, setTimeLeft] = useState(480); // 8 minutes
  const [score, setScore] = useState(0);
  const [currentImage, setCurrentImage] = useState<{ url: string } | null>(null);
  const [feedback, setFeedback] = useState("");

  // --- Load image from backend ---
  const loadNextImage = async () => {
    try {
      const res = await fetch("http://localhost:8000/image");
      const data = await res.json();
      setCurrentImage({ url: data.image_url });
      setFeedback("");
    } catch (err) {
      console.error("Error fetching image:", err);
    }
  };

  // --- Handle user guess ---
  const handleGuess = async (guessIsAI: boolean) => {
    if (!currentImage) return;

    try {
      const res = await fetch("http://localhost:8000/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_guess: guessIsAI ? "ai" : "human" }),
      });

      const data = await res.json();
      setFeedback(data.result);

      if (data.correct) setScore((s) => s + 10);

      setTimeout(() => loadNextImage(), 1000);
    } catch (err) {
      console.error("Error verifying guess:", err);
    }
  };

  // --- Timer ---
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // --- On Mount ---
  useEffect(() => {
    loadNextImage();
  }, []);

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
      <div className="absolute top-8 right-10 z-10 text-3xl text-[#FFD4EB] [text-shadow:_0_0_10px_#FFD4EB]">
        {formatTime(timeLeft)}
      </div>

      {/* Title */}
      <h1
        className="text-center text-[60px] font-['Press_Start_2P'] font-normal text-[#FFD4EB]
              mb-10 whitespace-nowrap
              animate-[neonPulse_2.5s_ease-in-out_infinite]
              [text-shadow:_0_0_10px_#FFD4EB,_0_0_20px_#FF99CC,_0_0_40px_#FF33CC,_0_0_80px_#FF00FF]"
      >
        AI or NOT
      </h1>

      {/* Image Display Container */}
      <div className="relative mb-8 z-10">
        <div
          className="border-4 border-[#ff6b35] p-8 rounded-3xl shadow-[0_0_30px_rgba(255,107,53,0.4)] bg-[url('/images/texture.jpg')] bg-no-repeat bg-center"
          style={{ backgroundSize: "120%" }}
        >
          <div className="border-8 border-[#ff00ff] rounded-2xl overflow-hidden bg-[#1a0e30] shadow-[inset_0_0_30px_rgba(255,0,255,0.3)]">
            <div className="w-[700px] h-[350px] flex items-center justify-center bg-gradient-to-br from-[#2a1548] to-[#1a0e30]">
              {currentImage ? (
                <img
                  src={currentImage.url}
                  alt="Guess if AI or Human"
                  className="w-full h-full object-cover"
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
      <div className="flex gap-[120px] z-10">
        <button
          onClick={() => handleGuess(false)}
          className="w-[200px] h-[80px] bg-[#EC6A16] rounded-xl text-3xl text-white tracking-[2px]
                     shadow-[0_8px_20px_rgba(255,107,53,0.4)]
                     hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(255,107,53,0.6)]
                     transition-all duration-300 active:translate-y-0"
        >
          HUMAN
        </button>

        <button
          onClick={() => handleGuess(true)}
          className="w-[200px] h-[80px] bg-[#E428B1] rounded-xl text-3xl text-white tracking-[2px]
                     shadow-[0_8px_20px_rgba(255,0,255,0.4)]
                     hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(255,0,255,0.6)]
                     transition-all duration-300 active:translate-y-0"
        >
          AI
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