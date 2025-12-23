import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./fireconnection";

/**
 * CORE LOGIC: Create a question
 * --------------------------------
 * Gathers question info and persists it to Firestore
 *
 * @param {Object} payload - Question data from client
 * @param {string} payload.title
 * @param {string} payload.content
 * @param {string[]} payload.tags
 * @param {string} payload.status
 *
 * @param {string} userId - Authenticated user ID
 *
 * @returns {string} questionId
 */
export async function postQuestion(payload, userId) {
  /* ---------- VALIDATION ---------- */

  if (!userId) {
    throw new Error("Authentication required");
  }

  if (!payload?.title || !payload?.content) {
    throw new Error("Title and content are required");
  }

  /* ---------- NORMALIZATION ---------- */

  const question = {
    title: payload.title.trim(),
    content: payload.content.trim(),
    tags: Array.isArray(payload.tags)
      ? payload.tags.map((t) => t.trim())
      : [],
    status: payload.status || "open",
  };

  /* ---------- PERSIST ---------- */

  const docRef = await addDoc(collection(db, "questions"), {
    ...question,

    // system fields
    userId,
    views: 0,
    upvotes: 0,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  /* ---------- RESPONSE ---------- */

  return docRef.id;
}
