# Weather App — Group 2

A 3-screen React Native app: search a city, see current conditions, drill
into humidity/wind/forecast. Built with Expo + React Navigation, calling the
free, keyless [Open-Meteo](https://open-meteo.com) API — no API key needed
anywhere in the project.

## Screens

| Screen  | File                       | Assigned to | What it does |
|---------|----------------------------|-------------|---------------|
| Home / Search | `screens/HomeScreen.js`     | Member A | Text input + search button, navigates to Results |
| Results | `screens/ResultsScreen.js` | Member A | Fetches weather on mount; shows loading / error / success states |
| Details | `screens/DetailsScreen.js` | Member B | Humidity, wind, 5-day forecast — reached from Results |

All network calls live in `utils/weatherApi.js` (geocoding + forecast), so
neither screen talks to `fetch` directly for anything other than calling
those two helper functions.

## Run it

```bash
npm install
npx expo start
```

Then scan the QR code with **Expo Go** (iOS/Android), or press `w` to run it
in a browser, `i` for iOS simulator, `a` for Android emulator.

## Key concepts this demonstrates (per the brief)

- `fetch` / `async-await` against a free, keyless weather API
- Loading, success, and error states, handled with conditional rendering
- Passing data between screens via navigation params (`route.params`)
- Basic stack navigation across three screens (`@react-navigation/native-stack`)
- `FlatList` for the 5-day forecast list in Details

## GitHub workflow reminder

- One repo, group lead adds collaborators
- Feature branches, not direct commits to `main`
- PR + at least one teammate review before merging
- `main` should run the full app, all screens integrated, by presentation day
