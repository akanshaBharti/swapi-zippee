import { useState, useEffect } from "react";
import {
  fetchPeople,
  fetchPlanet,
  fetchSpecies,
  fetchFilm,
} from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/services/swapiService";

/**
 * Custom hook for fetching all Star Wars characters with their full details
 * @returns {Object} - Object containing all characters with enriched data
 */
export const useAllCharacters = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAllCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

        const characters = [];
        let page = 1;
        let hasMore = true;

        // Fetch all pages
        while (hasMore) {
          const data = await fetchPeople(page);
          characters.push(...data.results);
          hasMore = data.next !== null;
          page++;
        }

        // Enrich characters with homeworld and species names
        const enrichedCharacters = await Promise.all(
          characters.map(async (character) => {
            try {
              // Fetch homeworld name
              let homeworldName = "Unknown";
              if (character.homeworld) {
                const homeworld = await fetchPlanet(character.homeworld);
                homeworldName = homeworld.name;
              }

              // Fetch species name
              let speciesName = "Human";
              if (character.species && character.species.length > 0) {
                const species = await fetchSpecies(character.species[0]);
                speciesName = species.name;
              }

              // Fetch film titles
              let filmTitles = [];
              if (character.films && character.films.length > 0) {
                const filmPromises = character.films.map((filmUrl) =>
                  fetchFilm(filmUrl)
                );
                const films = await Promise.all(filmPromises);
                filmTitles = films.map((film) => film.title);
              }

              return {
                ...character,
                homeworldName,
                speciesName,
                filmTitles,
              };
            } catch (err) {
              console.error("Error enriching character:", err);
              return {
                ...character,
                homeworldName: "Unknown",
                speciesName: "Human",
                filmTitles: [],
              };
            }
          })
        );

        setAllCharacters(enrichedCharacters);
      } catch (err) {
        setError(err.message || "Failed to load all characters");
      } finally {
        setLoading(false);
      }
    };

    loadAllCharacters();
  }, []);

  return {
    allCharacters,
    loading,
    error,
  };
};
