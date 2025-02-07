import { TVehicleDetail } from "../../pages/Details";
import { supabase } from "../supabase/setupSupabase";

export default async function fetchCarById(
  id: string,
  setVehicle: (value: TVehicleDetail) => void
): Promise<void> {
  const { data, error } = await supabase
    .from("vehicles")
    .select(
      "brand(name), id,model, vehicle_type(name), gear_type, ps, color(name), seats, consumption, fuel(name), luggage, price_per_day, car_img"
    )
    .eq("id", id)
    .single();

  setVehicle(data as TVehicleDetail);

  if (error) {
    console.error("Error by fetching vehicle", error.message);
  }
}
