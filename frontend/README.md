# Nexfolio - Personal Digital Dashboard

Nexfolio is a comprehensive, responsive digital dashboard designed to manage your personal portfolio, projects, diary entries, tasks, and media gallery.

## Project Structure

The project is divided into two main directories:

- **`frontend/`**: The Next.js application containing the user interface.
- **`backend/`**: A placeholder for future backend services (currently empty).

### Frontend Structure (`frontend/`)

- **`app/`**: Contains the App Router pages and layouts.
  - `page.tsx`: The main dashboard view.
  - `layout.tsx`: The root layout including the Sidebar.
  - `globals.css`: Global styles and Tailwind CSS configuration.
  - `(routes)`: Other pages like `/gallery`, `/projects`, etc.
- **`components/`**: Reusable UI components.
  - `ui/`: Core UI components (buttons, cards, inputs) built with Radix UI and Tailwind.
  - `sidebar.tsx`: The collapsible sidebar navigation.
  - `theme-provider.tsx`: Context provider for Dark/Light mode.
- **`lib/`**: Utility functions (e.g., `utils.ts` for class merging).

## Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Component Library**: Shadcn/ui (Radix UI + Tailwind)
- **Icons**: Lucide React
- **Theming**: `next-themes` (Dark/Light mode support)

## Getting Started

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Features

- **Responsive Sidebar**: Collapses on mobile with a hamburger menu.
- **Masonry Gallery**: Pinterest-style layout for the Gallery page.
- **Dark Mode**: Fully supported dark theme with a toggle in the sidebar.
- **Teal Theme**: Custom Teal color scheme.
