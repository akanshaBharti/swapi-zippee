# Star Wars Characters Web Application

A modern, responsive web application that displays Star Wars characters using the Star Wars API (SWAPI). Built with React, Tailwind CSS, and React Testing Library.

![Star Wars Characters App](https://img.shields.io/badge/React-19.2.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38bdf8) ![License](https://img.shields.io/badge/License-MIT-green)

## Features

### 🎯 Core Features

- **Character List**: Browse through Star Wars characters with beautiful card layouts
- **Search**: Real-time search by character name with partial matching (case-insensitive)
- **Advanced Filters**: Filter characters by:
  - Homeworld (planet)
  - Species
  - Film appearances
- **Combined Search & Filters**: Use search and filters together for precise results
- **Pagination**: Navigate through multiple pages of characters (10 per page)
- **Character Details**: Click on any character to view detailed information in a modal
- **Species-Based Theming**: Each character card has distinct colors based on their species
- **Random Images**: Each character displays a unique random image from Picsum Photos
- **Responsive Design**: Seamlessly works on mobile, tablet, and desktop devices

### 📊 Character Information

The application displays the following information for each character:

**In Card View:**

- Character name
- Species
- Number of film appearances
- Species-themed colors

**In Detailed Modal View:**

- Name (header)
- Height (in meters)
- Mass (in kg)
- Date added (formatted as dd-MM-yyyy)
- Number of films
- Birth year
- Species
- **Homeworld Details:**
  - Planet name
  - Terrain
  - Climate
  - Population

### 🎨 UI/UX Features

- **Smart Search Bar**: Clear button, search indicator, and real-time results
- **Collapsible Filter Panel**: Clean interface with active filter badges
- **Results Summary**: Shows filtered count and active search terms
- **No Results State**: Helpful message with clear action button
- **Loading States**: Elegant loading spinner while fetching data
- **Error Handling**: User-friendly error messages with retry functionality
- **Empty States**: Informative messages when no data is available
- **Smooth Animations**: Hover effects, transitions, and modal animations
- **Keyboard Navigation**: Press ESC to close modals
- **Accessibility**: ARIA labels and semantic HTML

## Technology Stack

- **React 19.2.0** - UI framework with functional components and hooks
- **Tailwind CSS 3.4.18** - Utility-first CSS framework for styling
- **React Testing Library 16.3.0** - Testing framework
- **SWAPI** - Star Wars API for character data
- **Picsum Photos** - Random image generation

<!-- ## Project Structure

```
src/
├── components/           # React components
│   ├── CharacterCard.js       # Individual character card
│   ├── CharacterList.js       # List with search, filters & pagination
│   ├── CharacterModal.js      # Detailed character modal
│   ├── SearchBar.js           # Search input component
│   ├── FilterPanel.js         # Filter dropdown component
│   ├── EmptyState.js          # Empty state component
│   ├── ErrorMessage.js        # Error state component
│   ├── Loading.js             # Loading state component
│   ├── Pagination.js          # Pagination controls
│   └── __tests__/             # Component tests
├── hooks/               # Custom React hooks
│   ├── useCharacters.js       # Hook for paginated characters
│   ├── useAllCharacters.js    # Hook for all characters (filtering)
│   ├── useHomeworld.js        # Hook for fetching homeworld data
│   └── useSpecies.js          # Hook for fetching species data
├── services/            # API services
│   └── swapiService.js        # SWAPI API integration
├── utils/               # Utility functions
│   ├── helpers.js             # Helper functions (formatting, colors, etc.)
│   └── __tests__/             # Utility tests
├── App.js               # Main application component
├── App.css              # Application styles
├── index.js             # Entry point
└── index.css            # Global styles
``` -->

## Installation

1. **Clone the repository** (or navigate to the project directory):

```bash
cd swapi-zippee
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the development server**:

```bash
npm start
```

The application will open in your browser at [http://localhost:3000](http://localhost:3000).

## Available Scripts

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. The build is optimized for best performance.

## Testing

The application includes comprehensive tests using React Testing Library:

```bash
npm test
```

## License

This project is open source and available under the MIT License.


---

**May the Force be with you!** 🌟
