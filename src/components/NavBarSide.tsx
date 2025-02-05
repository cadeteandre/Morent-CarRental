import { ChangeEvent, useState } from "react";

const types = ["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"];
const capacities = ["2 Person", "4 Person", "6 Person", "8 or More"];

const NavBarSide = () => {
  const [rangeValue, setRangeValue] = useState<string>("");

  return (
    <aside className="flex flex-col gap-14 bg-base-100 w-[327px] px-3.5 py-8 shadow-sm rounded-md">
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
              />
              <label htmlFor={`type-${type.toLowerCase()}`}>{type}</label>
              <span className="text-neutral-400">(10)</span>
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
                id={`capacity-${capacity.replace(/\s+/g, "-").toLowerCase()}`}
                className="checkbox checkbox-xs checkbox-primary"
              />
              <label
                htmlFor={`capacity-${capacity
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                {capacity}
              </label>
              <span className="text-neutral-400">(10)</span>
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
          max={150}
          defaultValue={100}
          className="range range-primary range-xs"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRangeValue(e.target.value)
          }
        />
        <p className="font-Jakarta-SemiBold mt-3 text-neutral-600">
          Max. €{rangeValue || "100"}.00
        </p>
      </fieldset>
    </aside>
  );
};

export default NavBarSide;
