const API_URL_SESSION =
  process.env.FETCH_URL_SESSION || "http://localhost:3000/session";

export interface Session {
  id: string;
  title: string;
  description: string;
}

export async function getSessions(): Promise<Session[]> {
  try {
    const res = await fetch(API_URL_SESSION, {
      // cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error("Failed to fetch sessions");
    }

    // Eine kurze künstliche Verzögerung, um das Server-Side-Loading zu simulieren
    // await new Promise(resolve => setTimeout(resolve, 1000));

    return res.json();
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return []; // Gib im Fehlerfall eine leere Liste zurück
  }
}

const API_URL_QUESTION =
  process.env.FETCH_URL_QUESTION || "http://localhost:3000/questions";

export interface Question {
  id: string;
  author: string;
  content: string;
  sessionId: string;
  upvotes: number;
}

export async function getQuestionsBySession(
  sessionId: string
): Promise<Question[]> {
  try {
    const res = await fetch(`${API_URL_QUESTION}/session/${sessionId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch questions for session");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}
