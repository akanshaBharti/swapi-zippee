import React, { useState, useMemo } from "react";
import { useAllCharacters } from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/hooks/useAllCharacters";
import CharacterCard from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/CharacterCard";
import CharacterModal from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/CharacterModal";
import Pagination from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/Pagination";
import SearchBar from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/SearchBar";
import FilterPanel from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/FilterPanel";
import Loading from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/Loading";
import ErrorMessage from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/ErrorMessage";
import EmptyState from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/EmptyState";

const ITEMS_PER_PAGE = 10;

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

  const { allCharacters, loading, error } = useAllCharacters();

  // Apply search and filters
  const filteredCharacters = useMemo(() => {
    let result = [...allCharacters];

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
  }, [allCharacters, searchQuery, filters]);

  // Paginate filtered results
  const paginatedCharacters = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredCharacters.slice(startIndex, endIndex);
  }, [filteredCharacters, currentPage]);

  const totalPages = Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE);

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
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSearchClear = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleClearFilters = () => {
    setFilters({
      homeworld: "",
      species: "",
      film: "",
    });
    setCurrentPage(1);
  };

  const handleRetry = () => {
    window.location.reload();
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
  if (!allCharacters || allCharacters.length === 0) {
    return <EmptyState />;
  }

  const hasActiveSearchOrFilters =
    searchQuery || filters.homeworld || filters.species || filters.film;

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
              allCharacters={allCharacters}
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
              of {allCharacters.length} characters
              {searchQuery && (
                <span>
                  {" "}
                  matching "<span className="font-semibold">{searchQuery}</span>
                  "
                </span>
              )}
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
            {paginatedCharacters.map((character) => (
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
