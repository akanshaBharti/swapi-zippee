/**
 * Utility functions for the application
 */

/**
 * Formats a date string to dd-MM-yyyy format
 * @param {string} dateString - The date string to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch (error) {
    return "N/A";
  }
};

/**
 * Generates a random image URL from Picsum Photos
 * @param {number} id - The character ID for consistent image selection
 * @returns {string} - The image URL
 */
export const getRandomImage = (id) => {
  const seed = id || Math.floor(Math.random() * 1000);
  return `https://picsum.photos/seed/${seed}/400/300`;
};

/**
 * Returns a color based on species name
 * @param {string} speciesName - The name of the species
 * @returns {Object} - Object containing background and accent colors
 */
export const getSpeciesColor = (speciesName = "Human") => {
  const colorMap = {
    Human: {
      bg: "bg-blue-50",
      accent: "bg-blue-400",
      border: "border-blue-200",
      text: "text-blue-700",
    },
    Droid: {
      bg: "bg-gray-50",
      accent: "bg-gray-400",
      border: "border-gray-200",
      text: "text-gray-700",
    },
    Wookiee: {
      bg: "bg-amber-50",
      accent: "bg-amber-400",
      border: "border-amber-200",
      text: "text-amber-700",
    },
    Rodian: {
      bg: "bg-green-50",
      accent: "bg-green-400",
      border: "border-green-200",
      text: "text-green-700",
    },
    Hutt: {
      bg: "bg-yellow-50",
      accent: "bg-yellow-400",
      border: "border-yellow-200",
      text: "text-yellow-700",
    },
    "Yoda's species": {
      bg: "bg-emerald-50",
      accent: "bg-emerald-400",
      border: "border-emerald-200",
      text: "text-emerald-700",
    },
    Trandoshan: {
      bg: "bg-lime-50",
      accent: "bg-lime-400",
      border: "border-lime-200",
      text: "text-lime-700",
    },
    "Mon Calamari": {
      bg: "bg-cyan-50",
      accent: "bg-cyan-400",
      border: "border-cyan-200",
      text: "text-cyan-700",
    },
    Ewok: {
      bg: "bg-orange-50",
      accent: "bg-orange-400",
      border: "border-orange-200",
      text: "text-orange-700",
    },
    Sullustan: {
      bg: "bg-rose-50",
      accent: "bg-rose-400",
      border: "border-rose-200",
      text: "text-rose-700",
    },
    Neimodian: {
      bg: "bg-purple-50",
      accent: "bg-purple-400",
      border: "border-purple-200",
      text: "text-purple-700",
    },
    Gungan: {
      bg: "bg-teal-50",
      accent: "bg-teal-400",
      border: "border-teal-200",
      text: "text-teal-700",
    },
    Toydarian: {
      bg: "bg-indigo-50",
      accent: "bg-indigo-400",
      border: "border-indigo-200",
      text: "text-indigo-700",
    },
    Dug: {
      bg: "bg-pink-50",
      accent: "bg-pink-400",
      border: "border-pink-200",
      text: "text-pink-700",
    },
    "Twi'lek": {
      bg: "bg-violet-50",
      accent: "bg-violet-400",
      border: "border-violet-200",
      text: "text-violet-700",
    },
    Aleena: {
      bg: "bg-fuchsia-50",
      accent: "bg-fuchsia-400",
      border: "border-fuchsia-200",
      text: "text-fuchsia-700",
    },
    Vulptereen: {
      bg: "bg-red-50",
      accent: "bg-red-400",
      border: "border-red-200",
      text: "text-red-700",
    },
    Xexto: {
      bg: "bg-sky-50",
      accent: "bg-sky-400",
      border: "border-sky-200",
      text: "text-sky-700",
    },
    Toong: {
      bg: "bg-slate-50",
      accent: "bg-slate-400",
      border: "border-slate-200",
      text: "text-slate-700",
    },
    Cerean: {
      bg: "bg-stone-50",
      accent: "bg-stone-400",
      border: "border-stone-200",
      text: "text-stone-700",
    },
    Nautolan: {
      bg: "bg-zinc-50",
      accent: "bg-zinc-400",
      border: "border-zinc-200",
      text: "text-zinc-700",
    },
  };

  return colorMap[speciesName] || colorMap["Human"];
};

/**
 * Extracts the ID from a SWAPI URL
 * @param {string} url - The SWAPI URL
 * @returns {number} - The extracted ID
 */
export const extractIdFromUrl = (url) => {
  if (!url) return null;
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? parseInt(matches[1], 10) : null;
};

/**
 * Formats population number with commas
 * @param {string|number} population - The population value
 * @returns {string} - Formatted population string
 */
export const formatPopulation = (population) => {
  if (!population || population === "unknown") return "Unknown";

  const num = parseInt(population, 10);
  if (isNaN(num)) return "Unknown";

  return num.toLocaleString();
};
