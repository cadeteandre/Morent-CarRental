import { useState } from "react";
import BookingItem from "../components/BookingItem";

const MyBookings = () => {

    const [selected, setSelected] = useState("Upcoming");
    return (  
        <section className="flex flex-col px-4 text-center">
            <h1 className="text-2xl font-bold mb-8">My Bookings</h1>
            <hr className="w-full self-center text-gray-400" />
            <div className="flex flex-col items-center space-y-4 border rounded-3xl self-center my-6">
                <div className="flex items-center justify-between bg-gray-200 rounded-full p-1 max-w-[260px]">
                    <button
                    className={`py-1 px-6 text-center rounded-full text-sm transition ${
                        selected === "Upcoming" ? "bg-white shadow-md" : "text-gray-500"
                    }`}
                    onClick={() => setSelected("Upcoming")}
                    >
                    Upcoming
                    </button>
                    <button
                    className={`py-1 px-6 rounded-full text-sm transition ${
                        selected === "History" ? "bg-white shadow-md" : "text-gray-500"
                    }`}
                    onClick={() => setSelected("History")}
                    >
                    History
                    </button>
                </div>
            </div>
            <BookingItem 
                carModel="Audi A4" 
                pickupDate="04.02.2025" 
                dropOffDate="05-02-2025" 
                price={1275} 
                pickupCity="Düsseldorf" 
                dropOffCity="Köln"
                carImg="https://res.cloudinary.com/dg1qeccqc/image/upload/v1712569915/Cars/DALL_E_2024-04-08_11.51.48_-_Create_an_image_featuring_a_red_2019_Audi_A4_sedan_on_a_pure_white_background_including_the_floor_with_the_car_positioned_frontally_from_the_left_si_qdhpdq.webp"  />
        </section>
    );
}

export default MyBookings;