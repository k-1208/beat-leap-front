// Define your API token
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

// Define the request data
const requestData = {
  input: {
    prompt: "An impasto unicorn",
    aspect_ratio: "3:2",
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

// Parse the JSON response
const data = await response.json();

// Handle the response
console.log(data);
