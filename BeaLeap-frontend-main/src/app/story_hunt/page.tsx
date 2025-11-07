"use client";
import React, { useMemo, useRef, useState } from "react";
import { getTeamSession } from "@/lib/session";

const UPLOAD_ENDPOINT = "http://localhost:8000/images/upload";
const TEXT_ENDPOINT   = "http://localhost:8000/story/submit";
const MAX_FILES = 10;
const MAX_WORDS = 200;

type LabeledFile = { file: File; url: string };

export default function StoryHuntUploader() {
  const session = getTeamSession();
  if (!session) return null;
  const { team_name, password, server_session } = session;

  const [items, setItems] = useState<LabeledFile[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [story, setStory] = useState<string>("");

  const wordCount = useMemo(
    () => story.trim().split(/\s+/).filter(Boolean).length,
    [story]
  );
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const countText = `${items.length} / ${MAX_FILES} selected`;

  function openPicker() { hiddenInputRef.current?.click(); }
  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;
    const merged = [
      ...items,
      ...picked.slice(0, Math.max(0, MAX_FILES - items.length)).map((f) => ({
        file: f, url: URL.createObjectURL(f),
      })),
    ].slice(0, MAX_FILES);
    setItems(merged);
    e.target.value = "";
  }
  function removeAt(i: number) {
    setItems((prev) => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[i].url);
      copy.splice(i, 1);
      return copy;
    });
  }
  function onStoryChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const raw = e.target.value;
    const words = raw.trim().split(/\s+/).filter(Boolean);
    setStory(words.length <= MAX_WORDS ? raw : words.slice(0, MAX_WORDS).join(" "));
  }

  async function onSubmit() {
    if (!items.length && !story.trim()) return;
    setBusy(true); setMsg("Uploading...");

    const fd = new FormData();
    fd.append("team_name", team_name);
    fd.append("password", password);
    fd.append("server_session", server_session);
    items.forEach((it) => fd.append("files", it.file));

    try {
      // upload images
      if (items.length) {
        const res = await fetch(UPLOAD_ENDPOINT, { method: "POST", body: fd });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        items.forEach((it) => URL.revokeObjectURL(it.url));
        setItems([]);
      }
      // submit story
      if (story.trim()) {
        const resText = await fetch(TEXT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ team_name, password, server_session, story }),
        });
        if (!resText.ok) throw new Error(`HTTP ${resText.status}`);
        setStory("");
      }
      setMsg("Upload complete!");
    } catch (e: any) {
      setMsg(`Upload failed: ${e.message}`);
    } finally { setBusy(false); }
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0C0614] text-white font-['Press_Start_2P'] flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="absolute top-8 left-10 z-10">
        <img src="/images/leap_purple 1.png" alt="LEAP Experience" className="w-24" />
      </div>

      {/* Title */}
      <h1 className="text-center text-[60px] font-normal text-[#FFD4EB] mb-8 whitespace-nowrap animate-[neonPulse_2.5s_ease-in-out_infinite]
                   [text-shadow:_0_0_10px_#FFD4EB,_0_0_20px_#B26BFF,_0_0_40px_#8A2BE2]">
        Story Hunt
      </h1>

      {/* Two-column layout with shared background */}
<div
  className="relative mb-6 z-10 border-4 border-[rgba(255,255,255,0.06)] p-6 rounded-3xl shadow-[0_0_30px_rgba(162,90,255,0.35)]
             bg-[url('/images/texture.jpg')] bg-no-repeat bg-center"
  style={{ backgroundSize: "120%" }}
>
  <div
    className="border-8 border-[#B26BFF] rounded-2xl overflow-hidden bg-[#1a0e30]
               shadow-[inset_0_0_30px_rgba(178,107,255,0.35)] p-6"
  >
    <div className="grid grid-cols-[520px_380px] gap-10">
      {/* --- Left: Image Uploader --- */}
      <div className="w-[480px] h-[420px] flex flex-col gap-3">
        <div className="flex justify-between text-xs text-[#C6B8FF]/80">
          <span>Selected: {countText}</span>
        </div>
        <div className="grid grid-cols-3 gap-3 overflow-auto pr-1">
          {items.map((it, i) => (
            <div key={i} className="relative group">
              <img
                src={it.url}
                alt={`pick-${i}`}
                className="w-full aspect-square object-cover rounded-xl border border-[#3a2c58]"
              />
              <button
                onClick={() => removeAt(i)}
                className="absolute top-1 right-1 px-2 py-[1px] rounded-md text-[10px] bg-white/10 hover:bg-white/20"
              >
                ✕
              </button>
            </div>
          ))}
          {!items.length && (
            <div className="col-span-3 flex items-center justify-center text-[#C6B8FF]/80 h-[300px] text-xs text-center">
              Pick up to 10 images to preview here.
            </div>
          )}
        </div>
      </div>

      {/* --- Right: Text Box --- */}
      <div className="w-[380px] flex flex-col">
        <label className="mb-2 text-[#C6B8FF]/90 text-xs">
          Your Story (max {MAX_WORDS} words)
        </label>
        <textarea
          value={story}
          onChange={onStoryChange}
          placeholder="Type your story here..."
          className="w-full h-[420px] rounded-xl bg-[#251943] border border-[#3a2c58] p-4 text-sm outline-none focus:ring-2 focus:ring-[#B26BFF]"
        />
        <div className="mt-1 text-[11px] text-[#C6B8FF]/70 text-right">
          {wordCount} / {MAX_WORDS} words
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Buttons */}
      <div className="mt-8 flex gap-[140px] items-center z-10">
        <button
          onClick={openPicker}
          className="w-[220px] h-[86px] bg-[#EC6A16] rounded-xl text-3xl text-white tracking-[2px]
                     shadow-[0_8px_20px_rgba(255,107,53,0.4)]
                     hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(255,107,53,0.6)]
                     transition-all duration-300 active:translate-y-0">
          UPLOAD
        </button>
        <input ref={hiddenInputRef} type="file" accept="image/*" multiple onChange={onPick} className="hidden" />
        <button
          onClick={onSubmit}
          disabled={(items.length === 0 && !story.trim()) || busy}
          className="w-[220px] h-[86px] bg-[#E428B1] rounded-xl text-3xl text-white tracking-[2px]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-[0_8px_20px_rgba(255,0,255,0.35)]
                     hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(255,0,255,0.55)]
                     transition-all duration-300 active:translate-y-0">
          {busy ? "UPLOADING..." : "SUBMIT"}
        </button>
      </div>

      {msg && <div className="mt-6 text-sm text-center text-[#C6B8FF]">{msg}</div>}
    </div>
  );
}
