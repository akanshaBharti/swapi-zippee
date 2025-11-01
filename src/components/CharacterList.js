import React, { useState } from "react";
import { useCharacters } from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/hooks/useCharacters";
import CharacterCard from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/CharacterCard";
import CharacterModal from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/CharacterModal";
import Pagination from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/Pagination";
import Loading from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/Loading";
import ErrorMessage from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/ErrorMessage";
import EmptyState from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/EmptyState";

/**
 * Character list component with pagination
 */
const CharacterList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { characters, loading, error, totalPages } = useCharacters(currentPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
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

  // Empty state
  if (!characters || characters.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="w-full">
      {/* Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character) => (
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
