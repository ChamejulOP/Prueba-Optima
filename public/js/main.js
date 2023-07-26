import { fetchData } from './api.js';

const searchForm = document.getElementById("searchForm");
const resultsDiv = document.getElementById("results");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const capitalInput = document.getElementById("capitalInput").value;
  const countryInput = document.getElementById("countryInput").value;
  const continentInput = document.getElementById("continentInput").value;

  try {
    if (capitalInput) {
      // Realizar petición al API para buscar por capital
      const result = await fetchData(`capital/${capitalInput}`);

      if (!result || result.status === 404) {
        resultsDiv.innerHTML = `<h2>No se encontraron resultados para la capital "${capitalInput}".</h2>`;
        return;
      }

      // Obtener el nombre del país y el continente donde se encuentra
      const name = result[0].name;
      const continent = result[0].region === "Americas" ? "América" : result[0].region;

      // Obtener la imagen de la bandera
      const flagImage = result[0].flags ? result[0].flags.svg : "https://via.placeholder.com/150";

      // Actualizar la interfaz con el resultado
      resultsDiv.innerHTML = `
        <h2>Resultado:</h2>
        <p><strong>Nombre del país:</strong> ${name}</p>
        <p><strong>Continente donde se encuentra:</strong> ${continent}</p>
        <p><strong>Bandera:</strong></p>
        <img src="${flagImage}" alt="Bandera de ${name}">
      `;
    } else if (countryInput) {
      // Realizar petición al API para buscar por país
      const result = await fetchData(`name/${countryInput}`);

      if (!result || result.status === 404) {
        resultsDiv.innerHTML = `<h2>No se encontraron resultados para el país "${countryInput}".</h2>`;
        return;
      }

      // Obtener el nombre del país y el continente donde se encuentra
      const name = result[0].name;
      const continent = result[0].region === "Americas" ? "América" : result[0].region;

      // Obtener la imagen de la bandera en formato SVG, si está disponible
      const flagImage = result[0].flags ? result[0].flags.svg : "https://via.placeholder.com/150"; // En caso de que no haya imagen de bandera, se utiliza una imagen de marcador de posición

      // Actualizar la interfaz con el resultado
      resultsDiv.innerHTML = `
        <h2>Resultado:</h2>
        <p><strong>Nombre del país:</strong> ${name}</p>
        <p><strong>Continente donde se encuentra:</strong> ${continent}</p>
        <p><strong>Bandera:</strong></p>
        <img src="${flagImage}" alt="Bandera de ${name}">
      `;
    } else if (continentInput) {
      // Realizar petición al API para buscar por continente
      const result = await fetchData(`continent/${continentInput}`);

      if (!result || result.status === 404) {
        resultsDiv.innerHTML = `<h2>No se encontraron resultados para el continente "${continentInput}".</h2>`;
        return;
      }

      // Obtener los nombres de los países y sus banderas
      const countriesAndFlags = result.map(country => ({
        name: country.name,
        flag: country.flags ? country.flags.svg : "https://via.placeholder.com/150"
      }));

      // Actualizar la interfaz con el resultado
      resultsDiv.innerHTML = `
        <h2>Resultado:</h2>
        <div class="countries-list">
          ${countriesAndFlags.map(country => `
            <div class="country-item">
              <p>${country.name}</p>
              <img src="${country.flag}" alt="Bandera de ${country.name}" width="200" height="200">
            </div>
          `).join('')}
        </div>
      `;
    } else {
      resultsDiv.innerHTML = `<h2>Por favor, ingrese una capital, un país o un continente válido.</h2>`;
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    resultsDiv.innerHTML = `<h2>Error al obtener los datos. Por favor, inténtalo nuevamente.</h2>`;
  }
});