const PickUpDropOff = () => {
    return (
        <div className="flex flex-col w-full gap-6 items-center">
            <div className="card bg-base-300 rounded-[10px] flex items-center justify-center p-4">
                <p className="text-[14px] font-bold self-start mb-2">Pickup</p>
                <div className="flex gap-7">
                    <div className="flex flex-col items-center">
                        <label htmlFor="pickup-location">Location:</label>
                        <select name="pickup-location" id="pickup-location" className="border-none">
                            <option value="">Hamburg</option>
                            <option value="">Berlin</option>
                            <option value="">München</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center">
                        <label htmlFor="pickup-date">Datum:</label>
                        <input type="date" name="pickup-date" id="pickup-date" className="border-none" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="pickup-time">Time:</label>
                        <input type="time" name="pickup-time" id="pickup-time" className="border-none" />
                    </div>
                </div>
            </div>

            <button className="bg-blue-600 text-white h-fit p-4 cursor-pointer rounded-sm hover:bg-blue-800">
                <img src="./svg/austauschen.svg" alt="" className="w-7 h-7" />
            </button>

            <div className="card bg-base-300 rounded-[10px] flex  grow items-center justify-center p-4">
                <p className="text-[14px] font-bold self-start mb-2">Drop-off</p>
                <div className="flex gap-7">
                    <div className="flex flex-col items-center">
                        <label htmlFor="dropoff-location">Location:</label>
                        <select name="dropoff-location" id="dropoff-location" className="border-none">
                            <option value="">Hamburg</option>
                            <option value="">Berlin</option>
                            <option value="">München</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center">
                        <label htmlFor="dropoff-date">Datum:</label>
                        <input type="date" name="dropoff-date" id="dropoff-date" className="border-none" />
                    </div>
                    <div className="flex flex-col items-center">
                        <label htmlFor="dropoff-time">Time:</label>
                        <input type="time" name="dropoff-time" id="dropoff-time" className="border-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PickUpDropOff;
