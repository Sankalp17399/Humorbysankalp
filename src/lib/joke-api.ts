export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

const JOKE_API_URL = "https://official-joke-api.appspot.com/random_joke";

/**
 * Fetches a random joke from the Official Joke API.
 * @returns A promise that resolves to a Joke object.
 */
export async function getRandomJoke(): Promise<Joke> {
  const response = await fetch(JOKE_API_URL);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Basic runtime check for expected fields
  if (typeof data.setup !== 'string' || typeof data.punchline !== 'string') {
      throw new Error("Invalid joke format received from API.");
  }
  
  return data as Joke;
}