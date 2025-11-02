import { useRef } from "react";

export default function Prompt({
  prompt,
  setPrompt,
  placeholder = "Enter your prompt",
}: {
  prompt: string;
  setPrompt: (prompt: string) => void;
  placeholder?: string;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Expand
    }
  };

  return (
    <textarea
      ref={textAreaRef}
      placeholder={placeholder}
      value={prompt}
      onChange={handleInput}
      className="w-full min-h-14 py-4 px-6 resize-none overflow-hidden rounded-lg bg-neutral-800/80 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
      rows={1}
    />
  );
}
