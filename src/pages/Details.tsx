import { useNavigate, useParams } from "react-router";
import CarDetails from "../components/CarDetails";
import Reviews from "../components/Reviews";
import { useEffect, useState } from "react";
import fetchLocationByCarId from "../utils/functions/fetchLocationByCarId";
import fetchCarById from "../utils/functions/fetchCarById";
import fetchCarsByCity from "../utils/functions/fetchCarsByCity";
import { Vehicle } from "./Home";
import AutoCard from "../components/autoCard";
import fetchReviewsByCar from "../utils/functions/fetchReviewsByCar";
import { IReview } from "../interfaces/IReview";
import fetchTotalVehiclesInCity from "../utils/functions/fetchTotalVehiclesInCity";
import BackIcon from "../assets/SVG/BackIcon";

export type TVehicleDetail = {
  id: string;
  brand: { name: string };
  model: string;
  vehicle_type: { name: string };
  gear_type: "Automatic" | "Manual";
  ps: number;
  color: { name: string };
  seats: number;
  consumption: number;
  fuel: { name: string };
  luggage: number;
  price_per_day: number;
  car_img: string;
};

const Details = () => {
  const { carId } = useParams();

  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState<TVehicleDetail | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [fetchLimit, setFetchLimit] = useState<number>(2);
  const [totalVehicles, setTotalVehicles] = useState<number>(0);

  useEffect(() => {
    if (carId) {
      fetchCarById(carId, setVehicle);
      fetchLocationByCarId(carId, setLocation);
      fetchReviewsByCar(carId, setReviews);
    }

    if (location) {
      fetchCarsByCity(location, setVehicleList, fetchLimit);
      fetchTotalVehiclesInCity(location, setTotalVehicles);
    }
  }, [carId, location, fetchLimit]);

  function loadMore() {
    setFetchLimit((prev) => {
      if (prev < totalVehicles) {
        const newLimit = prev + 2;
        return newLimit;
      } else {
        return prev;
      }
    });
  }

  if (!vehicle || !location || !carId) return <p>Loading...</p>;
  return (
    <section>
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
        className="tab p-0 justify-start items-center text-base mb-12  hidden md:flex"
      >
        <BackIcon /> Back
      </button>
      <div className="flex flex-col items-center justify-center gap-6 mb-10 ">
        <CarDetails vehicle={vehicle} location={location} reviews={reviews} />

        <Reviews reviews={reviews} />

        <div className="mb-4 w-full">
          <p className="text-neutral-400 font-display text-lg mt-11 mb-4 hidden md:flex">
            Available Nearby
          </p>
          <section className="justify-center flex flex-col flex-wrap md:flex-row md:w-full md:justify-start items-center gap-6">
            {vehicleList.map((vehicle, i) => (
              <AutoCard
                key={i}
                brand={vehicle.brand.name}
                consumption={vehicle.consumption}
                gear_type={vehicle.gear_type}
                model={vehicle.model}
                price_per_day={vehicle.price_per_day}
                seats={vehicle.seats}
                vehicle_type={vehicle.vehicle_type.name}
                car_img={vehicle.car_img}
                vehicle_id={vehicle.id}
              />
            ))}
          </section>
        </div>
        <div className="w-full items-center flex justify-between">
          <button onClick={loadMore} className="btn btn-primary ">
            Show more car
          </button>
          <span className="text-[#90A3BF]">{`${vehicleList.length} of ${totalVehicles} cars shown`}</span>
        </div>
      </div>
    </section>
  );
};

export default Details;
