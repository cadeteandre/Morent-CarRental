import { useParams } from "react-router";
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
    const [vehicle, setVehicle] = useState<TVehicleDetail | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
    const [reviews, setReviews] = useState<IReview[]>([]);

    useEffect(() => {
        if(carId) {
            fetchCarById(carId, setVehicle);
            fetchLocationByCarId(carId, setLocation);
            fetchReviewsByCar(carId, setReviews);
        } 

        if(location) fetchCarsByCity(location, setVehicleList);

    }, [carId, location])

    if(!vehicle || !location) return <p>Loading...</p>
    return (  
        <section className="py-8">
            <button className="cursor-pointer flex items-center justify-center mb-6">
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
                            />
                        ))}
                    </section>
                </div>
                <div className="w-full items-center flex justify-between">
                    <button className="btn border-0 bg-blue-600 text-white">Show more car</button>
                    <span className="text-[#90A3BF]">120 Car</span>
                </div>
            </div>
        </section>
    );
}

export default Details;