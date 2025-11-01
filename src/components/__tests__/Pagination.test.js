import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/Pagination";

describe("Pagination", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Previous and Next buttons", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("disables Previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();
  });

  test("disables Next button on last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  test("calls onPageChange with next page when Next is clicked", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test("calls onPageChange with previous page when Previous is clicked", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  test("highlights current page", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const currentPageButton = screen.getByLabelText("Page 2");
    expect(currentPageButton).toHaveClass("bg-blue-500");
  });

  test("calls onPageChange with specific page number when page button is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const pageThreeButton = screen.getByLabelText("Page 3");
    fireEvent.click(pageThreeButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });
});
