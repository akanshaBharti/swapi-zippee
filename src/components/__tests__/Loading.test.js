import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "../Loading";

describe("Loading", () => {
  test("renders loading message", () => {
    render(<Loading />);
    expect(screen.getByText("Loading characters...")).toBeInTheDocument();
  });

  test("renders loading spinner", () => {
    const { container } = render(<Loading />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  test("has correct structure", () => {
    const { container } = render(<Loading />);
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-center"
    );
  });
});
