# 🕌 Prayer Times & Weather App

A modern, responsive web application designed to display prayer timings and current weather conditions dynamically for all 27 Egyptian governorates.

---

## 🌟 Features

* **🕋 Precise Prayer Timings:** Displays the five daily prayer timings (Fajr, Dhuhr, Asr, Maghrib, Isha) fetched dynamically from the Aladhan API.
* **⏳ Smart Countdown Timer:** A dedicated side-panel showing a real-time (1-second ticking) countdown to the next upcoming prayer. It automatically handles wrapping around to tomorrow's Fajr prayer after Isha.
* **🌤️ Live Weather Integration:** A dedicated tab showing live local weather metrics (temperature, relative humidity, wind speed) and weather conditions, powered by the free Open-Meteo API.
* **📍 All 27 Egyptian Governorates:** A dropdown list containing all 27 Egyptian governorates preconfigured with their precise GPS coordinates for instant API calculations.
* **🎨 Glassmorphic UI/UX:** A stunning, premium user interface with semi-translucent cards, dark-red accenting, custom typography (Almarai), and interactive micro-animations (e.g., floating weather icons).
* **⏳ Smooth Skeleton Loaders:** Pulsing skeleton loaders that mirror the card layouts during data fetches, preventing abrupt layout shifts.
* **📱 Fully Responsive:** Adapts beautifully across smartphones, tablets, and desktop monitors using media queries.
* **📅 Localized Date Display:** Displays the current date in a beautiful, localized format.

---

## 🛠️ Tech Stack

* **React (React 19)** - Component-based UI rendering and state management.
* **Vite** - High-performance frontend tooling and dev server.
* **Axios** - Network request handling for fetching prayer and weather data.
* **Vanilla CSS** - Design elements, layouts (flexbox/grid), visual effects, and animations.
* **Aladhan API** - Source for updated prayer timings.
* **Open-Meteo API** - Source for coordinate-mapped local weather updates.

---

## 🚀 Installation & Local Run

### Prerequisites
Make sure you have **Node.js** installed on your local system.

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/El3gamy110/prayer-times-and-weather-app.git
   cd prayer-times-and-weather-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Local Server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to the default URL: `http://localhost:5173/`

---

## 📂 Project Directory Structure

```text
├── public/
│   ├── favicon.png          # Mosque-themed app icon
│   └── icons.svg
├── src/
│   ├── assets/
│   │   └── bg.jpg           # Premium background image
│   ├── Components/
│   │   └── prayer.jsx       # Component for rendering individual prayer timings
│   ├── App.css
│   ├── App.jsx              # Main logic, states, and app wrapper
│   ├── index.css            # Stylesheets, layouts, and responsiveness media queries
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

---

## 🔗 Repository Links

* **GitHub Repository:** [prayer-times-and-weather-app](https://github.com/El3gamy110/prayer-times-and-weather-app)
* **Developer:** [El3gamy110](https://github.com/El3gamy110)
