import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorMessage from "../ErrorMessage";

describe("ErrorMessage", () => {
  const mockErrorMessage = "Failed to load characters";
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders error message", () => {
    render(<ErrorMessage message={mockErrorMessage} onRetry={mockOnRetry} />);
    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
  });

  test("renders error title", () => {
    render(<ErrorMessage message={mockErrorMessage} onRetry={mockOnRetry} />);
    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
  });

  test("renders retry button when onRetry is provided", () => {
    render(<ErrorMessage message={mockErrorMessage} onRetry={mockOnRetry} />);
    expect(screen.getByText("Try Again")).toBeInTheDocument();
  });

  test("does not render retry button when onRetry is not provided", () => {
    render(<ErrorMessage message={mockErrorMessage} />);
    expect(screen.queryByText("Try Again")).not.toBeInTheDocument();
  });

  test("calls onRetry when retry button is clicked", () => {
    render(<ErrorMessage message={mockErrorMessage} onRetry={mockOnRetry} />);
    const retryButton = screen.getByText("Try Again");
    fireEvent.click(retryButton);
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  test("renders error icon", () => {
    const { container } = render(
      <ErrorMessage message={mockErrorMessage} onRetry={mockOnRetry} />
    );
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});
