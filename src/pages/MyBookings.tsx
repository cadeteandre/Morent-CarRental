import { useContext, useEffect, useState } from "react";
import BookingItem from "../components/BookingItem";
import { mainContext } from "../context/MainProvider";
import { User } from "@supabase/supabase-js";
import { IBookedVehicle } from "../interfaces/IBookedVehicle";
import fetchBookings from "../utils/functions/fetchBookings";

const MyBookings = () => {

    const { setUser } = useContext(mainContext) as {setUser: React.Dispatch<React.SetStateAction<User>>}

    const [selected, setSelected] = useState("Upcoming");
    const [userBookings, setUserBookings] = useState<IBookedVehicle[]>([]);

    useEffect(() => {
          fetchBookings(setUser, setUserBookings);
    }, [setUser])

    return (  
        <section className="flex flex-col px-4 text-center py-8 items-center">
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
            {userBookings.map((singleVehicle) => (
                <BookingItem
                    key={singleVehicle.id}
                    carId={singleVehicle.id}
                    carBrand={singleVehicle.brand.name}
                    carModel={singleVehicle.model} 
                    pickupDate={singleVehicle.booking.startDate} 
                    dropOffDate={singleVehicle.booking.endDate} 
                    price={singleVehicle.price_per_day} 
                    pickupCity={singleVehicle.booking.pickupLocation.name} 
                    dropOffCity={singleVehicle.booking.dropoffLocation.name}
                    carImg={singleVehicle.car_img}
                />
            ))
            }
        </section>
    );
}

export default MyBookings;