import { useEffect, useState } from "react";
import AdCard from "../components/AdCard";
import { supabase } from "../utils/supabase/setupSupabase";
import AutoCard from "../components/autoCard";

type Vehicle = {
    brand: { name: string };
    consumption: number;
    gear_type: "Automatic" | "Manuel";
    model: string;
    price_per_day: number | null;
    seats: number;
    vehicle_type: { name: string };
    car_img: string | null;
};

const Home = () => {
    const [fetchedVehicle, setFetchedVehicle] = useState<Vehicle[]>([]);
    const [fetchLimit, setFetchLimit] = useState<number>(8);
    const [tableRows, setTableRows] = useState<number>(0);

    async function fetchVehicles(limit: number) {
        const { data, error } = await supabase.from("vehicles").select("brand(name), consumption, gear_type, model, price_per_day, seats, vehicle_type(name), car_img ").limit(limit);
        if (error) {
            console.error("Fehler beim Fetchen der Vehicles: ", error);
        } else {
            setFetchedVehicle(data);
        }
    }

    async function getTableRows() {
        const { count, error } = await supabase.from("vehicles").select("*", { count: "exact", head: true });
        if (error) {
            console.error("Fehler beim abfragen der Zeilen der Tabelle 'vehicles': ", error);
        } else if (!count) {
            setTableRows(0);
        } else {
            setTableRows(count);
        }
    }

    function loadMore() {
        setFetchLimit((prev) => {
            if (prev < tableRows) {
                const newLimit = prev + 8;
                return newLimit;
            } else {
                return prev;
            }
        });
    }

    useEffect(() => {
        fetchVehicles(fetchLimit);
    }, [fetchLimit]);

    useEffect(() => {
        getTableRows();
    }, []);

    return (
        <>
            <section className="p-4">
                <AdCard adTitle={`The Best Platform for Car Rental`} adText="Ease of doing a car rental safely and reliably. Of course at a low price." adBackgroundImg="/images/ad-card-bg1.png" adButtonColor="bg-blue-600" adCarImg="/images/ad-car1.png" />
                <AdCard adTitle="Easy way to rent a car at a low price" adText="Providing cheap car rental services and safe and comfortable facilities." adBackgroundImg="/images/ad-card-bg2.png" adButtonColor="bg-blue-400" adCarImg="/images/ad-car2.png" />
            </section>
            <section>
                {fetchedVehicle.map((vehicle, i) => (
                    <AutoCard key={i} brand={vehicle.brand.name} consumption={vehicle.consumption} gear_type={vehicle.gear_type} model={vehicle.model} price_per_day={vehicle.price_per_day} seats={vehicle.seats} vehicle_type={vehicle.vehicle_type.name} car_img={vehicle.car_img} />
                ))}
            </section>
            <section>
                <button className="btn btn-primary  text-xs font-Jakarta-SemiBold" onClick={loadMore}>
                    Load More
                </button>
                <p>{`${fetchedVehicle.length} of ${tableRows} cars shown.`}</p>
            </section>
        </>
    );
};

export default Home;