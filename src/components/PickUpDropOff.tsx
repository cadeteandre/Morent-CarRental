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
      <div className="card bg-white rounded-lg w-full py-4 px-6  md:px-8 font-display lg:max-w-[586px]">
        <p className="text-sm font-bold  mb-2">{componentTitle}</p>
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-start ">
            <label htmlFor={`location_${componentTitle}`}>Location</label>
            <input
              list={listId}
              id={`location_${componentTitle}`}
              className="border-none text-sm w-24 lg:w-fit pl-2.5 py-1.5"
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
              <label htmlFor={`date_${componentTitle}`}>Date</label>
              <input
                type="date"
                id={`date_${componentTitle}`}
                className="border-none text-sm w-24 lg:w-fit"
                ref={dateRef}
              />
            </div>
            <div className="flex flex-col items-start ">
              <label htmlFor={`time_${componentTitle}`}>Time</label>
              <input
                type="time"
                id={`time_${componentTitle}`}
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
