import { forwardRef, RefObject } from "react";

interface IPickUpDropOffProps {
    componentTitle: string;
    locationRef: RefObject<HTMLSelectElement>;
    dateRef: RefObject<HTMLInputElement>;
    timeRef: RefObject<HTMLInputElement>;
}

const PickUpDropOff: React.FC<IPickUpDropOffProps> = forwardRef(({ componentTitle, locationRef, dateRef, timeRef }) => {
    return (
        <div className="card bg-white rounded-box flex items-center justify-center p-4 max-w-full">
            <p className="text-[14px] font-bold self-start mb-2">{componentTitle}</p>
            <div className="flex gap-2 max-w-full">
                <div className="flex flex-col items-center">
                    <label htmlFor="pickup-location" className="self-start">
                        Location:
                    </label>
                    <select name="pickup-location" id="pickup-location" className="border-none" ref={locationRef}>
                        <option value="">Please select</option>
                        <option value="Hamburg">Hamburg</option>
                        <option value="Berlin">Berlin</option>
                        <option value="München">München</option>
                    </select>
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
