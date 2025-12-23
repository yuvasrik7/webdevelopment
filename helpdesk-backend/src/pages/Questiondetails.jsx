import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { app, db } from "../fireconnection";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = getAuth(app);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ---------- AUTH STATE LISTENER ---------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  /* ---------- SAVE USER TO FIRESTORE ---------- */
  const saveUserToDB = async (user, provider, extraData = {}) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    await setDoc(
      userRef,
      {
        uid: user.uid,
        email: user.email,
        name: extraData.name || user.displayName || "Anonymous",
        interests: extraData.interests || [],
        skillLevel: extraData.skillLevel || "beginner",

        provider,
        joinedAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  /* ---------- SIGNUP ---------- */
  const signup = async (
    email,
    password,
    { name, interests, skillLevel }
  ) => {
    try {
      setError(null);

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await saveUserToDB(result.user, "password", {
        name,
        interests,
        skillLevel,
      });

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /* ---------- LOGIN ---------- */
  const login = async (email, password) => {
    try {
      setError(null);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /* ---------- GOOGLE LOGIN ---------- */
  const loginWithGoogle = async () => {
    try {
      setError(null);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      await saveUserToDB(result.user, "google", {
        name: result.user.displayName,
        interests: [],
        skillLevel: "beginner",
      });

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /* ---------- LOGOUT ---------- */
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    loginWithGoogle,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}
