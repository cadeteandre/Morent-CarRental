import { ChangeEvent, useState } from "react";

const types = ["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"];
const capacities = ["2 Person", "4 Person", "6 Person", "8 or More"];

const NavBarSide = () => {
  const [rangeValue, setRangeValue] = useState<string>("");

  return (
    <aside className="flex flex-col w-80">
      {/* Type*/}
      <fieldset>
        <legend className="uppercase font-bold text-neutral-400 text-[10.7px]">
          Type
        </legend>
        {types.map((type, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`type-${type.toLowerCase()}`}
              className="checkbox checkbox-primary"
            />
            <label htmlFor={`type-${type.toLowerCase()}`}>{type}</label>
            <span>(10)</span>
          </div>
        ))}
      </fieldset>
      {/* Capacity*/}
      <fieldset>
        <legend className="uppercase font-bold text-neutral-400 text-[10.7px]">
          Capacity
        </legend>
        {capacities.map((capacity, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`capacity-${capacity.toLowerCase()}`}
              className="checkbox checkbox-primary"
            />
            <label
              htmlFor={`capacity-${capacity
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
            >
              {capacity}
            </label>
            <span>(10)</span>
          </div>
        ))}
      </fieldset>

      {/* Price*/}
      <fieldset>
        <legend className="uppercase font-bold text-neutral-400 text-[10.7px]">
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
        <p>Max. €{rangeValue || "100"}.00</p>
      </fieldset>
    </aside>
  );
};

export default NavBarSide;
