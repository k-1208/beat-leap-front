import LoadingDots from "./LoadingDots";

export default function GenerateButton({
  handleSubmit,
  generating,
}: {
  handleSubmit: () => void;
  generating: boolean;
}) {
  return (
    <button
      className={
        "w-fit min-w-40 max-h-14 px-6 py-4 rounded-lg transition-colors duration-300 ease-in-out text-gray-900 font-semibold " +
        (generating
          ? "cursor-not-allowed bg-emerald-500"
          : "bg-emerald-400 hover:bg-emerald-500")
      }
      onClick={handleSubmit}
      disabled={generating}
    >
      {generating ? (
        <p>
          <span>Generating</span>
          <span className="min-w-[3ch] text-left">
            <LoadingDots />
          </span>
        </p>
      ) : (
        <p>
          Generate <span>&rarr;</span>
        </p>
      )}
    </button>
  );
}
