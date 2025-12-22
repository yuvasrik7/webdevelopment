import { useCallback, useEffect, useState } from "react";
import {
  collection,
  doc,
  query,
  where,
  orderBy,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,increment
} from "firebase/firestore";
import { db } from "../fireconnection";
import { useAuthContext } from "./useAuth";

/**
 * useAnswers Hook
 *
 * Manages answers for a specific question
 */
export function useAnswers(questionId) {
  const { user } = useAuthContext();

  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ---------- REALTIME LISTENER ---------- */

  useEffect(() => {
    if (!questionId) {
      setAnswers(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const q = query(
      collection(db, "answers"),
      where("questionId", "==", questionId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const docs = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnswers(docs);
        console.log(
          ` Loaded ${docs.length} answers for question ${questionId}`
        );
        setLoading(false);
      },
      (err) => {
        console.error("❌ Answers listener error:", err);
        setError(err.message || "Failed to load answers");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [questionId]);

  /* ---------- CREATE ---------- */

  const createAnswer = useCallback(
    async (qId, content) => {
      try {
        if (!user) throw new Error("Must be logged in to answer");
        if (!content.trim())
          throw new Error("Answer content cannot be empty");

        setError(null);
        console.log(" Creating answer...");

        const docRef = await addDoc(collection(db, "answers"), {
          questionId: qId,
          userId: user.uid,
          content,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          upvotes: 0,
          isAccepted: false,
        });

        console.log("✅ Answer created:", docRef.id);
        return docRef.id;
      } catch (err) {
        const errorMsg = err.message || "Failed to create answer";
        console.error("❌ Create answer error:", err);
        setError(errorMsg);
        throw err;
      }
    },
    [user]
  );

  /* ---------- UPDATE ---------- */

  const updateAnswer = useCallback(
    async (id, content) => {
      try {
        if (!user) throw new Error("Must be logged in to update answer");

        const docRef = doc(db, "answers", id);
        const snap = await getDoc(docRef);

        if (!snap.exists()) throw new Error("Answer not found");
        if (snap.data().userId !== user.uid)
          throw new Error("You can only update your own answers");

        setError(null);
        console.log(" Updating answer...");

        await updateDoc(docRef, {
          content,
          updatedAt: serverTimestamp(),
        });

        console.log("✅ Answer updated:", id);
      } catch (err) {
        const errorMsg = err.message || "Failed to update answer";
        console.error("❌ Update answer error:", err);
        setError(errorMsg);
        throw err;
      }
    },
    [user]
  );

  /* ---------- DELETE ---------- */

  const deleteAnswer = useCallback(
    async (id) => {
      try {
        if (!user) throw new Error("Must be logged in to delete answer");

        const docRef = doc(db, "answers", id);
        const snap = await getDoc(docRef);

        if (!snap.exists()) throw new Error("Answer not found");
        if (snap.data().userId !== user.uid)
          throw new Error("You can only delete your own answers");

        setError(null);
        console.log(" Deleting answer...");

        await deleteDoc(docRef);

        console.log("✅ Answer deleted:", id);
      } catch (err) {
        const errorMsg = err.message || "Failed to delete answer";
        console.error("❌ Delete answer error:", err);
        setError(errorMsg);
        throw err;
      }
    },
    [user]
  );

  /* ---------- UPVOTE ---------- */

 const upvoteAnswer = useCallback(async (id) => {
  try {
    const docRef = doc(db, "answers", id);

    await updateDoc(docRef, {
      upvotes: increment(1),
    });

    console.log("✅ Answer upvoted");
  } catch (err) {
    console.error("❌ Upvote error:", err);
    throw err;
  }
},[]);

  /* ---------- MARK AS ACCEPTED ---------- */

  const markAsAccepted = useCallback(
    async (id) => {
      try {
        if (!user) throw new Error("Must be logged in");

        const answerRef = doc(db, "answers", id);
        const snap = await getDoc(answerRef);

        if (!snap.exists()) throw new Error("Answer not found");

        setError(null);
        console.log(" Marking answer as accepted...");

        await updateDoc(answerRef, {
          isAccepted: true,
        });

        console.log("✅ Answer marked as accepted:", id);
      } catch (err) {
        const errorMsg = err.message || "Failed to mark as accepted";
        console.error("❌ Mark accepted error:", err);
        setError(errorMsg);
        throw err;
      }
    },
    [user]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    answers,
    loading,
    error,
    createAnswer,
    updateAnswer,
    deleteAnswer,
    upvoteAnswer,
    markAsAccepted,
    clearError,
  };
}
