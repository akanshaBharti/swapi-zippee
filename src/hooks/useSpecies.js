import { useState, useEffect } from "react";
import { fetchSpecies } from "../services/swapiService";

/**
 * Custom hook for fetching species details
 * @param {Array<string>} speciesUrls - Array of species URLs
 * @returns {Object} - Object containing species data and loading state
 */
export const useSpecies = (speciesUrls) => {
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!speciesUrls || speciesUrls.length === 0) {
      setSpecies({ name: "Human" }); // Default to Human if no species specified
      return;
    }

    const loadSpecies = async () => {
      try {
        setLoading(true);
        const data = await fetchSpecies(speciesUrls[0]); // Use first species
        setSpecies(data);
      } catch (err) {
        console.error("Error loading species:", err);
        setSpecies({ name: "Human" });
      } finally {
        setLoading(false);
      }
    };

    loadSpecies();
  }, [speciesUrls]);

  return { species, loading };
};
