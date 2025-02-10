import { ChangeEvent, FC, useEffect, useState } from "react";
import { Vehicle } from "../pages/Home";

// const types = ["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"];
// const capacities = ["2 Person", "4 Person", "6 Person", "8 or More"];

interface NavBarSideProps {
  data: Vehicle[] | null;
}

const NavBarSide: FC<NavBarSideProps> = ({ data }) => {
  const [rangeValue, setRangeValue] = useState<string>("");
  const [types, setTypes] = useState<string[]>([]);
  const [countedTypes, setCountedTypes] = useState<Record<string, number>>();
  const [capacities, setCapacities] = useState<number[]>([]);
  const [countedCapacities, setCountedCapacities] =
    useState<Record<string, number>>();
  const [prices, setPrices] = useState<number[]>([]);
  const [midPrice, setMidPrice] = useState<number>();
  const [checkboxStates, setCheckboxStates] = useState<{
    [key: string]: boolean;
  }>({});

  function createTypes(data: Vehicle[]) {
    if (data) {
      // auslesen der vorhandenen typen
      const typesSet = new Set(
        data.map((vehicle) => {
          return vehicle.vehicle_type.name;
        })
      );
      const typesFromSet = Array.from(typesSet).sort();
      setTypes(typesFromSet);

      // zählen der vorhandenen typen
      const typeCount = data.reduce(
        (acc: Record<string, number>, vehicle: Vehicle) => {
          acc[vehicle.vehicle_type.name] =
            (acc[vehicle.vehicle_type.name] || 0) + 1;
          return acc;
        },
        {}
      );
      setCountedTypes(typeCount);
    }
  }

  function createCapacities(data: Vehicle[]) {
    if (data) {
      const capacitiesSet = new Set(
        data.map((vehicle) => {
          return vehicle.seats;
        })
      );
      const capacitiesFromSet = Array.from(capacitiesSet).sort();
      setCapacities(capacitiesFromSet);

      // zählen der vorhandenen capacities
      const typeCount = data.reduce(
        (acc: Record<string, number>, vehicle: Vehicle) => {
          acc[vehicle.seats] = (acc[vehicle.seats] || 0) + 1;
          return acc;
        },
        {}
      );
      setCountedCapacities(typeCount);
    }
  }

  function createPrices(data: Vehicle[]) {
    if (data) {
      const prices = data.map((vehicle) => {
        return vehicle.price_per_day != null ? vehicle.price_per_day : 0;
      });
      const maxPrice = Math.max(...prices);
      const minPrice = Math.min(...prices);

      const priceRange = [minPrice, maxPrice];
      const middlePrice = maxPrice - (maxPrice - minPrice) / 2;

      setPrices(priceRange);
      setMidPrice(middlePrice);
      setRangeValue(String(middlePrice));
    }
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, checked } = event.target;
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [id]: checked,
    }));
  }

  useEffect(() => {
    if (data) {
      createTypes(data);
      createCapacities(data);
      createPrices(data);
    }
  }, [data]);

  console.log(checkboxStates);

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
                id={`type-${type.toLowerCase()}`}
                className="checkbox  checkbox-xs checkbox-primary"
                onChange={handleCheckboxChange}
              />
              <label htmlFor={`type-${type.toLowerCase()}`}>{type}</label>
              <span className="text-neutral-400">
                {countedTypes ? countedTypes[type] : ""}
              </span>
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
                id={`capacity-${capacity}`}
                className="checkbox checkbox-xs checkbox-primary"
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor={`capacity-${capacity}`}
              >{`${capacity} seats`}</label>
              <span className="text-neutral-400">
                {countedCapacities ? countedCapacities[capacity] : ""}
              </span>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Price*/}
      {prices[0] != prices[1] && (
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
            min={prices[0]}
            max={prices[1]}
            defaultValue={Number(midPrice)}
            className="range range-primary range-xs"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRangeValue(e.target.value)
            }
          />
          <p className="font-Jakarta-SemiBold mt-3 text-neutral-600">
            Max. €{rangeValue}.00
          </p>
        </fieldset>
      )}
    </aside>
  );
};

export default NavBarSide;
