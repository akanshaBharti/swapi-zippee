import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the CharacterList component since it makes API calls
jest.mock(
  "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/components/CharacterList",
  () => {
    return function MockCharacterList() {
      return <div data-testid="character-list">Character List</div>;
    };
  }
);

test("renders Star Wars Characters header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Star Wars Characters/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders Powered by SWAPI badge", () => {
  render(<App />);
  const badge = screen.getByText(/Powered by SWAPI/i);
  expect(badge).toBeInTheDocument();
});

test("renders footer with SWAPI link", () => {
  render(<App />);
  const footer = screen.getByText(/May the Force be with you!/i);
  expect(footer).toBeInTheDocument();
});
