const BASE_URL = "https://restcountries.com/v2";

// Función para hacer una petición al API
export async function fetchData(query) {
  try {
    const response = await fetch(`${BASE_URL}/${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}