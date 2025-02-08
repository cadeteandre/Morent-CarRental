import { useContext, useEffect, useState } from "react";
import BookingItem from "../components/BookingItem";
import { supabase } from "../utils/supabase/setupSupabase";
import { mainContext } from "../context/MainProvider";
import { User } from "@supabase/supabase-js";
import { IBookedVehicle } from "../interfaces/IBookedVehicle";

const MyBookings = () => {

    const { setUser } = useContext(mainContext) as {setUser: React.Dispatch<React.SetStateAction<User>>}

    const [selected, setSelected] = useState("Upcoming");
    const [userBookings, setUserBookings] = useState<IBookedVehicle[]>([]);

    useEffect(() => {
        async function fetchBookings() {
            const { data: { user } } = await supabase.auth.getUser();
        
            if (user?.id) {
              setUser(user);
        
              const { data: bookings, error: bookingsError } = await supabase
              .from('bookings')
              .select(`
                vehicle_id,
                start_date,
                end_date,
                price,
                pickupLocation:location_start(id, name),
                dropoffLocation:location_end(id, name)
              `)
              .eq('profile_id', user.id);
        
              if (bookingsError) {
                console.error("Error fetching for bookings:", bookingsError.message);
                return;
              }
        
              const bookingsWithVehicleIds = bookings.map((booked) => booked.vehicle_id);
        
              if (bookingsWithVehicleIds.length > 0) {
                const { data: vehicles, error: vehiclesError } = await supabase
                  .from('vehicles')
                  .select(`
                    id,
                    model,
                    gear_type,
                    price_per_day,
                    seats,
                    consumption,
                    car_img,
                    brand(name),
                    vehicle_type(name),
                    fuel(name),
                    color(name)
                  `)
                  .in('id', bookingsWithVehicleIds);
        
                if (vehiclesError) {
                  console.error("Error searching for vehicles:", vehiclesError.message);
                } else {
                  // Maps bookings to corresponding vehicles
                  const vehiclesWithBookings = vehicles.map(vehicle => {
                    const bookingDetails = bookings.find(b => b.vehicle_id === vehicle.id);
                    return {
                      ...vehicle,
                      booking: bookingDetails
                        ? {
                            startDate: bookingDetails.start_date,
                            endDate: bookingDetails.end_date,
                            price: bookingDetails.price,
                            pickupLocation: bookingDetails.pickupLocation,
                            dropoffLocation: bookingDetails.dropoffLocation
                          }
                        : null
                    };
                  });

                  setUserBookings(vehiclesWithBookings as unknown as IBookedVehicle[]);
                }
              } else {
                setUserBookings([]);
                console.log("No rental vehicles found for this user.");
              }
            }
          }
        
          fetchBookings();
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