"use server"; // <-- Wichtig: Deklariert dieses File als Server Actions File

import { revalidatePath } from "next/cache";

const API_URL_SESSION = "http://localhost:3000/session";
const API_URL_QUESTION = "http://localhost:3000/questions";

/**
 * Erstellt ein neues ToDo auf dem JSON Server.
 * Wird als Server Action von der Client Component aufgerufen.
 */
export async function createSession(
  title: string,
  description: string
): Promise<void> {
  const newSession = {
    title: title,
    description: description,
    // JSON Server generiert die ID automatisch
  };

  try {
    await fetch(API_URL_SESSION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSession),
    });

    // Nach dem erfolgreichen Speichern:
    // Revalidiert den Cache für die Route '/todos',
    // wodurch die ListTodo Component neu gerendert wird
    // und die neuen Daten abgerufen werden.
    revalidatePath("/");
  } catch (error) {
    console.error("Error creating Session:", error);
    // Hier könnten Sie Fehlerbehandlung hinzufügen
  }
}

export async function createQuestion(
  author: string,
  content: string,
  sessionId: string
): Promise<void> {
  const newQuestion = {
    author,
    content,
    sessionId,
  };

  try {
    await fetch(API_URL_QUESTION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    });

    revalidatePath(`/sessions/${sessionId}`);
  } catch (error) {
    console.error("Error creating Question:", error);
  }
}
