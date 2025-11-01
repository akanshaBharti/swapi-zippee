import React, { useEffect } from "react";
import { useHomeworld } from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/hooks/useHomeworld";
import { useSpecies } from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/hooks/useSpecies";
import {
  formatDate,
  getRandomImage,
  extractIdFromUrl,
  formatPopulation,
} from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/utils/helpers";

/**
 * Character modal component showing detailed information
 * @param {Object} props - Component props
 * @param {Object} props.character - Character data
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Close handler
 */
const CharacterModal = ({ character, isOpen, onClose }) => {
  const { homeworld, loading: homeworldLoading } = useHomeworld(
    character?.homeworld
  );
  const { species } = useSpecies(character?.species);
  const characterId = extractIdFromUrl(character?.url);
  const imageUrl = getRandomImage(characterId);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !character) return null;

  const convertHeight = (heightInCm) => {
    if (!heightInCm || heightInCm === "unknown") return "Unknown";
    const heightInMeters = (parseFloat(heightInCm) / 100).toFixed(2);
    return `${heightInMeters} m`;
  };

  const convertMass = (mass) => {
    if (!mass || mass === "unknown") return "Unknown";
    return `${mass} kg`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Header with Image */}
          <div className="relative h-64 md:h-80 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
            <img
              src={imageUrl}
              alt={character.name}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <h2 className="absolute bottom-6 left-6 text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              {character.name}
            </h2>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <InfoCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                }
                label="Height"
                value={convertHeight(character.height)}
              />

              <InfoCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                }
                label="Mass"
                value={convertMass(character.mass)}
              />

              <InfoCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
                label="Date Added"
                value={formatDate(character.created)}
              />

              <InfoCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                }
                label="Films"
                value={`${character.films?.length || 0} appearances`}
              />

              <InfoCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                label="Birth Year"
                value={character.birth_year || "Unknown"}
              />

              <InfoCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                }
                label="Species"
                value={species?.name || "Human"}
              />
            </div>

            {/* Homeworld Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-7 h-7 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Homeworld
              </h3>

              {homeworldLoading ? (
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="w-5 h-5 border-2 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
                  <span>Loading homeworld data...</span>
                </div>
              ) : homeworld ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <HomeworldDetail label="Name" value={homeworld.name} />
                  <HomeworldDetail label="Terrain" value={homeworld.terrain} />
                  <HomeworldDetail label="Climate" value={homeworld.climate} />
                  <HomeworldDetail
                    label="Population"
                    value={formatPopulation(homeworld.population)}
                  />
                </div>
              ) : (
                <p className="text-gray-600">
                  Unable to load homeworld information
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Info card component for displaying character details
 */
const InfoCard = ({ icon, label, value }) => (
  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center space-x-3">
      <div className="text-blue-500">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

/**
 * Homeworld detail component
 */
const HomeworldDetail = ({ label, value }) => (
  <div>
    <span className="text-sm font-medium text-gray-600">{label}: </span>
    <span className="text-base font-semibold text-gray-800 capitalize">
      {value}
    </span>
  </div>
);

export default CharacterModal;
