import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

export default function ImagePreview({
  image,
  width,
  height,
  generating,
}: {
  image: string | null;
  width: number;
  height: number;
  generating: boolean;
}) {
  return (
    <div
      className="max-w-[500px] w-full aspect-square relative rounded-lg bg-neutral-800/80 border-neutral-700 border-2"
      style={{ width: (width / 1024) * 500, height: (height / 1024) * 500 }}
    >
      {image ? (
        <Image
          src={image}
          alt="Generated image"
          fill
          className="object-cover rounded-lg"
        />
      ) : (
        <div className="absolute inset-0 flex justify-center items-center">
          <ImageIcon color="#6b7280" />
        </div>
      )}

      {generating && (
        <div className="absolute inset-0 flex justify-center items-center bg-neutral-800/80 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="animate-spin w-10 h-10">
              <ImageIcon color="#6b7280" />
            </div>
            <p className="text-xs text-neutral-300">Generating...</p>
          </div>
        </div>
      )}
    </div>
  );
}
