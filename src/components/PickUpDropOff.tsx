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

const PickUpDropOff: React.FC<IPickUpDropOffProps> = forwardRef(({ componentTitle, listId, locationRef, dateRef, timeRef }) => {
    const [locations, setLocations] = useState<Data[]>([]);

    async function fetchLocations() {
        const { data, error } = await supabase.from("locations").select("name");
        if (error) {
            console.error("es ist ein Fehler beim fetchen der Locations aufgetreten: ", error);
        } else {
            setLocations(data);
        }
    }

    useEffect(() => {
        fetchLocations();
    }, []);

    return (
        <div className="card bg-white rounded-box flex items-center justify-center p-4 max-w-full">
            <p className="text-[14px] font-bold self-start mb-2">{componentTitle}</p>
            <div className="flex gap-2 max-w-full">
                <div className="flex flex-col items-center">
                    <label htmlFor="pickup-location" className="self-start">
                        Location:
                    </label>
                    <input list={listId} name="locations" className="border-none" placeholder="type here..." ref={locationRef} />
                    <datalist id={listId}>
                        {locations?.length > 0 &&
                            locations?.map((location, i) => (
                                <option value={location.name as string} key={i}>
                                    {location.name}
                                </option>
                            ))}
                    </datalist>
                </div>
                <div className="flex flex-col items-center max-w-[35%]">
                    <label htmlFor="pickup-date" className="self-start">
                        Datum:
                    </label>
                    <input type="date" name="pickup-date" id="pickup-date" className="border-none max-w-full" ref={dateRef} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="pickup-time">Time:</label>
                    <input type="time" name="pickup-time" id="pickup-time" className="border-none" ref={timeRef} />
                </div>
            </div>
        </div>
    );
});

export default PickUpDropOff;
