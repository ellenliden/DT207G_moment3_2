/* eslint-disable no-undef */
// Stänger av ESLint-varningar för globala variabler som API och API_CONFIG
// som definieras i andra filer (api.js och config.js)

/**
 * Modul för att hantera formulär för nya poster
 * Hanterar validering, skickande och statusmeddelanden
 */
(function () {
  // Hämta DOM-element
  const form = document.getElementById("addForm");
  const statusEl = document.getElementById("formStatus");

  /**
   * Uppdaterar statusmeddelande för användaren
   * @param {string} message - meddelande att visa
   * @param {boolean} isError - om meddelandet är ett felmeddelande
   */
  function setStatus(message, isError = false) {
    statusEl.textContent = message;
    statusEl.classList.toggle("error", isError);
  }

  // Hantera formulärskickning
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); //detta förhindrar standardformulärskickning så att ja kan hantera skickningen själva

    // Hämta formulärdata (anpassat för din backend)
    const formData = new FormData(form);
    const payload = {
      companyname: formData.get("companyname"),
      jobtitle: formData.get("jobtitle"),
      location: formData.get("location"),
      startdate: formData.get("startdate"),
      enddate: formData.get("enddate") || null,
      description: formData.get("description"),
    };

    try {
      setStatus("Sparar...");
      await API.createItem(payload);
      setStatus("Sparat!");
      form.reset(); // rensa formuläret efter lyckad sparning så att användaren kan skicka in en ny post
    } catch (err) {
      setStatus(`Fel: ${err.message}`, true);
    }
  });
})();
