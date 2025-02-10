import { useEffect, useRef, useState } from "react";
import AdCard from "../components/AdCard";
import { supabase } from "../utils/supabase/setupSupabase";
import AutoCard from "../components/autoCard";
import PickUpDropOff from "../components/PickUpDropOff";
import NavBarSide from "../components/NavBarSide";

export type Vehicle = {
    id: string;
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
    const [fetchedVehicle, setFetchedVehicle] = useState<Vehicle[] | null>([]);
    const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[] | null>([]);
    const [fetchLimit, setFetchLimit] = useState<number>(8);
    const [tableRows, setTableRows] = useState<number>(0);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [checkboxStatesTypes, setCheckboxStatesTypes] = useState<{ [key: string]: boolean }>({});
    const [checkboxStatesSeats, setCheckboxStatesSeats] = useState<{ [key: string]: boolean }>({});
    const [maxPrice, setMaxPrice] = useState<number>();

    const pickupLocationRef = useRef<HTMLInputElement>(null);
    const pickupDateRef = useRef<HTMLInputElement>(null);
    const pickupTimeRef = useRef<HTMLInputElement>(null);

    const dropoffLocationRef = useRef<HTMLInputElement>(null);
    const dropoffDateRef = useRef<HTMLInputElement>(null);
    const dropoffTimeRef = useRef<HTMLInputElement>(null);

    async function fetchVehicles(type: "initial" | "search" | "filter", limit: number) {
        if (type === "initial") {
            const { data, error } = await supabase.from("vehicles").select("id, brand(name), consumption, gear_type, model, price_per_day, seats, vehicle_type(name), car_img ").lte("price_per_day", maxPrice).limit(limit);
            if (error) {
                console.error("Fehler beim Fetchen der Vehicles: ", error);
            } else {
                setFetchedVehicle(data);
                setFilteredVehicles([]);
            }
        }

        if (type === "search") {
            const pickupLocation = pickupLocationRef.current?.value as string;
            const pickupDate = pickupDateRef.current?.value as string;

            // const dropoffLocation = dropoffLocationRef.current?.value as string;
            const dropoffDate = dropoffDateRef.current?.value as string;

            const { data } = await supabase.rpc("get_available_vehicles", { city: pickupLocation, start_date: pickupDate, end_date: dropoffDate });

            setFetchedVehicle(data as Vehicle[]);

            if (data) {
                setTableRows(data?.length);
            }
        }

        if (type === "filter") {
            if (fetchedVehicle) {
                const selectedTypes = Object.keys(checkboxStatesTypes).filter((key) => checkboxStatesTypes[key]);
                const selectedSeats = Object.keys(checkboxStatesSeats).filter((key) => checkboxStatesSeats[key]);
                const { data } = await supabase.rpc("get_filtered_vehicles", { selectedtypes: selectedTypes, seatcount: selectedSeats, maxprice: maxPrice });
                setFilteredVehicles(data as Vehicle[]);
                setFetchedVehicle([]);
            }
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

    function handleSwitch() {
        const pickupLocation = pickupLocationRef.current?.value;
        const pickupDate = pickupDateRef.current?.value;
        const pickupTime = pickupTimeRef.current?.value;

        const dropoffLocation = dropoffLocationRef.current?.value;
        const dropoffDate = dropoffDateRef.current?.value;
        const dropoffTime = dropoffTimeRef.current?.value;

        pickupLocationRef.current!.value = dropoffLocation as string;
        pickupDateRef.current!.value = dropoffDate as string;
        pickupTimeRef.current!.value = dropoffTime as string;

        dropoffLocationRef.current!.value = pickupLocation as string;
        dropoffDateRef.current!.value = pickupDate as string;
        dropoffTimeRef.current!.value = pickupTime as string;
    }

    useEffect(() => {
        getTableRows();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if ((Object.keys(checkboxStatesTypes).length === 0 && Object.keys(checkboxStatesSeats).length === 0) || (Object.values(checkboxStatesTypes).every((value) => value === false) && Object.values(checkboxStatesSeats).every((value) => value === false))) {
                fetchVehicles("initial", fetchLimit);
            } else {
                setFetchLimit(1000);
                fetchVehicles("filter", fetchLimit);
            }
        }, 1000);

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [checkboxStatesTypes, checkboxStatesSeats, fetchLimit, maxPrice]);

    function toggleFilter() {
        setShowFilter((prev) => !prev);
    }

    console.log(filteredVehicles);
    console.log(fetchedVehicle);

    return (
        <section className="p-4 flex flex-col gap-6 items-center">
            <section className="flex flex-col sm:flex-row justify-center gap-6 lg:gap-24 w-full">
                <AdCard adTitle={`The Best Platform for Car Rental`} adText="Ease of doing a car rental safely and reliably. Of course at a low price." adBackgroundImg="/images/ad-card-bg1.png" adButtonColor="bg-blue-600" adCarImg="/images/ad-car1.png" />
                <AdCard adTitle="Easy way to rent a car at a low price" adText="Providing cheap car rental services and safe and comfortable facilities." adBackgroundImg="/images/ad-card-bg2.png" adButtonColor="bg-blue-400" adCarImg="/images/ad-car2.png" />
            </section>
            <section>
                <h2>Find your car for today!</h2>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <PickUpDropOff componentTitle="Pickup" listId="pickup" locationRef={pickupLocationRef} dateRef={pickupDateRef} timeRef={pickupTimeRef} />
                    <button className="btn bg-blue-600 text-white h-fit p-4 cursor-pointer rounded-sm hover:bg-blue-800" onClick={handleSwitch}>
                        <img src="./svg/austauschen.svg" alt="Change Locations Icon" className="w-7 h-7" />
                    </button>
                    <PickUpDropOff componentTitle="Drop-Off" listId="dropoff" locationRef={dropoffLocationRef} dateRef={dropoffDateRef} timeRef={dropoffTimeRef} />
                </div>
                <button className="btn bg-blue-600 text-white h-fit p-4 cursor-pointer rounded-sm hover:bg-blue-800" onClick={() => fetchVehicles("search", fetchLimit)}>
                    Search Car
                </button>
            </section>
            <section>
                <button className="btn bg-blue-600 text-white h-fit p-4 cursor-pointer rounded-sm hover:bg-blue-800" onClick={toggleFilter}>
                    Filter
                </button>
                <div className="flex flex-col">
                    <div>{showFilter && <NavBarSide setCheckboxStatesTypes={setCheckboxStatesTypes} setCheckboxStatesSeats={setCheckboxStatesSeats} setMaxPrice={setMaxPrice} />}</div>
                    {filteredVehicles?.length > 0 && <div>{filteredVehicles ? filteredVehicles.map((vehicle, i) => <AutoCard key={i} brand={vehicle.brand.name} consumption={vehicle.consumption} gear_type={vehicle.gear_type} model={vehicle.model} price_per_day={vehicle.price_per_day} seats={vehicle.seats} vehicle_type={vehicle.vehicle_type.name} car_img={vehicle.car_img} vehicle_id={vehicle.id} />) : "Es gab ein Fehler bei der Datenabfrage..."}</div>}
                    {fetchedVehicle?.length > 0 && <div>{fetchedVehicle ? fetchedVehicle.map((vehicle, i) => <AutoCard key={i} brand={vehicle.brand.name} consumption={vehicle.consumption} gear_type={vehicle.gear_type} model={vehicle.model} price_per_day={vehicle.price_per_day} seats={vehicle.seats} vehicle_type={vehicle.vehicle_type.name} car_img={vehicle.car_img} vehicle_id={vehicle.id} />) : "Es gab ein Fehler bei der Datenabfrage..."}</div>}
                </div>
            </section>
            <section className="w-full items-center flex justify-between">
                <button className="btn bg-blue-600 text-white text-xs font-Jakarta-SemiBold" onClick={loadMore}>
                    Load More
                </button>
                {filteredVehicles?.length > 0 && <p className="text-[#90A3BF]">{`${filteredVehicles.length} cars shown.`}</p>}
                {fetchedVehicle.length > 0 && <p className="text-[#90A3BF]">{`${fetchedVehicle.length} of ${tableRows} cars shown.`}</p>}
            </section>
        </section>
    );
};

export default Home;
