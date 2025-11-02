import React, { useState, useMemo, useEffect } from "react";
import { useCharacters } from "../hooks/useCharacters";
import CharacterCard from "./CharacterCard";
import CharacterModal from "./CharacterModal";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";

/**
 * Character list component with search, filters, and pagination
 */
const CharacterList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    homeworld: "",
    species: "",
    film: "",
  });
  const [enrichedCharacters, setEnrichedCharacters] = useState([]);
  const [allCharactersCache, setAllCharactersCache] = useState([]);
  const [isLoadingFilterOptions, setIsLoadingFilterOptions] = useState(false);

  const { characters, loading, error, totalPages } = useCharacters(currentPage);

  // Fetch all pages for filter dropdown options (run once on mount)
  useEffect(() => {
    const fetchAllForFilters = async () => {
      setIsLoadingFilterOptions(true);
      try {
        const { fetchPeople, fetchPlanet, fetchSpecies, fetchFilm } =
          await import("../services/swapiService");

        // Fetch all pages
        const allChars = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          try {
            const data = await fetchPeople(page);
            allChars.push(...data.results);
            hasMore = data.next !== null;
            page++;
          } catch (err) {
            console.error(`Error fetching page ${page}:`, err);
            hasMore = false;
          }
        }

        // Enrich only with basic info for filters
        const enrichedForFilters = await Promise.all(
          allChars.map(async (char) => {
            let homeworldName = "Unknown";
            let speciesName = "Human";
            let filmTitles = [];

            try {
              if (char.homeworld) {
                const homeworld = await fetchPlanet(char.homeworld);
                homeworldName = homeworld.name;
              }
            } catch (err) {
              console.error("Error fetching homeworld:", err);
            }

            try {
              if (char.species && char.species.length > 0) {
                const species = await fetchSpecies(char.species[0]);
                speciesName = species.name;
              }
            } catch (err) {
              console.error("Error fetching species:", err);
            }

            try {
              if (char.films && char.films.length > 0) {
                const filmPromises = char.films.map((filmUrl) =>
                  fetchFilm(filmUrl)
                );
                const films = await Promise.all(filmPromises);
                filmTitles = films.map((film) => film.title);
              }
            } catch (err) {
              console.error("Error fetching films:", err);
            }

            return {
              ...char,
              homeworldName,
              speciesName,
              filmTitles,
            };
          })
        );

        setAllCharactersCache(enrichedForFilters);
      } catch (err) {
        console.error("Error loading filter options:", err);
      } finally {
        setIsLoadingFilterOptions(false);
      }
    };

    fetchAllForFilters();
  }, []); // Run once on mount

  // Set characters immediately, then enrich in background
  useEffect(() => {
    if (!characters || characters.length === 0) {
      setEnrichedCharacters([]);
      return;
    }

    // Set characters immediately with default enrichment data
    const initialCharacters = characters.map((char) => ({
      ...char,
      homeworldName: "Loading...",
      speciesName: "Human",
      filmTitles: [],
    }));
    setEnrichedCharacters(initialCharacters);

    // Then enrich in background
    const enrichCharacters = async () => {
      const { fetchPlanet, fetchSpecies, fetchFilm } = await import(
        "../services/swapiService"
      );

      const enriched = await Promise.all(
        characters.map(async (character) => {
          try {
            let homeworldName = "Unknown";
            let speciesName = "Human";
            let filmTitles = [];

            // Fetch homeworld
            if (character.homeworld) {
              try {
                const homeworld = await fetchPlanet(character.homeworld);
                homeworldName = homeworld.name;
              } catch (err) {
                console.error("Error fetching homeworld:", err);
              }
            }

            // Fetch species
            if (character.species && character.species.length > 0) {
              try {
                const species = await fetchSpecies(character.species[0]);
                speciesName = species.name;
              } catch (err) {
                console.error("Error fetching species:", err);
              }
            }

            // Fetch films
            if (character.films && character.films.length > 0) {
              try {
                const filmPromises = character.films.map((filmUrl) =>
                  fetchFilm(filmUrl)
                );
                const films = await Promise.all(filmPromises);
                filmTitles = films.map((film) => film.title);
              } catch (err) {
                console.error("Error fetching films:", err);
              }
            }

            return {
              ...character,
              homeworldName,
              speciesName,
              filmTitles,
            };
          } catch (err) {
            return {
              ...character,
              homeworldName: "Unknown",
              speciesName: "Human",
              filmTitles: [],
            };
          }
        })
      );

      setEnrichedCharacters(enriched);
    };

    enrichCharacters();
  }, [characters]);

  // Apply search and filters to current page only
  const filteredCharacters = useMemo(() => {
    let result = [...enrichedCharacters];

    // Apply search filter (partial match, case-insensitive)
    if (searchQuery) {
      result = result.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply homeworld filter
    if (filters.homeworld) {
      result = result.filter(
        (character) => character.homeworldName === filters.homeworld
      );
    }

    // Apply species filter
    if (filters.species) {
      result = result.filter(
        (character) => character.speciesName === filters.species
      );
    }

    // Apply film filter
    if (filters.film) {
      result = result.filter((character) =>
        character.filmTitles?.includes(filters.film)
      );
    }

    return result;
  }, [enrichedCharacters, searchQuery, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleSearchClear = () => {
    setSearchQuery("");
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      homeworld: "",
      species: "",
      film: "",
    });
  };

  const handleRetry = () => {
    setCurrentPage(1);
  };

  // Loading state
  if (loading) {
    return <Loading />;
  }

  // Error state
  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  // Empty state - no characters loaded
  if (!characters || characters.length === 0) {
    return <EmptyState />;
  }

  const hasActiveSearchOrFilters =
    searchQuery || filters.homeworld || filters.species || filters.film;

  const displayCharacters =
    filteredCharacters.length > 0 ? filteredCharacters : enrichedCharacters;

  return (
    <div className="w-full space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-md border-2 border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
          />
          <div className="w-full lg:w-96">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              allCharacters={allCharactersCache}
              isLoadingOptions={isLoadingFilterOptions}
            />
          </div>
        </div>

        {/* Results Summary */}
        {hasActiveSearchOrFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-blue-600">
                {filteredCharacters.length}
              </span>{" "}
              results on this page
              {searchQuery && (
                <span>
                  {" "}
                  matching "<span className="font-semibold">{searchQuery}</span>
                  "
                </span>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Note: Search and filters apply to the current page only
            </p>
          </div>
        )}
      </div>

      {/* No Results State */}
      {filteredCharacters.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 max-w-md text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Characters Found
            </h3>
            <p className="text-gray-600 mb-4">
              No characters match your search or filter criteria.
            </p>
            <button
              onClick={() => {
                handleSearchClear();
                handleClearFilters();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Clear Search & Filters
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Character Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayCharacters.map((character) => (
              <CharacterCard
                key={character.url}
                character={character}
                onClick={handleCharacterClick}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* Character Modal */}
      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CharacterList;
