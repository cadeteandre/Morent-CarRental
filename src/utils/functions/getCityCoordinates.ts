export default async function getCityCoordinates(cityName: string) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`
    );
    const data = await response.json();
  
    if (data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    } else {
      throw new Error("City not found");
    }
  };