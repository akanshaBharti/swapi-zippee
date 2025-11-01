import {
  formatDate,
  getRandomImage,
  getSpeciesColor,
  extractIdFromUrl,
  formatPopulation,
} from "/Volumes/Macintosh C/Web Development/Zippee Assignment/swapi-zippee/src/utils/helpers";

describe("helpers", () => {
  describe("formatDate", () => {
    test("formats date correctly to dd-MM-yyyy", () => {
      const result = formatDate("2014-12-09T13:50:51.644000Z");
      expect(result).toBe("09-12-2014");
    });

    test("returns N/A for null date", () => {
      expect(formatDate(null)).toBe("N/A");
    });

    test("returns N/A for undefined date", () => {
      expect(formatDate(undefined)).toBe("N/A");
    });

    test("returns N/A for empty string", () => {
      expect(formatDate("")).toBe("N/A");
    });
  });

  describe("getRandomImage", () => {
    test("returns correct image URL with id", () => {
      const result = getRandomImage(5);
      expect(result).toBe("https://picsum.photos/seed/5/400/300");
    });

    test("returns image URL when id is null", () => {
      const result = getRandomImage(null);
      expect(result).toContain("https://picsum.photos/seed/");
      expect(result).toContain("/400/300");
    });
  });

  describe("getSpeciesColor", () => {
    test("returns correct colors for Human", () => {
      const result = getSpeciesColor("Human");
      expect(result).toEqual({
        bg: "bg-blue-50",
        accent: "bg-blue-400",
        border: "border-blue-200",
        text: "text-blue-700",
      });
    });

    test("returns correct colors for Droid", () => {
      const result = getSpeciesColor("Droid");
      expect(result).toEqual({
        bg: "bg-gray-50",
        accent: "bg-gray-400",
        border: "border-gray-200",
        text: "text-gray-700",
      });
    });

    test("returns Human colors for unknown species", () => {
      const result = getSpeciesColor("UnknownSpecies");
      expect(result).toEqual({
        bg: "bg-blue-50",
        accent: "bg-blue-400",
        border: "border-blue-200",
        text: "text-blue-700",
      });
    });

    test("returns Human colors when no species provided", () => {
      const result = getSpeciesColor();
      expect(result).toEqual({
        bg: "bg-blue-50",
        accent: "bg-blue-400",
        border: "border-blue-200",
        text: "text-blue-700",
      });
    });
  });

  describe("extractIdFromUrl", () => {
    test("extracts ID from SWAPI URL", () => {
      const result = extractIdFromUrl("https://swapi.dev/api/people/1/");
      expect(result).toBe(1);
    });

    test("extracts ID from different resource URL", () => {
      const result = extractIdFromUrl("https://swapi.dev/api/planets/42/");
      expect(result).toBe(42);
    });

    test("returns null for invalid URL", () => {
      const result = extractIdFromUrl("invalid-url");
      expect(result).toBeNull();
    });

    test("returns null for null input", () => {
      const result = extractIdFromUrl(null);
      expect(result).toBeNull();
    });
  });

  describe("formatPopulation", () => {
    test("formats population with commas", () => {
      const result = formatPopulation("1000000");
      expect(result).toBe("1,000,000");
    });

    test("returns Unknown for unknown population", () => {
      const result = formatPopulation("unknown");
      expect(result).toBe("Unknown");
    });

    test("returns Unknown for null population", () => {
      const result = formatPopulation(null);
      expect(result).toBe("Unknown");
    });

    test("formats numeric input", () => {
      const result = formatPopulation(5000000);
      expect(result).toBe("5,000,000");
    });

    test("returns Unknown for invalid population", () => {
      const result = formatPopulation("abc");
      expect(result).toBe("Unknown");
    });
  });
});
