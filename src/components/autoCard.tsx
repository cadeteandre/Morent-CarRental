import { FC } from "react";
import ConsumptionIcon from "../assets/SVG/ConsumptionIcon";
import GearTypeIcon from "../assets/SVG/GearTypeIcon";
import HeartIcon from "../assets/SVG/HeartIcon";
import SeatIcon from "../assets/SVG/SeatIcon";

interface AutoCardProps {
    brand: string;
    model: string;
    vehicle_type: string;
    consumption: number;
    gear_type: string;
    seats: number;
    price_per_day: number | null;
    car_img: string | null;
}

const AutoCard: FC<AutoCardProps> = (props) => {
    return (
        <article className="card bg-base-100 w-[327px] shadow-sm font-display ">
            <div className="card-body p-6">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="font-bold text-base">{`${props.brand} ${props.model}`}</h2>
                    <button type="button" title="add to my Favorites" className="cursor-pointer">
                        <HeartIcon />
                    </button>
                </div>
                <p className="text-neutral-400 font-bold text-[10.7px]">{props.vehicle_type}</p>

                <figure>
                    <img src={props.car_img ? props.car_img : "./svg/platzhalter_bild.svg"} alt={props.car_img ? `${props.brand} ${props.model}` : `Picture not available.`} />
                </figure>

                <ul className="flex justify-between items-center mb-9">
                    <li className="flex gap-1 items-center text-neutral-500" title="consumption">
                        <ConsumptionIcon />
                        {props.consumption}
                    </li>
                    <li className="flex gap-1 items-center text-neutral-500" title="gear type">
                        <GearTypeIcon />
                        {props.gear_type}
                    </li>
                    <li className="flex gap-1 items-center text-neutral-500" title="seats">
                        <SeatIcon />
                        {props.seats}
                    </li>
                </ul>

                <div className="card-actions justify-end items-center">
                    <p className="text-base font-bold ">
                        {props.price_per_day ? `€ ${props.price_per_day} / ` : `not available`}
                        <span className="text-neutral-400 text-sm">day</span>
                    </p>
                    <button className="btn bg-blue-600 text-white text-xs font-Jakarta-SemiBold">Rent Now</button>
                </div>
            </div>
        </article>
    );
};

export default AutoCard;
