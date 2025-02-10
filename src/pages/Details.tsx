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

export type TVehicleDetail = {
    brand: { name: string },
    model: string,
    vehicle_type: { name: string },
    gear_type: 'Automatic' | 'Manuel',
    ps: number,
    color: { name: string },
    seats: number,
    consumption: number,
    fuel: { name: string },
    luggage: number,
    price_per_day: number,
    car_img: string
}

const Details = () => {

    const { carId } = useParams()

    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState<TVehicleDetail | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [fetchLimit, setFetchLimit] = useState<number>(2);
    const [totalVehicles, setTotalVehicles] = useState<number>(0);

    useEffect(() => {
        if(carId) {
            fetchCarById(carId, setVehicle);
            fetchLocationByCarId(carId, setLocation);
            fetchReviewsByCar(carId, setReviews);
        } 

        if(location) {
            fetchCarsByCity(location, setVehicleList, fetchLimit);
            fetchTotalVehiclesInCity(location, setTotalVehicles);
        }

    }, [carId, location, fetchLimit])

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

    if(!vehicle || !location || !carId) return <p>Loading...</p>
    return (  
        <section className="py-8">
            <button onClick={() => navigate(-1)} className="cursor-pointer flex items-center justify-center mb-6">
                <img src="/svg/back-btn-icon.svg" alt="Back button icon" />
                <span className="text-[#90A3BF] py-1 text-lg">back</span>
            </button> 
            <div className="flex flex-col items-center justify-center gap-6 mb-10 px-8">
                <div>
                    <CarDetails vehicle={vehicle} location={location} />
                </div>
                <div>
                    <Reviews reviews={reviews} />
                </div>
                <div className="mb-4">
                    <p className="text-[#90A3BF] text-lg mb-4">Available Nearby</p>
                    <section className="justify-center flex flex-col flex-wrap sm:flex-row items-center gap-6">
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
                    <button onClick={loadMore} className="btn border-0 bg-blue-600 text-white">Show more car</button>
                    <span className="text-[#90A3BF]">{`${vehicleList.length} of ${totalVehicles} cars shown`}</span>
                </div>
            </div>
        </section>
    );
}

export default Details;