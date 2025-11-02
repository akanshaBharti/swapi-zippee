import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/SearchBar";

describe("SearchBar", () => {
  const mockOnChange = jest.fn();
  const mockOnClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input", () => {
    render(
      <SearchBar value="" onChange={mockOnChange} onClear={mockOnClear} />
    );
    const input = screen.getByPlaceholderText(/search characters by name/i);
    expect(input).toBeInTheDocument();
  });

  test("displays current search value", () => {
    render(
      <SearchBar value="Luke" onChange={mockOnChange} onClear={mockOnClear} />
    );
    const input = screen.getByPlaceholderText(/search characters by name/i);
    expect(input).toHaveValue("Luke");
  });

  test("calls onChange when typing", () => {
    render(
      <SearchBar value="" onChange={mockOnChange} onClear={mockOnClear} />
    );
    const input = screen.getByPlaceholderText(/search characters by name/i);
    fireEvent.change(input, { target: { value: "Skywalker" } });
    expect(mockOnChange).toHaveBeenCalledWith("Skywalker");
  });

  test("shows clear button when value is not empty", () => {
    render(
      <SearchBar value="Luke" onChange={mockOnChange} onClear={mockOnClear} />
    );
    const clearButton = screen.getByLabelText(/clear search/i);
    expect(clearButton).toBeInTheDocument();
  });

  test("does not show clear button when value is empty", () => {
    render(
      <SearchBar value="" onChange={mockOnChange} onClear={mockOnClear} />
    );
    const clearButton = screen.queryByLabelText(/clear search/i);
    expect(clearButton).not.toBeInTheDocument();
  });

  test("calls onClear when clear button is clicked", () => {
    render(
      <SearchBar value="Luke" onChange={mockOnChange} onClear={mockOnClear} />
    );
    const clearButton = screen.getByLabelText(/clear search/i);
    fireEvent.click(clearButton);
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  test("displays search query indicator when value exists", () => {
    render(
      <SearchBar value="Darth" onChange={mockOnChange} onClear={mockOnClear} />
    );
    expect(screen.getByText(/searching for:/i)).toBeInTheDocument();
    expect(screen.getByText(/"Darth"/i)).toBeInTheDocument();
  });

  test("renders search input with proper aria label", () => {
    render(
      <SearchBar value="" onChange={mockOnChange} onClear={mockOnClear} />
    );
    const input = screen.getByLabelText(/search characters/i);
    expect(input).toBeInTheDocument();
  });
});
