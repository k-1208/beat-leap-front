import os
from google import genai
from google.genai import types

# --- Setup and Initialization ---

# 1. API Key Setup:
#    The script expects the GEMINI_API_KEY to be set as an environment variable.
#    You can get your key from the Google AI Studio or Google Cloud Console.
#    To set it in your terminal (macOS/Linux):
#    export GEMINI_API_KEY="YOUR_API_KEY"
#    To set it in PowerShell (Windows):
#    $env:GEMINI_API_KEY="YOUR_API_KEY"
try:
    client = genai.Client()
except Exception as e:
    print("Error initializing Gemini client:")
    print("Please ensure the GEMINI_API_KEY environment variable is set correctly.")
    print(f"Underlying error: {e}")
    # Exit if we can't initialize the client
    exit()

def generate_content_with_gemini(prompt: str):
    """
    Sends a prompt to the Gemini model and streams the response.

    Args:
        prompt (str): The text prompt to send to the model.
    """
    print(f"\n--- Querying Gemini-2.5-Flash with prompt: '{prompt[:50]}...' ---\n")

    try:
        # Configuration for the API call
        config = types.GenerateContentConfig(
            system_instruction="You are a friendly, helpful, and highly informative AI assistant."
        )

        # Call the API to generate content, using streaming for faster output
        response = client.models.generate_content_stream(
            model='gemini-2.5-flash',
            contents=[prompt],
            config=config,
        )

        # Stream the response chunks
        print("Model Response:")
        full_response = ""
        for chunk in response:
            if chunk.text:
                print(chunk.text, end="")
                full_response += chunk.text

        print("\n\n--- Generation Complete ---")
        return full_response

    except Exception as e:
        print(f"\nAn error occurred during content generation: {e}")
        print("Check your API key, network connection, and model availability.")
        return None

# --- Main Execution ---

if __name__ == "__main__":
    # Example prompt
    user_prompt = input("enter prompt: ")

    # Run the generation function
    generate_content_with_gemini(user_prompt)

    # You can try another prompt by changing the variable:
    # new_prompt = "Write a short, four-line poem about a cat."
    # generate_content_with_gemini(new_prompt)
