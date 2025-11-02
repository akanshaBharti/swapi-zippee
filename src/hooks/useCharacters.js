import { useState, useEffect } from "react";
import { fetchPeople } from "../services/swapiService";

/**
 * Custom hook for fetching Star Wars characters with pagination
 * @param {number} page - The current page number
 * @returns {Object} - Object containing characters, loading state, error, and pagination info
 */
export const useCharacters = (page = 1) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPeople(page);

        setCharacters(data.results);
        setCount(data.count);
        setTotalPages(Math.ceil(data.count / 10)); // SWAPI returns 10 results per page
      } catch (err) {
        setError(err.message || "Failed to load characters");
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [page]);

  return {
    characters,
    loading,
    error,
    totalPages,
    count,
  };
};
