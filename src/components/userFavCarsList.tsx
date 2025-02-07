import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase/setupSupabase";
import AutoCard from "./autoCard";

export interface IVehicle {
  id: string;
  brand: { name: string };
  model: string;
  vehicle_type: { name: string };
  consumption: number;
  gear_type: "Automatic" | "Manuel";
  seats: number;
  price_per_day: number | null;
  car_img: string | null;
}

const UserFavCarsList: React.FC = () => {
  const [favoriteVehicles, setFavoriteVehicles] = useState<IVehicle[]>([]);
  const [loading, setLoading] = useState(true);

  console.log(favoriteVehicles);

  useEffect(() => {
    const fetchFavoriteVehicles = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError);
        setLoading(false);
        return;
      }
      if (!user) {
        console.error("User not logged in");
        setLoading(false);
        return;
      }

      const { data: favorites, error: favError } = await supabase
        .from("favorites")
        .select("vehicle_id")
        .eq("profile_id", user.id);

      if (favError) {
        console.error("Error fetching favorites:", favError);
        setLoading(false);
        return;
      }

      const favoritesIds = favorites.map((fav) => fav.vehicle_id);

      const { data: favoriteVehicles, error: vehiclesError } = await supabase
        .from("vehicles")
        .select(
          "brand(name), consumption, gear_type, model, price_per_day, seats, vehicle_type(name), car_img, id "
        )
        .in("id", favoritesIds);
      console.log(favoriteVehicles);

      if (vehiclesError) {
        console.error("Error fetching vehicles:", vehiclesError);
        setLoading(false);
        return;
      }

      setFavoriteVehicles(favoriteVehicles);
      setLoading(false);
    };

    fetchFavoriteVehicles();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="favorite-cars-list">
      {favoriteVehicles.length === 0 ? (
        <p>No favorite vehicles found.</p>
      ) : (
        favoriteVehicles.map((vehicle) => (
          <div key={vehicle.id} className="flex items-center">
            <AutoCard
              brand={vehicle.brand.name}
              model={vehicle.model}
              vehicle_type={vehicle.vehicle_type.name}
              consumption={vehicle.consumption}
              gear_type={vehicle.gear_type}
              seats={vehicle.seats}
              price_per_day={vehicle.price_per_day}
              car_img={vehicle.car_img}
              vehicle_id={vehicle.id}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default UserFavCarsList;
