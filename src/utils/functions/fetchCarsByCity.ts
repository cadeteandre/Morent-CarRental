import { Vehicle } from "../../pages/Home";
import { supabase } from "../supabase/setupSupabase";

export default async function fetchCarsByCity(
  cityName: string,
  setVehicleList: React.Dispatch<React.SetStateAction<Vehicle[]>>,
  limit: number
) {
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
    .select(
      `
      vehicles(
        id,
        brand(name),
        consumption,
        gear_type,
        model,
        price_per_day,
        seats,
        vehicle_type(name),
        car_img,id
      )
    `
    )
    .eq("location_id", locationId)
    .limit(limit);

  if (vehiclesError) {
    console.error("Error by fetching vehicles:", vehiclesError);
    return;
  }

  const fetchedVehicles = vehicles?.map((item) => item.vehicles);
  setVehicleList(fetchedVehicles as Vehicle[]);
}
