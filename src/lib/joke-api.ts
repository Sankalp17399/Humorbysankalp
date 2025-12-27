export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

const BASE_URL = "https://official-joke-api.appspot.com";

export type JokeCategory = "general" | "programming" | "knock-knock" | "random";

/**
 * Fetches a joke from the Official Joke API.
 * @param category - The type of joke to fetch.
 */
export async function getJoke(category: JokeCategory = "random"): Promise<Joke> {
  const endpoint = category === "random" 
    ? `${BASE_URL}/random_joke` 
    : `${BASE_URL}/jokes/${category}/random`;

  const response = await fetch(endpoint);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  // API returns an array for typed requests but a single object for random_joke
  const joke = Array.isArray(data) ? data[0] : data;
  
  if (!joke.setup || !joke.punchline) {
      throw new Error("Invalid joke format received from API.");
  }
  
  return joke as Joke;
}