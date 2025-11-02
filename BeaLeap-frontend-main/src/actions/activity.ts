"use server";

export async function submitTextAnswer(
  userId: string | null,
  promptId: string | undefined,
  prompt: string
) {
  try {
    const response = await fetch("http://127.0.0.1:8000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify({
        user_id: userId,
        prompt_id: promptId?.toString(),
        prompt: prompt,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Server Action Error:", error);
    throw error;
  }
}

export async function fetchSubmissions(id: string) {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/submissions?prompt_id=" + id
    );

    return await response.json();
  } catch (error) {
    console.error("Server Action Error:", error);
    throw error;
  }
}
