import { forwardRef, RefObject, useEffect, useState } from "react";
import { supabase } from "../utils/supabase/setupSupabase";

interface IPickUpDropOffProps {
  componentTitle: string;
  listId: string;
  locationRef: RefObject<HTMLInputElement>;
  dateRef: RefObject<HTMLInputElement>;
  timeRef: RefObject<HTMLInputElement>;
}

interface Data {
  name: string | null;
}

const PickUpDropOff: React.FC<IPickUpDropOffProps> = forwardRef(
  ({ componentTitle, listId, locationRef, dateRef, timeRef }) => {
    const [locations, setLocations] = useState<Data[]>([]);

    async function fetchLocations() {
      const { data, error } = await supabase.from("locations").select("name");
      if (error) {
        console.error(
          "es ist ein Fehler beim fetchen der Locations aufgetreten: ",
          error
        );
      } else {
        setLocations(data);
      }
    }

    useEffect(() => {
      fetchLocations();
    }, []);

    return (
      <div className="card bg-white rounded-lg w-full py-4 px-6  md:px-8 font-display md:max-w-[586px]">
        <p className="text-sm font-bold  mb-2">{componentTitle}</p>
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-start ">
            <label htmlFor="pickup-location">Location</label>
            <input
              list={listId}
              name="locations"
              className="border-none text-sm w-24 md:w-fit"
              placeholder="type here..."
              ref={locationRef}
            />
            <datalist id={listId}>
              {locations?.length > 0 &&
                locations?.map((location, i) => (
                  <option value={location.name as string} key={i}>
                    {location.name}
                  </option>
                ))}
            </datalist>
          </div>
          <div className="date-time-box flex gap-2.5 ">
            <div className="flex flex-col items-start">
              <label htmlFor="pickup-date">Datum</label>
              <input
                type="date"
                name="pickup-date"
                id="pickup-date"
                className="border-none text-sm w-24 md:w-fit"
                ref={dateRef}
              />
            </div>
            <div className="flex flex-col items-start ">
              <label htmlFor="pickup-time">Time</label>
              <input
                type="time"
                name="pickup-time"
                id="pickup-time"
                className="border-none text-sm"
                ref={timeRef}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default PickUpDropOff;
