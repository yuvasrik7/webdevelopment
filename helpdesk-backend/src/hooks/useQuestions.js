import { useCallback, useEffect, useState } from "react";
import {
  collection,
  doc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,increment,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../fireconnection";
import { useAuthContext } from "./useAuth";

/* ================= HOOK ================= */

export function useQuestions(questionId, options) {
  const { user } = useAuthContext();

  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ---------- BUILD QUERY ---------- */

  const buildQuery = useCallback(() => {
    const baseRef = collection(db, "questions");
    const constraints = [];

    if (options?.userId) {
      constraints.push(where("userId", "==", options.userId));
    }

    if (options?.onlyOpen) {
      constraints.push(where("status", "==", "open"));
    }

    constraints.push(orderBy("createdAt", "desc"));

    if (options?.limit) {
      constraints.push(limit(options.limit));
    }

    return query(baseRef, ...constraints);
  }, [
    options?.userId,
    options?.onlyOpen,
    options?.limit,
  ]);

  /* ---------- FETCH / LISTEN ---------- */

  useEffect(() => {
    setLoading(true);
    setError(null);

    // SINGLE QUESTION MODE
    if (questionId) {
      const ref = doc(db, "questions", questionId);

      const unsubscribe = onSnapshot(
        ref,
        (snap) => {
          if (snap.exists()) {
            setQuestion({ id: snap.id, ...snap.data() });
          } else {
            setQuestion(null);
            setError("Question not found");
          }
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    }

    // LIST MODE
    const q = buildQuery();

    if (options?.realtime === false) {
      getDocs(q)
        .then((snap) => {
          const data = snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));
          setQuestions(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
      return;
    }

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setQuestions(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [questionId, buildQuery, options?.realtime]);

  /* ---------- CREATE ---------- */

  const createQuestion = useCallback(
    async (data) => {
      if (!user) throw new Error("Login required");

      const docRef = await addDoc(collection(db, "questions"), {
        ...data,
        userId: user.uid,
        views: 0,
        upvotes: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return docRef.id;
    },
    [questionId, buildQuery, realtime]
  );

  /* ---------- UPDATE ---------- */

  const updateQuestion = useCallback(
    async (id, data) => {
      if (!user) throw new Error("Login required");

      const ref = doc(db, "questions", id);
      const snap = await getDoc(ref);

      if (!snap.exists()) throw new Error("Question not found");
      if (snap.data().userId !== user.uid)
        throw new Error("Unauthorized");

      await updateDoc(ref, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    },
    [user]
  );

  /* ---------- DELETE ---------- */

  const deleteQuestion = useCallback(
    async (id) => {
      if (!id) throw new Error("Question ID is required");

      if (!user) throw new Error("Login required");

      const ref = doc(db, "questions", id);
      const snap = await getDoc(ref);

      if (!snap.exists()) throw new Error("Question not found");
      if (snap.data().userId !== user.uid)
        throw new Error("Unauthorized");

      await deleteDoc(ref);
    },
    [user]
  );

  /* ---------- ENGAGEMENT ---------- */

  const  incrementViews = useCallback(async (id) => {
    try {
      if (!id) throw new Error("Question ID is required");

      const docRef = doc(db, "questions", id);
  
      await updateDoc(docRef, {
        views: increment(1),
      });
  
      console.log(" questionviews upvoted");
    } catch (err) {
      console.error(" Upvote error:", err);
      throw err;
    }
  },[]);

  const  incrementUpvotes = useCallback(async (id) => {
    try {
      if (!id) throw new Error("Question ID is required");

      const docRef = doc(db, "questions", id);
  
      await updateDoc(docRef, {
        upvotes: increment(1),
      });
  
      console.log(" question upvoted");
    } catch (err) {
      console.error(" Upvote error:", err);
      throw err;
    }
  },[]);
 

  const clearError = () => setError(null);

  return {
    questions,
    question,
    loading,
    error,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    incrementViews,
    incrementUpvotes,
    clearError,
  };
}
