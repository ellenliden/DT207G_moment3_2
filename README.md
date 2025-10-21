# Moment 2.2 – Fristående frontend (Fetch API)

En HTML/CSS/JS-frontend som konsumerar min webbtjänst från moment 2_1.

- index.html – Lista poster (GET) med radering (DELETE)
- add.html – Formulär för att skapa post (POST)
- about.html – Syfte, teknik och databas

## API-konfiguration

Denna frontend är kopplad till min publicerade backend:

```js
const API_CONFIG = {
  baseUrl: "https://dt207g-moment2-1-ph2b.onrender.com",
  itemsPath: "/api/users",
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

- GET: listar alla poster (visar companyname + jobtitle)
- POST: lägger till ny post via formulär
- DELETE: raderar vald post
- PUT: stöd för denna finns i koden (valfri "funktion")
- JSON-svar och felhantering i klienten
- CORS: backend tillåter cross-origin-förfrågningar

## Formulärfält (mappning till backend)

Frontend-formuläret skickar följande fält till `POST /api/users`:

- companyname (text, required)
- jobtitle (text, required)
- location (text, required)
- startdate (date, required)
- enddate (date, optional)
- description (text, required)

## Publicering

- Backend (moment 2.1): https://dt207g-moment2-1-ph2b.onrender.com
- Frontend (moment 2.2): publicerat via Netlify: https://dt207g-moment2-2.netlify.app/ & GitHub: https://github.com/ellenliden/DT207G_moment2_2.git

## Slutsatser

- CORS krävs när frontend och backend ligger på olika domäner.
- Tydlig felhantering och informativa användarmeddelanden är viktigt (t.ex. vid statuskoder 201, 400, 404 och 500).
- Fetch API gör det möjligt att skicka förfrågningar med rätt headers, hantera JSON och tolka svar utifrån content-type.

## Kontakt

Ellen Lidén

elli1807@student.miun.se
