import { useState, useCallback } from "react";
import { getMatchedPeers } from "../firebase/matchingService";

export function useMatching() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Find matching peers for a given user
   * @param {string} userId - Current user ID
   * @param {number} limit - Max number of matches to return
   */
  const findMatches = useCallback(async (userId, limit = 10) => {
    if (!userId) {
      const errMsg = "User ID is required to find matches";
      setError(errMsg);
      throw new Error(errMsg);
    }

    try {
      setLoading(true);
      setError(null);

      const result = await getMatchedPeers(userId, limit);
      setMatches(result);

      return result;
    } catch (err) {
      setError(err?.message || "Failed to fetch matches");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /** Clear current matches and errors */
  const clearMatches = useCallback(() => {
    setMatches([]);
    setError(null);
  }, []);

  return {
    matches,
    loading,
    error,
    findMatches,
    clearMatches,
  };
}
