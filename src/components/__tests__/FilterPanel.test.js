import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterPanel from "../FilterPanel";

describe("FilterPanel", () => {
  const mockOnFilterChange = jest.fn();
  const mockOnClearFilters = jest.fn();

  const mockCharacters = [
    {
      name: "Luke Skywalker",
      homeworldName: "Tatooine",
      speciesName: "Human",
      filmTitles: ["A New Hope", "The Empire Strikes Back"],
    },
    {
      name: "C-3PO",
      homeworldName: "Tatooine",
      speciesName: "Droid",
      filmTitles: ["A New Hope"],
    },
    {
      name: "Leia Organa",
      homeworldName: "Alderaan",
      speciesName: "Human",
      filmTitles: ["A New Hope", "The Empire Strikes Back"],
    },
  ];

  const defaultFilters = {
    homeworld: "",
    species: "",
    film: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders filter toggle button", () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
        allCharacters={mockCharacters}
      />
    );
    expect(screen.getByText(/filters/i)).toBeInTheDocument();
  });

  test("shows filter panel when toggle button is clicked", () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
        allCharacters={mockCharacters}
      />
    );
    const toggleButton = screen.getByText(/filters/i);
    fireEvent.click(toggleButton);
    expect(screen.getByLabelText(/homeworld/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/species/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/film/i)).toBeInTheDocument();
  });

  test("displays active filter count badge", () => {
    const activeFilters = {
      homeworld: "Tatooine",
      species: "Human",
      film: "",
    };
    render(
      <FilterPanel
        filters={activeFilters}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
        allCharacters={mockCharacters}
      />
    );
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("calls onFilterChange when homeworld filter changes", () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
        allCharacters={mockCharacters}
      />
    );
    const toggleButton = screen.getByText(/filters/i);
    fireEvent.click(toggleButton);

    const homeworldSelect = screen.getByLabelText(/homeworld/i);
    fireEvent.change(homeworldSelect, { target: { value: "Tatooine" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith("homeworld", "Tatooine");
  });

  test("calls onFilterChange when species filter changes", () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
        allCharacters={mockCharacters}
      />
    );
    const toggleButton = screen.getByText(/filters/i);
    fireEvent.click(toggleButton);

    const speciesSelect = screen.getByLabelText(/species/i);
    fireEvent.change(speciesSelect, { target: { value: "Droid" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith("species", "Droid");
  });

  test("calls onFilterChange when film filter changes", () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
        allCharacters={mockCharacters}
      />
    );
    const toggleButton = screen.getByText(/filters/i);
    fireEvent.click(toggleButton);

    const filmSelect = screen.getByLabelText(/film/i);
    fireEvent.change(filmSelect, { target: { value: "A New Hope" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith("film", "A New Hope");
  });

  test("shows clear filters button when filters are active", () => {
    const activeFilters = {
      homeworld: "Tatooine",
      species: "",
      film: "",
    };
    render(
      <FilterPanel
        filters={activeFilters}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
        allCharacters={mockCharacters}
      />
    );
    const toggleButton = screen.getByText(/filters/i);
    fireEvent.click(toggleButton);

    expect(screen.getByText(/clear all filters/i)).toBeInTheDocument();
  });

  test("calls onClearFilters when clear button is clicked", () => {
    const activeFilters = {
      homeworld: "Tatooine",
      species: "",
      film: "",
    };
    render(
      <FilterPanel
        filters={activeFilters}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
        allCharacters={mockCharacters}
      />
    );
    const toggleButton = screen.getByText(/filters/i);
    fireEvent.click(toggleButton);

    const clearButton = screen.getByText(/clear all filters/i);
    fireEvent.click(clearButton);
    expect(mockOnClearFilters).toHaveBeenCalledTimes(1);
  });

  test("does not show clear button when no filters are active", () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
        allCharacters={mockCharacters}
      />
    );
    const toggleButton = screen.getByText(/filters/i);
    fireEvent.click(toggleButton);

    expect(screen.queryByText(/clear all filters/i)).not.toBeInTheDocument();
  });
});
