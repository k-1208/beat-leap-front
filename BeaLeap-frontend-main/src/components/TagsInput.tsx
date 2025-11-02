import Tag from "./Tag";
import { useRef } from "react";
import { Trash2 } from "lucide-react";

export default function TagsInput({
  tags,
  setTags,
  placeholder = "Enter your tags",
}: {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const tag = e.currentTarget.value.trim();
      if (tag) {
        if (!tags.includes(tag)) {
          setTags([...tags, tag]);
        }
        e.currentTarget.value = "";
      }
    }
  };

  const deleteTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={focusInput}
      className="w-full min-h-20 py-4 px-6 flex flex-wrap items-center gap-2 rounded-lg bg-neutral-800/80 text-gray-300 placeholder-gray-500"
    >
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} deleteTag={() => deleteTag(tag)} />
      ))}
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="flex-grow bg-transparent focus:outline-none text-gray-300 placeholder-gray-500"
      />
      {tags.length > 0 && (
        <button className="p-1" onClick={() => setTags([])}>
          <Trash2 className="text-gray-400 hover:text-gray-500" />
        </button>
      )}
    </div>
  );
}
