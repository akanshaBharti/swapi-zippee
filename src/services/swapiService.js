/**
 * Service for interacting with the Star Wars API (SWAPI)
 */

const BASE_URL = "https://swapi.dev/api";

/**
 * Fetches a list of people from SWAPI
 * @param {number} page - The page number to fetch
 * @returns {Promise<Object>} - The response data containing results and pagination info
 */
export const fetchPeople = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/people/?page=${page}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching people:", error);
    throw error;
  }
};

/**
 * Fetches details about a specific planet
 * @param {string} url - The URL of the planet
 * @returns {Promise<Object>} - The planet data
 */
export const fetchPlanet = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching planet:", error);
    throw error;
  }
};

/**
 * Fetches details about a specific species
 * @param {string} url - The URL of the species
 * @returns {Promise<Object>} - The species data
 */
export const fetchSpecies = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

/**
 * Fetches details about a specific film
 * @param {string} url - The URL of the film
 * @returns {Promise<Object>} - The film data
 */
export const fetchFilm = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching film:", error);
    throw error;
  }
};
