# GPX Viewer

[![CI](https://github.com/CheeseWolt/GPX-viewer/actions/workflows/ci.yml/badge.svg)](https://github.com/CheeseWolt/GPX-viewer/actions/workflows/ci.yml)

A modern, dark-mode web application to visualize GPX tracks from your running or cycling activities. Built with Next.js, React-Leaflet, and Mapbox.

![GPX Viewer Dashboard](https://github.com/CheeseWolt/GPX-viewer/raw/main/screenshot.png)
*(Note: Add a screenshot named `screenshot.png` to the root of your repo or update this link)*

## Features

- 🗺️ **Interactive Map**: Visualize your route on a dark-themed Mapbox map.
- 📊 **Detailed Statistics**: View key metrics like distance, total time, average pace, and heart rate.
- 🎨 **Modern Design**: Glassmorphism and Neon aesthetics for a premium look.
- 📱 **Responsive Layout**: 
  - **Desktop**: Split view with Map (60%) and Stats (40%).
  - **Mobile**: Vertical stack for optimal readability.
- 📂 **File Upload**: Easily import your own `.gpx` files (supports Samsung Health & Garmin extensions).
- ⚡ **Fast & Reactive**: Built with Next.js and optimized for performance.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Monorepo Tool**: [Nx](https://nx.dev/)
- **Styling**: [Bulma CSS](https://bulma.io/) + Custom CSS (Glassmorphism/Neon)
- **Maps**: [React-Leaflet](https://react-leaflet.js.org/) + [Mapbox](https://www.mapbox.com/)
- **GPX Parsing**: Custom parser based on `@mapbox/togeojson`

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- NPM or Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CheeseWolt/GPX-viewer.git
   cd GPX-viewer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up Environment Variables:
   Create a `.env.local` file in `apps/gpx-viewer/` and add your Mapbox token:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_access_token_here
   ```

4. Run the development server:
   ```bash
   npx nx dev gpx-viewer
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

The project is organized as an Nx monorepo:

- `apps/gpx-viewer`: The main Next.js application.
  - `src/app`: App Router pages and layouts.
  - `src/app/components`: Reusable UI components (Map, StatsPanel).
  - `src/app/utils`: Helper functions (GPX parsing).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
