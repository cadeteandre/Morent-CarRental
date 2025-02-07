import { supabase } from "../supabase/setupSupabase";

export default async function fetchTotalVehiclesInCity(cityName: string, setTotalVehicles: React.Dispatch<React.SetStateAction<number>>) {
    const { data: locationData, error: locationError } = await supabase
    .from("locations")
    .select("id")
    .eq("name", cityName)
    .single();

  if (locationError) {
    console.error("Error by fetching city:", locationError);
    return;
  }

  const locationId = locationData.id;

  const { data: vehicles, error: vehiclesError } = await supabase
    .from("vehicle_location")
    .select('*')
    .eq("location_id", locationId)

    if (vehiclesError) {
      console.error("Error by fetching vehicles:", vehiclesError);
      return;
    }

    console.log(vehicles);
    setTotalVehicles(vehicles.length);
  }