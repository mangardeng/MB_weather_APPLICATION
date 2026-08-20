// utils/weatherApi.js
//
// All network calls in one place. Open-Meteo is free and keyless, so there's
// no API key to store or hardcode anywhere in this project.
//
// Two endpoints:
//   1. Geocoding  - turns a city name the user types into lat/lon
//   2. Forecast   - turns lat/lon into current conditions + a daily forecast

const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

// WMO weather codes -> human label + emoji icon.
// Open-Meteo returns a numeric weather_code; this table is the single place
// that knows what each number means.
export const WEATHER_CODES = {
  0: { label: "Clear sky", icon: "☀️" },
  1: { label: "Mainly clear", icon: "🌤️" },
  2: { label: "Partly cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Fog", icon: "🌫️" },
  48: { label: "Depositing rime fog", icon: "🌫️" },
  51: { label: "Light drizzle", icon: "🌦️" },
  53: { label: "Drizzle", icon: "🌦️" },
  55: { label: "Dense drizzle", icon: "🌧️" },
  61: { label: "Slight rain", icon: "🌧️" },
  63: { label: "Rain", icon: "🌧️" },
  65: { label: "Heavy rain", icon: "🌧️" },
  71: { label: "Slight snow", icon: "🌨️" },
  73: { label: "Snow", icon: "🌨️" },
  75: { label: "Heavy snow", icon: "❄️" },
  80: { label: "Rain showers", icon: "🌦️" },
  81: { label: "Rain showers", icon: "🌦️" },
  82: { label: "Violent showers", icon: "⛈️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
  96: { label: "Thunderstorm + hail", icon: "⛈️" },
  99: { label: "Thunderstorm + hail", icon: "⛈️" },
};

export function describeWeatherCode(code) {
  return WEATHER_CODES[code] || { label: "Unknown", icon: "🌡️" };
}

/**
 * Look up a city name and return the best-matching location.
 * Throws if the city can't be found or the request fails.
 */
export async function geocodeCity(cityName) {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(
    cityName
  )}&count=1&language=en&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Geocoding request failed (${response.status})`);
  }

  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`No location found for "${cityName}"`);
  }

  const place = data.results[0];
  return {
    name: place.name,
    admin1: place.admin1,
    country: place.country,
    lat: place.latitude,
    lon: place.longitude,
    timezone: place.timezone,
  };
}

/**
 * Fetch current conditions + a 5-day daily forecast for a lat/lon pair.
 */
export async function fetchWeather(lat, lon) {
  const url =
    `${FORECAST_URL}?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
    `&forecast_days=5&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Forecast request failed (${response.status})`);
  }

  const data = await response.json();

  return {
    current: {
      tempC: data.current.temperature_2m,
      feelsLikeC: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      weatherCode: data.current.weather_code,
      windSpeedKmh: data.current.wind_speed_10m,
      windDirDeg: data.current.wind_direction_10m,
      time: data.current.time,
    },
    daily: data.daily.time.map((date, i) => ({
      date,
      weatherCode: data.daily.weather_code[i],
      maxC: data.daily.temperature_2m_max[i],
      minC: data.daily.temperature_2m_min[i],
    })),
  };
}
