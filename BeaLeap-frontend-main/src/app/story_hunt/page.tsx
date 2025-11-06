    "use client";
    import React, { useMemo, useRef, useState } from "react";
    import { getTeamSession } from "@/lib/session"; // keep your existing helper

    const UPLOAD_ENDPOINT = "http://localhost:8000/images/upload";
    const MAX_FILES = 10;

    type LabeledFile = {
    file: File;
    url: string; // preview
    };

    export default function StoryHuntUploader() {
    const session = getTeamSession();
    if (!session) return null;
    const { team_name, password, server_session } = session;

    const [items, setItems] = useState<LabeledFile[]>([]);
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);

    const hiddenInputRef = useRef<HTMLInputElement | null>(null);

    const countText = useMemo(
        () => `${items.length} / ${MAX_FILES} selected`,
        [items.length]
    );

    function openPicker() {
        hiddenInputRef.current?.click();
    }

    function onPick(e: React.ChangeEvent<HTMLInputElement>) {
        const picked = Array.from(e.target.files || []);
        if (!picked.length) return;

        const merged = [
        ...items,
        ...picked.slice(0, Math.max(0, MAX_FILES - items.length)).map((f) => ({
            file: f,
            label: "unknown" as const,
            url: URL.createObjectURL(f),
        })),
        ].slice(0, MAX_FILES);

        setItems(merged);
        e.target.value = ""; // allow re-pick of same files
    }


    function removeAt(i: number) {
        setItems((prev) => {
        const copy = [...prev];
        // revoke object URL to avoid memory leaks
        URL.revokeObjectURL(copy[i].url);
        copy.splice(i, 1);
        return copy;
        });
    }

    async function onSubmit() {
        if (!items.length) return;

        setBusy(true);
        setMsg("Uploading...");

        const fd = new FormData();
        fd.append("team_name", team_name);
        fd.append("password", password);
        fd.append("server_session", server_session);

        

        items.forEach((it) => fd.append("files", it.file));

        try {
        const res = await fetch(UPLOAD_ENDPOINT, { method: "POST", body: fd });
        if (!res.ok) {
            let detail = `HTTP ${res.status}`;
            try {
            const j = await res.json();
            if (j?.detail) detail = j.detail;
            } catch {}
            throw new Error(detail);
        }
        const data = await res.json();
        setMsg(`Uploaded ${data.count} image(s).`);
        // clear after success
        items.forEach((it) => URL.revokeObjectURL(it.url));
        setItems([]);
        } catch (e: any) {
        setMsg(`Upload failed: ${e.message}`);
        } finally {
        setBusy(false);
        }
    }

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0C0614] text-white font-['Press_Start_2P'] flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="absolute top-8 left-10 z-10">
        <img src="/images/leap_purple 1.png" alt="LEAP Experience" className="w-24" />
      </div>

      {/* Title */}
      <h1
        className="text-center text-[60px] font-['Press_Start_2P'] font-normal text-[#FFD4EB] mb-8 whitespace-nowrap
                   animate-[neonPulse_2.5s_ease-in-out_infinite]
                   [text-shadow:_0_0_10px_#FFD4EB,_0_0_20px_#B26BFF,_0_0_40px_#8A2BE2]"
      >
        Story Hunt
      </h1>

      {/* Big Screen Container */}
      <div className="relative mb-10 z-10">
        <div
          className="border-4 border-[rgba(255,255,255,0.06)] p-6 rounded-3xl shadow-[0_0_30px_rgba(162,90,255,0.35)]
                     bg-[url('/images/texture.jpg')] bg-no-repeat bg-center"
          style={{ backgroundSize: "120%" }}
        >
          <div className="border-8 border-[#B26BFF] rounded-2xl overflow-hidden bg-[#1a0e30]
                          shadow-[inset_0_0_30px_rgba(178,107,255,0.35)]">
            {/* Screen content */}
            <div className="w-[900px] h-[420px] flex flex-col gap-3 p-4">
              {/* helper row */}

              {/* Previews grid */}
              <div className="grid grid-cols-5 gap-3 overflow-auto pr-1">
                {items.map((it, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={it.url}
                      alt={`pick-${i}`}
                      className="w-full aspect-square object-cover rounded-xl border border-[#3a2c58]"
                    />
                    {/* label toggles */}
                    <div className="mt-1 flex items-center justify-between gap-1">
                      <button
                        onClick={() => removeAt(i)}
                        className="px-2 py-1 rounded-md text-[10px] bg-white/10 hover:bg-white/20"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

                {/* Empty state */}
                {!items.length && (
                  <div className="col-span-5 flex items-center justify-center text-[#C6B8FF]/80 h-[300px]">
                    Pick up to 10 images to preview here.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons row */}
      <div className="flex gap-[140px] items-center z-10">
        {/* UPLOAD */}
        <button
          onClick={openPicker}
          className="w-[220px] h-[86px] bg-[#EC6A16] rounded-xl text-3xl text-white tracking-[2px]
                     shadow-[0_8px_20px_rgba(255,107,53,0.4)]
                     hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(255,107,53,0.6)]
                     transition-all duration-300 active:translate-y-0"
        >
          UPLOAD
        </button>

        {/* hidden file input */}
        <input
          ref={hiddenInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onPick}
          className="hidden"
        />

        {/* SUBMIT */}
        <button
          onClick={onSubmit}
          disabled={!items.length || busy}
          className="w-[220px] h-[86px] bg-[#E428B1] rounded-xl text-3xl text-white tracking-[2px]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-[0_8px_20px_rgba(255,0,255,0.35)]
                     hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(255,0,255,0.55)]
                     transition-all duration-300 active:translate-y-0"
        >
          {busy ? "UPLOADING..." : "SUBMIT"}
        </button>
      </div>

      {/* Result / error */}
      {msg && (
        <div className="mt-6 text-sm text-center text-[#C6B8FF]">{msg}</div>
      )}

      {/* Floor glow */}
      <div
        className="pointer-events-none absolute bottom-[-2vh] h-[48vh] w-[140vw] z-0"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(178,107,255,0.35) 25%, rgba(178,107,255,0.35) 26%, transparent 27%, transparent 74%, rgba(178,107,255,0.35) 75%, rgba(178,107,255,0.35) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(178,107,255,0.35) 25%, rgba(178,107,255,0.35) 26%, transparent 27%, transparent 74%, rgba(178,107,255,0.35) 75%, rgba(178,107,255,0.35) 76%, transparent 77%, transparent)
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
