import { supabase } from "../supabase/setupSupabase";

export const checkIfFavorited = async (vehicleId: string): Promise<boolean> => {
    const { data, error } = await supabase.from("favorites").select("*").eq("vehicle_id", vehicleId);

    if (error) {
        console.error("Error checking favorite:", error);
    }
    if (data) {
        if (data.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    return data !== null;
};

export const addFavorite = async (vehicleId: string, profileId: string) => {
    const { error } = await supabase.from("favorites").insert({ vehicle_id: vehicleId, profile_id: profileId });

    if (error) {
        console.error("Error adding favorite:", error);
    }
    return error;
};

export const removeFavorite = async (vehicleId: string, profileId: string) => {
    const { error } = await supabase.from("favorites").delete().eq("vehicle_id", vehicleId).eq("profile_id", profileId);
    if (error) {
        console.error("Error removing favorite:", error);
    }
    return error;
};
