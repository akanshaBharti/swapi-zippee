import React from "react";
import { useSpecies } from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/hooks/useSpecies";
import {
  getRandomImage,
  getSpeciesColor,
  extractIdFromUrl,
} from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/utils/helpers";

/**
 * Character card component
 * @param {Object} props - Component props
 * @param {Object} props.character - Character data
 * @param {Function} props.onClick - Click handler to open modal
 */
const CharacterCard = ({ character, onClick }) => {
  const { species } = useSpecies(character.species);
  const speciesColors = getSpeciesColor(species?.name);
  const characterId = extractIdFromUrl(character.url);
  const imageUrl = getRandomImage(characterId);

  return (
    <div
      onClick={() => onClick(character)}
      className={`${speciesColors.bg} ${speciesColors.border} border-2 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden h-48">
        <img
          src={imageUrl}
          alt={character.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className={`absolute top-0 right-0 ${speciesColors.accent} px-3 py-1 m-2 rounded-full`}
        >
          <span className="text-white text-xs font-semibold">
            {species?.name || "Human"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className={`text-xl font-bold ${speciesColors.text} mb-2 truncate`}>
          {character.name}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4"
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
            <span>{character.films?.length || 0} films</span>
          </div>

          <button
            className={`${speciesColors.text} font-medium hover:underline flex items-center space-x-1`}
          >
            <span>View Details</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
