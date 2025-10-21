/* eslint-disable no-undef */
// Stänger av ESLint-varningar för globala variabler som API och API_CONFIG
// som definieras i andra filer (api.js och config.js)

/**
 * API-modul för kommunikation med backend
 * Hanterar alla HTTP-anrop (GET, POST, DELETE, PUT)
 */
(function () {
  // kontrollerar om konfiguration finns
  const missingConfig = typeof API_CONFIG === "undefined";
  if (missingConfig) {
    console.warn(
      "API_CONFIG saknas. Skapa 'assets/js/config.js' baserat på 'config.example.js'."
    );
  }

  // Hämtar API-konfiguration
  const baseUrl = missingConfig ? "" : API_CONFIG.baseUrl.replace(/\/$/, "");
  const itemsPath = missingConfig ? "/items" : API_CONFIG.itemsPath;

  /**
   * funktion för HTTP-anrop för att göra anrop till API:et så att vi kan använda den i andra filer
   * @param {string} path - API-sökväg
   * @param {Object} options - Fetch-alternativ
   * @returns {Promise} - API-svar
   */
  async function request(path, options = {}) {
    const url = baseUrl + path;
    const defaultHeaders = { "Content-Type": "application/json" };

    // Gör HTTP-anrop
    const response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...(options.headers || {}) },
    });

    // kontrollera om svaret är JSON
    const isJson = (response.headers.get("content-type") || "").includes(
      "application/json"
    );

    // "parsar" svar baserat på content-type
    const data = isJson
      ? await response.json().catch(() => null)
      : await response.text();

    //Hantera fel
    if (!response.ok) {
      const message = data && data.message ? data.message : response.statusText;
      throw new Error(`${response.status} ${message}`);
    }

    return data;
  }

  /**
   * hämtar alla poster från API
   * @returns {Promise<Array>} - Array med poster
   */
  async function getAll() {
    return request(itemsPath, { method: "GET" });
  }

  /**
   * Skapar en ny post
   * @param {Object} payload - Post-data att skicka
   * @returns {Promise} - Skapad post
   */
  async function createItem(payload) {
    return request(itemsPath, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  /**
   * Raderar en post baserat på ID
   * @param {string|number} id - Postens ID
   * @returns {Promise} - Bekräftelse på radering
   */
  async function deleteItem(id) {
    if (id === undefined || id === null)
      throw new Error("Saknar id för DELETE");
    return request(`${itemsPath}/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  }

  /**
   * Uppdaterar en befintlig post
   * @param {string|number} id - Postens ID
   * @param {Object} payload - Uppdaterad postdata
   * @returns {Promise} - Uppdaterad post
   */
  async function updateItem(id, payload) {
    if (id === undefined || id === null) throw new Error("Saknar id för PUT");
    return request(`${itemsPath}/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  // visa API-funktioner globalt så att de kan användas i andra filer
  window.API = { getAll, createItem, deleteItem, updateItem };
})();
