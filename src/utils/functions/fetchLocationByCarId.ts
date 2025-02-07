import { supabase } from "../supabase/setupSupabase";

export default async function fetchLocationByCarId(id: string, setLocation: (value: string) => void): Promise<void> {
    const { data, error } = await supabase
    .from('vehicle_location')
    .select('*, location_id(name)')
    .eq('vehicle_id', id)
    .single()

    if(data?.location_id.name) setLocation(data.location_id.name);

    if(error) {
        console.error('Error by fetching location', error.message);
    }
}