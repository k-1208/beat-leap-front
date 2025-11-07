"use server";

export async function text2img({
  inputs,
  parameters,
}: {
  inputs: string;
  parameters: {
    guidance_scale: number;
    seed?: number;
    negative_prompt: string | undefined;
    num_inference_steps: number;
    width: number;
    height: number;
  };
}) {
  const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
  const HUGGINGFACE_API_URL =
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large-turbo"; // Stable Diffusion XL

  if (!HUGGINGFACE_API_KEY) {
    throw new Error("HUGGINGFACE_API_KEY is not set in environment variables.");
  }

  if (!inputs || inputs.trim() === "") {
    throw new Error("No input text was provided.");
  }

  if (parameters.negative_prompt?.trim() !== "") {
    parameters.negative_prompt = parameters.negative_prompt?.replaceAll(
      "\n",
      ", "
    );
  }

  try {
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
      },
      body: JSON.stringify({ inputs, parameters }),
    });

    if (!response.ok) {
      throw new Error(
        `Hugging Face API error: ${response.status} - ${response.statusText}`
      );
    }

    // The response is an image, so we need to return it as a buffer
    const imageBuffer = await response.arrayBuffer();

    // Convert the ArrayBuffer to a Base64 string
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    return `data:image/png;base64,${base64Image}`;
  } catch (error: unknown) {
    console.error("Hugging Face API Error:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to query Hugging Face API: ${error.message}`);
    } else {
      throw new Error(
        `Failed to query Hugging Face API: An unknown error occurred`
      );
    }
  }
}
