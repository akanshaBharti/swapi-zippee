import { useState, useEffect } from "react";
import { fetchPlanet } from "../services/swapiService";

/**
 * Custom hook for fetching homeworld details
 * @param {string} homeworldUrl - The URL of the homeworld
 * @returns {Object} - Object containing homeworld data and loading state
 */
export const useHomeworld = (homeworldUrl) => {
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!homeworldUrl) return;

    const loadHomeworld = async () => {
      try {
        setLoading(true);
        const data = await fetchPlanet(homeworldUrl);
        setHomeworld(data);
      } catch (err) {
        console.error("Error loading homeworld:", err);
        setHomeworld(null);
      } finally {
        setLoading(false);
      }
    };

    loadHomeworld();
  }, [homeworldUrl]);

  return { homeworld, loading };
};
