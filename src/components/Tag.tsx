export default function Tag({
  tag,
  deleteTag,
}: {
  tag: string;
  deleteTag: () => void;
}) {
  return (
    <span className="bg-emerald-400 text-white flex flex-row items-center py-1 px-2 rounded-sm">
      <span className="mr-2">{tag}</span>
      <button
        onClick={deleteTag}
        className="text-gray-500 hover:text-black text-[0.8rem]"
      >
        x
      </button>
    </span>
  );
}
