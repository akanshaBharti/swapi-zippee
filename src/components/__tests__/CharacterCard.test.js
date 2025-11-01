import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock the hooks and utilities
jest.mock(
  "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/hooks/useSpecies"
);

jest.mock(
  "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/utils/helpers",
  () => {
    const actual = jest.requireActual(
      "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/utils/helpers"
    );
    return {
      ...actual,
      getRandomImage: jest.fn(
        (id) => `https://picsum.photos/seed/${id}/400/300`
      ),
      extractIdFromUrl: jest.fn((url) => 1),
    };
  }
);

import CharacterCard from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/CharacterCard";
import { useSpecies } from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/hooks/useSpecies";

describe("CharacterCard", () => {
  const mockCharacter = {
    name: "Luke Skywalker",
    url: "https://swapi.dev/api/people/1/",
    films: ["film1", "film2", "film3"],
    species: [],
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useSpecies.mockReturnValue({
      species: { name: "Human" },
      loading: false,
    });
  });

  test("renders character name", () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  test("displays number of films", () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);
    expect(screen.getByText("3 films")).toBeInTheDocument();
  });

  test("displays species name", () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);
    expect(screen.getByText("Human")).toBeInTheDocument();
  });

  test("calls onClick when card is clicked", () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);
    const card = screen
      .getByText("Luke Skywalker")
      .closest("div").parentElement;
    fireEvent.click(card);
    expect(mockOnClick).toHaveBeenCalledWith(mockCharacter);
  });

  test("displays View Details button", () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);
    expect(screen.getByText("View Details")).toBeInTheDocument();
  });

  test("renders character image with correct alt text", () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);
    const image = screen.getByAltText("Luke Skywalker");
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe("IMG");
  });
});
