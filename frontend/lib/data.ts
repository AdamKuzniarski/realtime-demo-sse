const API_URL = process.env.FETCH_URL || "http://localhost:3000/session";

export interface Session {
  id: string;
  title: string;
  description: string;
}

export async function getSessions(): Promise<Session[]> {
  try {
    const res = await fetch(API_URL, {
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
