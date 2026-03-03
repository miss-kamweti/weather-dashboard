# 🌤️ Weather Dashboard

A clean, responsive weather dashboard built with **React**, **Vite**, and **Tailwind CSS**. Get real-time weather information for any location at a glance.

---

## ✨ Features

- 🔍 Search weather by city name
- 🌡️ Current temperature, humidity, and wind speed
- 🕐 Real-time weather data from a live API
- 📱 Fully responsive design — works on mobile, tablet, and desktop
- ⚡ Fast and lightweight thanks to Vite

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [OpenWeatherMap API](https://openweathermap.org/api) | Weather data |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/miss-kamweti/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example env file and add your API key:

   ```bash
   cp .env.example .env
   ```

   Then open `.env` and fill in your API key:

   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

   > 🔑 You can get a free API key from [OpenWeatherMap](https://openweathermap.org/api).

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build for Production

```bash
npm run build
```

The optimized output will be in the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```
weather-dashboard/
├── public/             # Static assets
├── src/                # Source files
│   ├── components/     # React components
│   ├── App.jsx         # Root component
│   └── main.jsx        # Entry point
├── .env.example        # Environment variable template
├── index.html          # HTML entry point
├── tailwind.config.js  # Tailwind CSS config
├── vite.config.js      # Vite config
└── package.json        # Project metadata & scripts
```

---

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `VITE_WEATHER_API_KEY` | Your weather API key (e.g. from OpenWeatherMap) |

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

<p align="center">Made with ☕ by <a href="https://github.com/miss-kamweti">miss-kamweti</a></p>
