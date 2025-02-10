import { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase/setupSupabase";
import { mainContext } from "../context/MainProvider";
import { User } from "@supabase/supabase-js";
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
  const { user, refreshFavList } = useContext(mainContext) as {
    user: User | null;
    refreshFavList: boolean;
  };

  useEffect(() => {
    const fetchFavoriteVehicles = async () => {
      if (user) {
        const { data: favorites, error } = await supabase
          .from("favorites")
          .select("vehicle_id")
          .eq("profile_id", user.id);

        if (error) {
          console.error("Error fetching favorites:", error);
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

        if (vehiclesError) {
          console.error("Error fetching vehicles:", vehiclesError);
          setLoading(false);
          return;
        }

        setFavoriteVehicles(favoriteVehicles);
        setLoading(false);
      }
    };

    fetchFavoriteVehicles();
  }, [user, refreshFavList]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="flex flex-wrap flex-col md:flex-row gap-8">
      {favoriteVehicles.length === 0 ? (
        <p>No favorite vehicles found.</p>
      ) : (
        favoriteVehicles.map((vehicle) => (
          <AutoCard
            key={vehicle.id}
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
        ))
      )}
    </section>
  );
};

export default UserFavCarsList;
