# 🧩 Pokémon Explorer

**Pokémon Explorer** is a responsive and interactive React web application that displays a collection of Pokémon cards. Users can search for Pokémon by name and (optionally) filter them by type. The app fetches data in real-time from the [PokéAPI](https://pokeapi.co/) and presents detailed information in a clean, card-based UI.

---
## Live Link
[![Live Demo - Netlify](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=netlify)](https://poke-mon-explorer.netlify.app/)

## 🚀 Features

- 🎴 **Pokémon Cards**  
  Browse through a grid of Pokémon cards showing names, images, types, and stats.

- 🔍 **Search Functionality**  
  Instantly filter Pokémon by typing into the search bar — real-time updates without additional API calls.

- 🧪 **Filter by Type** *(optional)*  
  Add dropdown or button-based filtering to show only Pokémon of a selected type (e.g., Fire, Water).

- ⏱ **Optimized Data Fetching**  
  Uses `axios` and `Promise.all` to efficiently retrieve detailed data for all Pokémon.

- ⚡ **Smooth User Experience**  
  Includes loading states and responsive design for seamless interaction.

---

## 🛠 Tech Stack

| Technology   | Use                        |
|--------------|-----------------------------|
| React        | UI components and logic     |
| Axios        | HTTP requests to PokéAPI    |
| PokéAPI      | Data source for all Pokémon |
| useState, useEffect | React hooks for state/effects |
| (Optional) Tailwind / CSS | Styling and layout         |

---

## 🧑‍💻 Getting Started

### 1. Clone the repository
```bash
[git clone https://github.com/akramsarfraj/Pokemon-Explorer.git
cd pokemon-explorer
```
### 2. Install dependencies
```bash
npm install
```
### 3.Start the development server
```bash
npm start
```
The app will be available at http://localhost:3000.

### Project Image
![pokemon](https://github.com/user-attachments/assets/f0e8f9f5-332f-4fe2-b89d-75792b8a0a19)

