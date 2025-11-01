# Star Wars Characters Web Application

A modern, responsive web application that displays Star Wars characters using the Star Wars API (SWAPI). Built with React, Tailwind CSS, and React Testing Library.

![Star Wars Characters App](https://img.shields.io/badge/React-19.2.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38bdf8) ![License](https://img.shields.io/badge/License-MIT-green)

## Features

### 🎯 Core Features

- **Character List**: Browse through Star Wars characters with beautiful card layouts
- **Pagination**: Navigate through multiple pages of characters
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

## Project Structure

```
src/
├── components/           # React components
│   ├── CharacterCard.js       # Individual character card
│   ├── CharacterList.js       # List of characters with pagination
│   ├── CharacterModal.js      # Detailed character modal
│   ├── EmptyState.js          # Empty state component
│   ├── ErrorMessage.js        # Error state component
│   ├── Loading.js             # Loading state component
│   ├── Pagination.js          # Pagination controls
│   └── __tests__/             # Component tests
├── hooks/               # Custom React hooks
│   ├── useCharacters.js       # Hook for fetching characters
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
```

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

**Test Coverage:**

- Component rendering tests
- User interaction tests
- Utility function tests
- Error handling tests

**Test Files:**

- `CharacterCard.test.js` - Tests for character card component
- `Loading.test.js` - Tests for loading state
- `ErrorMessage.test.js` - Tests for error handling
- `Pagination.test.js` - Tests for pagination controls
- `helpers.test.js` - Tests for utility functions

## Design Decisions

### 1. **Component Architecture**

- Small, modular, and reusable components
- Clear separation of concerns
- Custom hooks for data fetching and state management

### 2. **State Management**

- React hooks (`useState`, `useEffect`) for local state
- Custom hooks for shared logic
- No external state management library needed (keeping it simple)

### 3. **Styling Approach**

- Tailwind CSS for rapid development
- Light color palette with gradients
- Species-based color theming for visual diversity
- Mobile-first responsive design

### 4. **Error Handling**

- Graceful error states with retry functionality
- Loading states for better UX
- Empty states when no data is available

### 5. **Performance**

- Lazy loading images
- Efficient re-renders with proper React patterns
- Optimized pagination

## API Integration

The application uses the [Star Wars API (SWAPI)](https://swapi.dev/):

- **Endpoint**: `https://swapi.dev/api/people/`
- **Pagination**: 10 results per page
- **Additional Data**: Homeworld and species details fetched as needed

## Responsive Design

The application is fully responsive across devices:

- **Mobile** (< 640px): Single column layout
- **Tablet** (640px - 1024px): Two column grid
- **Desktop** (> 1024px): Three to four column grid

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential features for future development:

- Search and filter functionality
- Sort by different attributes
- Favorites/bookmark feature
- Dark mode toggle
- Character comparison feature
- Film details integration
- Vehicle and starship information

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [SWAPI](https://swapi.dev/) - The Star Wars API
- [Picsum Photos](https://picsum.photos/) - Random image generation
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React](https://react.dev/) - UI framework

---

**May the Force be with you!** 🌟
