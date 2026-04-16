// Usamos Open-Meteo: API Real de clima para San Salvador
const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=13.71&longitude=-89.20&current_weather=true&hourly=relative_humidity_2m";

export const getSensorData = async () => {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();

    // Extraemos los datos reales del JSON que devuelve la API
    return {
      temperatura: json.current_weather.temperature, 
      humedad: json.hourly.relative_humidity_2m[0],
      ubicacion: "UDB",
      dispositivo: "Dispositivo principal",
      estado: "Online",
      ultimaSincro: new Date().toLocaleTimeString()
    };
  } catch (error) {
    console.error("Error al conectar con la API:", error);
    return null;
  }
};