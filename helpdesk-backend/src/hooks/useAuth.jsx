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
import { app } from "../fireconnection";

/* ================= CONTEXT ================= */

const AuthContext = createContext(null);

/* ================= PROVIDER ================= */

export function AuthProvider({ children }) {
  const auth = getAuth(app);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ---------- REAL-TIME AUTH LISTENER ---------- */
  // Similar to Firestore onSnapshot()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // null if logged out
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  /* ---------- ONE-TIME AUTH ACTIONS ---------- */

  // Signup (one-time)
  const signup = async (email, password) => {
    try {
      setError(null);
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Login (one-time)
  const login = async (email, password) => {
    try {
      setError(null);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Google login (one-time)
  const loginWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout (one-time)
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
      {/* Prevent UI flicker */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}
