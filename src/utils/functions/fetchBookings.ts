import { IBookedVehicle } from "../../interfaces/IBookedVehicle";
import { supabase } from "../supabase/setupSupabase";
import { User } from '@supabase/supabase-js';

export default async function fetchBookings(user: User, setUserBookings: React.Dispatch<React.SetStateAction<IBookedVehicle[]>>) {

    if (user?.id) {
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