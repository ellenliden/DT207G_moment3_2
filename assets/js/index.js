/* eslint-disable no-undef */
// Stänger av ESLint-varningar för globala variabler som API och API_CONFIG
// som definieras i andra filer (api.js och config.js)

/**
 * Huvudmodul för listan med poster
 * Hanterar visning, radering och uppdatering av poster
 */
(function () {
  // Hämta DOM-element
  const listEl = document.getElementById("itemsList");
  const emptyEl = document.getElementById("emptyState");
  const template = document.getElementById("itemTemplate");
  const refreshBtn = document.getElementById("refreshBtn");

  /**
   * Renderar lista med poster
   * @param {Array} items - array med poster att visa
   */
  function renderItems(items) {
    //Rensa befintlig lista
    listEl.innerHTML = "";

    // Visa tomt om inga poster finns så att användaren vet att det inte finns några poster
    if (!items || items.length === 0) {
      emptyEl.hidden = false;
      return;
    }

    //dölj tomt tillstånd och rendera poster så att användaren kan se listan
    emptyEl.hidden = true;

    for (const item of items) {
      //klona template för varje post
      const clone = template.content.cloneNode(true);
      const title = clone.querySelector(".item__title");
      const meta = clone.querySelector(".item__meta");
      const delBtn = clone.querySelector(".item__delete");

      // Hämta ID från olika möjliga fält (flexibel för olika API:er)
      const id =
        item.id || item._id || item.uuid || item.courseId || item.slug || "";

      // sätt företag, jobbtitel och id
      const jobTitle = item.title ? ` - ${item.title}` : "";
      title.textContent =
        (item.company || item.title || item.name || `Post ${id}`) + jobTitle;
      meta.textContent = id ? `id: ${id}` : "";

      // Lägg till raderingsfunktion så att användaren kan radera en post
      delBtn.addEventListener("click", async () => {
        if (!id) return alert("Kan inte radera post utan id");
        if (!confirm("Är du säker på att du vill radera posten?")) return;
        try {
          await API.deleteItem(id);
          await loadItems(); //uppdatera listan efter radering
        } catch (err) {
          alert(`Fel vid radering: ${err.message}`);
        }
      });

      // Lägg till posten i listan
      listEl.appendChild(clone);
    }
  }

  /**
   * Laddar poster från API och renderar dem
   */
  async function loadItems() {
    try {
      const items = await API.getAll();
      renderItems(items);
    } catch (err) {
      // Visa felmeddelande om API-anropet misslyckas
      emptyEl.hidden = false;
      emptyEl.textContent = `Kunde inte ladda poster: ${err.message}`;
    }
  }

  // Event listeners
  refreshBtn.addEventListener("click", loadItems);
  document.addEventListener("DOMContentLoaded", loadItems);
})();
