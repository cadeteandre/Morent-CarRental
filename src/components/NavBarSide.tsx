import { ChangeEvent, FC, useEffect, useState } from "react";
import { Vehicle } from "../pages/Home";
import { supabase } from "../utils/supabase/setupSupabase";

// const types = ["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"];
// const capacities = ["2 Person", "4 Person", "6 Person", "8 or More"];

interface NavBarSideProps {
    fetchedVehicle: Vehicle[] | null;
    filteredVehicles: Vehicle[] | null;
    setCheckboxStatesTypes: React.Dispatch<
        React.SetStateAction<{
            [key: string]: boolean;
        }>
    >;
    setCheckboxStatesSeats: React.Dispatch<
        React.SetStateAction<{
            [key: string]: boolean;
        }>
    >;
}

const NavBarSide: FC<NavBarSideProps> = ({ fetchedVehicle, filteredVehicles, setCheckboxStatesTypes, setCheckboxStatesSeats }) => {
    const [rangeValue, setRangeValue] = useState<string>("");
    const [types, setTypes] = useState<string[]>([]);
    const [capacities, setCapacities] = useState<number[]>([]);
    // const [countedTypes, setCountedTypes] = useState<Record<string, number>>();
    // const [countedCapacities, setCountedCapacities] = useState<Record<string, number>>();
    const [prices, setPrices] = useState<number[]>([]);
    const [midPrice, setMidPrice] = useState<number>(0);

    async function createTypes() {
        const { data } = await supabase.from("vehicle_types").select();
        if (data) {
            const typeSet = new Set(
                data.map((type) => {
                    return type.name;
                })
            );
            const typesFromSet = Array.from(typeSet).sort();
            setTypes(typesFromSet);
        }
    }

    async function createCapacities() {
        const { data } = await supabase.from("vehicles").select("seats");
        if (data) {
            const capacitiesSet = new Set(
                data.map((vehicle) => {
                    return vehicle.seats;
                })
            );
            const capacitiesFromSet = Array.from(capacitiesSet).sort();
            setCapacities(capacitiesFromSet);
        }
    }

    function createPrices(fetchedVehicle: Vehicle[] | null, filteredVehicles: Vehicle[] | null) {
        if (fetchedVehicle?.length > 0) {
            const prices = fetchedVehicle.map((vehicle) => {
                return vehicle.price_per_day != null ? vehicle.price_per_day : 0;
            });
            const maxPrice = Math.max(...prices);
            const minPrice = Math.min(...prices);

            const priceRange = [minPrice, maxPrice];
            const middlePrice = maxPrice - (maxPrice - minPrice) / 2;

            setPrices(priceRange);
            setMidPrice(middlePrice);
            setRangeValue(String(middlePrice));
        } else if (filteredVehicles?.length > 0) {
            const prices = filteredVehicles.map((vehicle) => {
                return vehicle.price_per_day != null ? vehicle.price_per_day : 0;
            });
            const maxPrice = Math.max(...prices);
            const minPrice = Math.min(...prices);

            const priceRange = [minPrice, maxPrice];
            // const middlePrice = Math.ceil(maxPrice - (maxPrice - minPrice) / 2);

            setPrices(priceRange);
            // setMidPrice(middlePrice);
            // setRangeValue(String(middlePrice));

            console.log("priceRange: ", priceRange);
            // console.log("middlePrice: ", middlePrice);
        }
    }

    function handleCheckboxChangeType(event: React.ChangeEvent<HTMLInputElement>) {
        const { id, checked } = event.target;
        setCheckboxStatesTypes((prevStates) => ({
            ...prevStates,
            [id]: checked,
        }));
    }

    function handleCheckboxChangeSeats(event: React.ChangeEvent<HTMLInputElement>) {
        const { id, checked } = event.target;
        setCheckboxStatesSeats((prevStates) => ({
            ...prevStates,
            [id]: checked,
        }));
    }

    useEffect(() => {
        createTypes();
        createCapacities();
    }, []);

    useEffect(() => {
        if (fetchedVehicle || filteredVehicles) {
            createPrices(fetchedVehicle, filteredVehicles);
        }
    }, [fetchedVehicle, filteredVehicles]);

    useEffect(() => {
        if (prices.length === 2) {
            const middlePrice = Math.ceil((prices[0] + prices[1]) / 2);
            setMidPrice(middlePrice);
            setRangeValue(String(middlePrice));
        }
    }, [prices]);

    console.log(midPrice);

    return (
        <aside className="flex flex-col gap-14 bg-base-100 w-[327px] px-3.5 py-8 shadow-sm rounded-md">
            {/* Type*/}
            <fieldset>
                <legend className="uppercase font-bold text-neutral-400 text-[10.7px] font-Jakarta-SemiBold tracking-widest mb-7">Type</legend>
                <div className="flex flex-col gap-8">
                    {types.map((type, index) => (
                        <div key={index} className="flex items-center gap-2 font-Jakarta-SemiBold text-neutral-600 text-xl">
                            <input type="checkbox" id={type} className="checkbox  checkbox-xs checkbox-primary" onChange={handleCheckboxChangeType} />
                            <label htmlFor={`type-${type.toLowerCase()}`}>{type}</label>
                            {/* <span className="text-neutral-400">{countedTypes ? countedTypes[type] : ""}</span> */}
                        </div>
                    ))}
                </div>
            </fieldset>
            {/* Capacity*/}
            <fieldset>
                <legend className="uppercase font-bold text-neutral-400 text-[10.7px]  font-Jakarta-SemiBold tracking-widest mb-7">Capacity</legend>
                <div className="flex flex-col gap-8">
                    {capacities.map((capacity, index) => (
                        <div key={index} className="flex items-center gap-2 font-Jakarta-SemiBold text-xl text-neutral-600">
                            <input type="checkbox" id={`${capacity}`} className="checkbox checkbox-xs checkbox-primary" onChange={handleCheckboxChangeSeats} />
                            <label htmlFor={`capacity-${capacity}`}>{`${capacity} seats`}</label>
                            {/* <span className="text-neutral-400">{countedCapacities ? countedCapacities[capacity] : ""}</span> */}
                        </div>
                    ))}
                </div>
            </fieldset>

            {/* Price*/}
            {prices[0] != prices[1] && (
                <fieldset>
                    <legend className="uppercase font-bold text-neutral-400 text-[10.7px] font-Jakarta-SemiBold tracking-widest mb-7">Price</legend>
                    <label htmlFor="price" className="sr-only">
                        Price Range
                    </label>
                    <input id="price" type="range" min={prices[0]} max={prices[1]} value={Number(midPrice)} className="range range-primary range-xs" onChange={(e: ChangeEvent<HTMLInputElement>) => setRangeValue(e.target.value)} />
                    <p className="font-Jakarta-SemiBold mt-3 text-neutral-600">Max. €{rangeValue}.00</p>
                </fieldset>
            )}
        </aside>
    );
};

export default NavBarSide;
