import { useEffect, useState } from "react";
import AdCard from "../components/AdCard";
import { Tables } from "../utils/supabase/supabase";
import { supabase } from "../utils/supabase/setupSupabase";
import AutoCard from "../components/autoCard";

type Vehicle = Tables<"vehicles">;

const Home = () => {
    const [fetchedVehicle, setFetchedVehicle] = useState<Vehicle[]>([]);

    useEffect(() => {
        async function fetchVehicles() {
            const { data, error } = await supabase.from("vehicles").select();
            if (error) {
                console.error("Fehler beim Fetchen der Vehicles: ", error);
            } else {
                setFetchedVehicle(data);
            }
        }

        fetchVehicles();
    }, []);

    console.log(fetchedVehicle);

    return (
        <>
            <div>Home</div>
            <section className="p-4">
                <AdCard adTitle={`The Best Platform for Car Rental`} adText="Ease of doing a car rental safely and reliably. Of course at a low price." adBackgroundImg="/images/ad-card-bg1.png" adButtonColor="bg-blue-600" adCarImg="/images/ad-car1.png" />
                <AdCard adTitle="Easy way to rent a car at a low price" adText="Providing cheap car rental services and safe and comfortable facilities." adBackgroundImg="/images/ad-card-bg2.png" adButtonColor="bg-blue-400" adCarImg="/images/ad-car2.png" />
            </section>
            <section>
                {fetchedVehicle.map((vehicle, i) => (
                    <AutoCard key={i} brand={vehicle.brand} consumption={vehicle.consumption} gear_type={vehicle.gear_type} model={vehicle.model} price_per_day={vehicle.price_per_day} seats={vehicle.seats} vehicle_type={vehicle.vehicle_type} car_img={vehicle.car_img} />
                ))}
            </section>
        </>
    );
};

export default Home;
