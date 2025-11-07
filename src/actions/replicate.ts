"use server";

export async function text2img({
  prompt,
  guidance_scale,
  seed,
  num_inference_steps,
}: {
  prompt: string;
  guidance_scale: number;
  seed?: number;
  num_inference_steps: number;
}) {
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

  if (!REPLICATE_API_TOKEN) {
    throw new Error("REPLICATE_API_TOKEN is not set in environment variables.");
  }

  try {
    const requestData = {
      input: {
        prompt,
        aspect_ratio: "1:1",
        cfg: guidance_scale,
        seed: seed,
        steps: num_inference_steps,
      },
    };

    // Make the API call using fetch
    const response = await fetch(
      "https://api.replicate.com/v1/models/stability-ai/stable-diffusion-3.5-large-turbo/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
          Prefer: "wait",
        },
        body: JSON.stringify(requestData),
      }
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();

    return data.output[0];
  } catch (error) {
    console.error("Error from Replicate:", error);
    throw new Error(
      `Failed to generate image: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
