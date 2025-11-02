// "use client";
// import React from "react";
// import Link from "next/link";

// export default function BeatLeap() {
//   return (
//     <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-[#1a0a2e] to-[#0f0520] text-white font-['Press_Start_2P'] flex flex-col items-center justify-center">
//       {/* Logo */}
//       <div className="absolute top-8 left-10 z-10">
//         <img src="/images/leap_purple 1.png" alt="LEAP Experience" className="w-24" />
//       </div>

//       {/* Title */}
//       <h1 className="text-center text-[100px] font-['Press_Start_2P'] font-normal text-[#FFD4EB] mb-10 whitespace-nowrap animate-[neonPulse_2.5s_ease-in-out_infinite] [text-shadow:_0_0_10px_#FFD4EB,_0_0_20px_#FF99CC,_0_0_40px_#FF33CC,_0_0_80px_#FF00FF]">
//         BEAT LEAP
//       </h1>

//       {/* Main Menu Grid */}
//       <div
//         className="grid [grid-template-columns:repeat(2,max-content)] gap-x-3 gap-y-6 p-10
//                    border-4 border-[#ff00ff] rounded-2xl bg-[rgba(20,10,35,0.7)]
//                    shadow-[0_0_25px_#ff00ff,inset_0_0_20px_rgba(255,0,255,0.2)]
//                    z-10 bg-[url('/images/texture.jpg')] bg-no-repeat bg-center
//                    w-[min(58rem,88vw)] mx-auto justify-center items-center"
//         style={{ backgroundSize: "120%" }}
//       >
//         {/* Card 1 */}
//         <Link
//           href="/ai_or_not"
//           className="w-[300px] h-[220px] flex flex-col items-center justify-center rounded-xl p-6 text-center bg-gradient-to-br from-[#2a1548] to-[#1a0e30] border-4 border-[#ff6b35] shadow-[0_8px_15px_rgba(255,107,53,0.25)] hover:-translate-y-2 transition-all duration-300"
//         >
//           <img src="/images/image 217.png" alt="AI or Not" className="h-28 mb-5" />
//           <div className="text-sm tracking-[2px] text-[#FFC9F0]">AI OR NOT</div>
//         </Link>

//         {/* Card 2 */}
//         <Link
//           href="/interro_room"
//           className="w-[300px] h-[220px] flex flex-col items-center justify-center rounded-xl p-6 text-center bg-gradient-to-br from-[#2a1548] to-[#1a0e30] border-4 border-[#ff6b35] shadow-[0_8px_15px_rgba(255,107,53,0.25)] hover:-translate-y-2 transition-all duration-300"
//         >
//           <img src="/images/image 218.png" alt="Interrogation Room" className="h-28 mb-5" />
//           <div className="text-sm tracking-[2px] text-[#FFC9F0]">INTERROGATION ROOM</div>
//         </Link>

//         {/* Card 3 */}
//         <div className="w-[300px] h-[220px] flex flex-col items-center justify-center rounded-xl p-6 text-center bg-gradient-to-br from-[#2a1548] to-[#1a0e30] border-4 border-[#ff6b35] shadow-[0_8px_15px_rgba(255,107,53,0.25)] hover:-translate-y-2 transition-all duration-300">
//           <img src="/images/image 219.png" alt="Story Hunt" className="h-28 mb-5" />
//           <div className="text-sm tracking-[2px] text-[#FFC9F0]">STORY HUNT</div>
//         </div>

//         {/* Card 4 */}
//         <div className="w-[300px] h-[220px] flex flex-col items-center justify-center rounded-xl p-6 text-center bg-gradient-to-br from-[#2a1548] to-[#1a0e30] border-4 border-[#ff6b35] shadow-[0_8px_15px_rgba(255,107,53,0.25)] hover:-translate-y-2 transition-all duration-300">
//           <img src="/images/image 220.png" alt="Pixel Fog" className="h-28 mb-5" />
//           <div className="text-sm tracking-[2px] text-[#FFC9F0]">PIXEL FOG</div>
//         </div>
//       </div>

//       {/* Floor grid (unchanged) */}
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
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function BeatLeap() {
  const [status, setStatus] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/games/status")
      .then((res) => res.json())
      .then((data) => {
        setStatus(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching game status:", err));
  }, []);

  if (loading) {
    return (
      <div className="text-white flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const renderCard = (
    href: string,
    img: string,
    label: string,
    open: boolean
  ) => {
    const commonClasses =
      "w-[300px] h-[220px] flex flex-col items-center justify-center rounded-xl p-6 text-center bg-gradient-to-br from-[#2a1548] to-[#1a0e30] border-4 border-[#ff6b35] shadow-[0_8px_15px_rgba(255,107,53,0.25)] transition-all duration-300";
    const disabledStyle = "opacity-40 cursor-not-allowed";

    return open ? (
      <Link href={href} className={`${commonClasses} hover:-translate-y-2`}>
        <img src={img} alt={label} className="h-28 mb-5" />
        <div className="text-sm tracking-[2px] text-[#FFC9F0]">{label}</div>
      </Link>
    ) : (
      <div className={`${commonClasses} ${disabledStyle}`}>
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
      <h1 className="text-center text-[100px] text-[#FFD4EB] mb-10">BEAT LEAP</h1>

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
    </div>
  );
}