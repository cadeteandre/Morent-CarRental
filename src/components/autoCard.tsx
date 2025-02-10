import { FC, useContext, useEffect, useState } from "react";
import ConsumptionIcon from "../assets/SVG/ConsumptionIcon";
import GearTypeIcon from "../assets/SVG/GearTypeIcon";
import HeartIcon from "../assets/SVG/HeartIcon";
import SeatIcon from "../assets/SVG/SeatIcon";

import {
  addFavorite,
  checkIfFavorited,
  removeFavorite,
} from "../utils/functions/userFavoriteCars";
import RedHeartIcon from "../assets/SVG/RedHeartIcon";
import { User } from "@supabase/supabase-js";
import { Link } from "react-router";
import { mainContext } from "../context/MainProvider";
import { Vehicle } from "../pages/Home";
import { TVehicleDetail } from "../pages/Details";

interface AutoCardProps {
  vehicle_id: string;
  brand: string;
  model: string;
  vehicle_type: string;
  consumption: number;
  gear_type: "Automatic" | "Manuel";
  seats: number;
  price_per_day: number | null;
  car_img: string | null;
}

const AutoCard: FC<AutoCardProps> = (props) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const { user, setRefreshFavList } = useContext(mainContext) as {
    user: User | null;
    setRefreshFavList: React.Dispatch<React.SetStateAction<boolean>>;
  };

  const { setSelectedCar } = useContext(mainContext) as {
    setSelectedCar: React.Dispatch<
      React.SetStateAction<Vehicle | TVehicleDetail | null>
    >;
  };

  function handleSelectedCar() {
    setSelectedCar({
      id: props.vehicle_id,
      brand: { name: props.brand },
      consumption: props.consumption,
      gear_type: props.gear_type,
      model: props.model,
      price_per_day: props.price_per_day,
      seats: props.seats,
      vehicle_type: { name: props.vehicle_type },
      car_img: props.car_img,
    });
  }
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (user) {
        const isFav = await checkIfFavorited(props.vehicle_id);
        setIsFavorited(isFav);
      }
    };

    fetchFavoriteStatus();
  }, [props.vehicle_id]);

  const handleClickFavIcon = async () => {
    if (user) {
      if (isFavorited) {
        await removeFavorite(props.vehicle_id, user.id);
      } else {
        await addFavorite(props.vehicle_id, user.id);
      }
      setIsFavorited((prev) => !prev);
      setRefreshFavList((prev) => !prev);
    }
  };

  return (
    <article className="card rounded-lg bg-base-100 w-[327px] md:w-[309px] shadow-sm font-display static">
      <div className="card-body p-6">
        <div className="flex flex-row justify-between items-center">
          <Link to={`/details/${props.vehicle_id}`}>
            <h2 className="font-bold text-base">{`${props?.brand} ${props.model}`}</h2>
          </Link>
          <button
            type="button"
            onClick={handleClickFavIcon}
            title="add to my Favorites"
            className="cursor-pointer"
          >
            {isFavorited ? <RedHeartIcon /> : <HeartIcon />}
          </button>
        </div>
        <p className="text-neutral-400 font-bold text-[10.7px]">
          {props.vehicle_type}
        </p>

        <figure>
          <Link to={`/details/${props.vehicle_id}`}>
            <img
              className="rounded-lg"
              src={props.car_img ? props.car_img : "./svg/platzhalter_bild.svg"}
              alt={
                props.car_img
                  ? `${props.brand} ${props.model}`
                  : `Picture not available.`
              }
            />
          </Link>
        </figure>

        <ul className="flex justify-between items-center mb-7 mt-2">
          <li
            className="flex gap-1 items-center text-neutral-500"
            title="consumption"
          >
            <ConsumptionIcon />
            {props.consumption}
          </li>
          <li
            className="flex gap-1 items-center text-neutral-500"
            title="gear type"
          >
            <GearTypeIcon />
            {props.gear_type}
          </li>
          <li
            className="flex gap-1 items-center text-neutral-500"
            title="seats"
          >
            <SeatIcon />
            {props.seats}
          </li>
        </ul>

        <div className="card-actions justify-end items-center">
          <p className="text-base font-bold ">
            {props.price_per_day
              ? `€ ${props.price_per_day} / `
              : `not available`}
            <span className="text-neutral-400 text-sm">day</span>
          </p>
          <Link to={`${user ? "/payment" : "/login"}`}>
            <button
              onClick={handleSelectedCar}
              className="btn bg-primary text-white text-xs font-Jakarta-SemiBold"
            >
              Rent Now
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default AutoCard;
