import { ChangeEvent, FC, useEffect, useState } from "react";
import { supabase } from "../utils/supabase/setupSupabase";

interface NavBarSideProps {
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
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}

const NavBarSide: FC<NavBarSideProps> = ({
  setCheckboxStatesTypes,
  setCheckboxStatesSeats,
  setMaxPrice,
}) => {
  const [types, setTypes] = useState<string[]>([]);
  const [capacities, setCapacities] = useState<number[]>([]);
  const [rangePrice, setRangePrice] = useState<number>(1001);

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

  function handleCheckboxChangeType(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { id, checked } = event.target;
    setCheckboxStatesTypes((prevStates) => ({
      ...prevStates,
      [id]: checked,
    }));
  }

  function handleCheckboxChangeSeats(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { id, checked } = event.target;
    setCheckboxStatesSeats((prevStates) => ({
      ...prevStates,
      [id]: checked,
    }));
  }

  function handlePriceRangeChange(value: string) {
    setRangePrice(Number(value));
    setMaxPrice(Number(value));
  }

  useEffect(() => {
    createTypes();
    createCapacities();
  }, []);

  return (
    <aside className="flex flex-col gap-14 bg-base-100 w-full max-w-[368px] px-3.5 py-8 shadow-sm rounded-lg">
      {/* Type*/}
      <fieldset>
        <legend className="uppercase font-bold text-neutral-400 text-[10.7px] font-Jakarta-SemiBold tracking-widest mb-7">
          Type
        </legend>
        <div className="flex flex-col gap-8">
          {types.map((type, index) => (
            <div
              key={index}
              className="flex items-center gap-2 font-Jakarta-SemiBold text-neutral-600 text-xl"
            >
              <input
                type="checkbox"
                id={type}
                className="checkbox  checkbox-xs checkbox-primary"
                onChange={handleCheckboxChangeType}
              />
              <label htmlFor={`type-${type.toLowerCase()}`}>{type}</label>
              {/* <span className="text-neutral-400">{countedTypes ? countedTypes[type] : ""}</span> */}
            </div>
          ))}
        </div>
      </fieldset>
      {/* Capacity*/}
      <fieldset>
        <legend className="uppercase font-bold text-neutral-400 text-[10.7px]  font-Jakarta-SemiBold tracking-widest mb-7">
          Capacity
        </legend>
        <div className="flex flex-col gap-8">
          {capacities.map((capacity, index) => (
            <div
              key={index}
              className="flex items-center gap-2 font-Jakarta-SemiBold text-xl text-neutral-600"
            >
              <input
                type="checkbox"
                id={`${capacity}`}
                className="checkbox checkbox-xs checkbox-primary"
                onChange={handleCheckboxChangeSeats}
              />
              <label
                htmlFor={`capacity-${capacity}`}
              >{`${capacity} seats`}</label>
              {/* <span className="text-neutral-400">{countedCapacities ? countedCapacities[capacity] : ""}</span> */}
            </div>
          ))}
        </div>
      </fieldset>

      {/* Price*/}
      <fieldset>
        <legend className="uppercase font-bold text-neutral-400 text-[10.7px] font-Jakarta-SemiBold tracking-widest mb-7">
          Price
        </legend>
        <label htmlFor="price" className="sr-only">
          Price Range
        </label>
        <input
          id="price"
          type="range"
          min={0}
          max={1001}
          value={Number(rangePrice)}
          className="range range-primary range-xs"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handlePriceRangeChange(e.target.value)
          }
        />
        <p className="font-Jakarta-SemiBold mt-3 text-neutral-600">
          {rangePrice === 1001 ? "no Limit" : `Max. €${rangePrice}.00`}
        </p>
      </fieldset>
    </aside>
  );
};

export default NavBarSide;
