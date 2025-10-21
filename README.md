# Moment 3 Steg 2 – Fristående frontend (Fetch API)

En HTML/CSS/JS-frontend som konsumerar min webbtjänst från moment 3 steg 1.

- index.html – Lista arbetserfarenheter (GET) med radering (DELETE)
- add.html – Formulär för att skapa arbetserfarenhet (POST)
- about.html – Syfte, teknik och databas

## API-konfiguration

Denna frontend är kopplad till min publicerade moment3, steg 1 backend:

```js
const API_CONFIG = {
  baseUrl: "https://dt207g-moment3-rf1t.onrender.com",
  itemsPath: "/api/experiences",
};
```

## Kom igång

1. Kopiera config-mall om den saknas:

```
cp assets/js/config.example.js assets/js/config.js
```

2. Sätt API_CONFIG (se ovan) i assets/js/config.js.

3. Kör en statisk server (rekommenderas pga CORS):

```
npx serve . -l 5173
```

Öppna: http://localhost:5173

## Funktionalitet (krav)

- GET: listar alla arbetserfarenheter (visar company + title)
- POST: lägger till ny arbetserfarenhet via formulär
- DELETE: raderar vald arbetserfarenhet
- PUT: stöd för denna finns i koden (valfri "funktion")
- JSON-svar och felhantering i klienten
- CORS: backend tillåter cross-origin-förfrågningar

## Formulärfält (mappning till backend)

Frontend-formuläret skickar följande fält till `POST /api/experiences`:

- company (text, required)
- title (text, required)
- location (text, optional)
- startDate (date, required)
- endDate (date, optional)
- description (text, required, max 2000 tecken)

## Publicering

- Backend (moment 3 steg 1): https://dt207g-moment3-rf1t.onrender.com
- Frontend (moment 3 steg 2): https://dt207g-moment3-2.onrender.com

## Slutsatser

- CORS krävs när frontend och backend ligger på olika domäner.
- Tydlig felhantering och informativa användarmeddelanden är viktigt (t.ex. vid statuskoder 201, 400, 404 och 500).
- Fetch API gör det möjligt att skicka förfrågningar med rätt headers, hantera JSON och tolka svar utifrån content-type.
- MongoDB ObjectId hantering kräver specifik validering i backend.
- Datumvalidering med ISO8601-format säkerställer korrekt dataöverföring.

## Kontakt

Ellen Lidén

elli1807@student.miun.se
