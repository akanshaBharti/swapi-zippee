import React, { useState } from "react";

/**
 * FilterPanel component for filtering characters by homeworld, film, or species
 * @param {Object} props - Component props
 * @param {Object} props.filters - Current filter values
 * @param {Function} props.onFilterChange - Filter change handler
 * @param {Function} props.onClearFilters - Clear all filters handler
 * @param {Array} props.allCharacters - All characters for extracting unique values
 * @param {boolean} props.isLoadingOptions - Whether filter options are still loading
 */
const FilterPanel = ({
  filters,
  onFilterChange,
  onClearFilters,
  allCharacters,
  isLoadingOptions = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Extract unique homeworlds, films, and species from all characters
  const getUniqueHomeworlds = () => {
    const homeworlds = new Set();
    allCharacters.forEach((char) => {
      if (char.homeworldName) {
        homeworlds.add(char.homeworldName);
      }
    });
    return Array.from(homeworlds).sort();
  };

  const getUniqueSpecies = () => {
    const species = new Set();
    allCharacters.forEach((char) => {
      if (char.speciesName) {
        species.add(char.speciesName);
      }
    });
    return Array.from(species).sort();
  };

  const getUniqueFilms = () => {
    const films = new Set();
    allCharacters.forEach((char) => {
      if (char.filmTitles && char.filmTitles.length > 0) {
        char.filmTitles.forEach((film) => films.add(film));
      }
    });
    return Array.from(films).sort();
  };

  const hasActiveFilters = filters.homeworld || filters.species || filters.film;
  const activeFilterCount = [
    filters.homeworld,
    filters.species,
    filters.film,
  ].filter(Boolean).length;

  return (
    <div className="w-full relative">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all"
      >
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="font-semibold text-gray-700">Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-bold text-white bg-blue-500 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Filter Options - Absolute positioned dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white border-2 border-gray-200 rounded-lg shadow-lg space-y-4 z-10">
          {/* Homeworld Filter */}
          <div>
            <label
              htmlFor="homeworld-filter"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Homeworld
            </label>
            <select
              id="homeworld-filter"
              value={filters.homeworld}
              onChange={(e) => onFilterChange("homeworld", e.target.value)}
              disabled={isLoadingOptions}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {isLoadingOptions ? "Loading homeworlds..." : "All Homeworlds"}
              </option>
              {!isLoadingOptions &&
                getUniqueHomeworlds().map((homeworld) => (
                  <option key={homeworld} value={homeworld}>
                    {homeworld}
                  </option>
                ))}
            </select>
          </div>

          {/* Species Filter */}
          <div>
            <label
              htmlFor="species-filter"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Species
            </label>
            <select
              id="species-filter"
              value={filters.species}
              onChange={(e) => onFilterChange("species", e.target.value)}
              disabled={isLoadingOptions}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {isLoadingOptions ? "Loading species..." : "All Species"}
              </option>
              {!isLoadingOptions &&
                getUniqueSpecies().map((species) => (
                  <option key={species} value={species}>
                    {species}
                  </option>
                ))}
            </select>
          </div>

          {/* Film Filter */}
          <div>
            <label
              htmlFor="film-filter"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Film
            </label>
            <select
              id="film-filter"
              value={filters.film}
              onChange={(e) => onFilterChange("film", e.target.value)}
              disabled={isLoadingOptions}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {isLoadingOptions ? "Loading films..." : "All Films"}
              </option>
              {!isLoadingOptions &&
                getUniqueFilms().map((film) => (
                  <option key={film} value={film}>
                    {film}
                  </option>
                ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="w-full px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
