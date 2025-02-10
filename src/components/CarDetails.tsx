import { useContext, useEffect } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { TVehicleDetail } from "../pages/Details";
import getCityCoordinates from "../utils/functions/getCityCoordinates";
import { Link } from "react-router";
import { mainContext } from "../context/MainProvider";
import { User } from "@supabase/supabase-js";

interface ICarDetailsProps {
  vehicle: TVehicleDetail;
  location: string;
}

const CarDetails: React.FC<ICarDetailsProps> = ({ vehicle, location }) => {
  const { user, setSelectedCar } = useContext(mainContext) as {user: User | null,
    setSelectedCar: React.Dispatch<React.SetStateAction<TVehicleDetail>>;
  };


  useEffect(() => {
    const map = L.map("map").setView([0, 0], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    getCityCoordinates(location)
      .then(({ latitude, longitude }) => {
        map.setView([latitude, longitude], 13);

        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup("Selected city")
          .openPopup();
      })
      .catch((error) => console.error(error));

    return () => {
      map.remove();
    };
  }, [location]);

  return (
    <div className=" flex w-[327px] flex-col gap-7 font-display md:flex-row md:w-full ">
      <figure className=" bg-base-100 shadow-sm rounded-box flex items-center justify-center md:w-lg md:h-[401px] md:overflow-hidden ">
        <img
          className="md:w-full md:h-full md:object-cover "
          src={vehicle.car_img}
          alt={`${vehicle.brand.name} ${vehicle.model} image`}
        />
      </figure>
      <div className="card bg-base-100 shadow-sm rounded-box   gap-[30px] p-[30px] md:w-[541px] static">
        <div>
          <h1 className="text-[28px] font-bold text-blue-950">
            {`${vehicle.brand.name} ${vehicle.model}`}
          </h1>
          <div className="flex items-center gap-2.5">
            {" "}
            <p className="text-lg text-amber-400">★★★☆☆</p>
            <p className="text-sm text-neutral-500">2 Reviewer</p>
          </div>{" "}
        </div>
        <div className="flex flex-col gap-3.5 md:flex-row md:justify-between">
          <ul className="text-sm text-neutral-400 flex flex-col gap-3.5 md:w-full">
            <li className="flex justify-between">
              <p>Type Car</p>{" "}
              <p className="text-neutral-600">{`${vehicle.vehicle_type.name}`}</p>
            </li>
            <li className="flex justify-between">
              <p>Gear</p>{" "}
              <p className="text-neutral-600">{vehicle.gear_type}</p>
            </li>
            <li className="flex justify-between">
              <p>HP</p> <p className="text-neutral-600">{vehicle.ps}</p>
            </li>
            <li className="flex justify-between">
              <p>Color</p>{" "}
              <p className="text-neutral-600">{vehicle.color.name}</p>
            </li>
          </ul>
          <ul className="text-sm text-neutral-400 flex flex-col gap-3.5 md:w-full">
            <li className="flex justify-between">
              <p>Capacity</p>{" "}
              <p className="text-neutral-600">{`${vehicle.seats} Persons`}</p>
            </li>
            <li className="flex justify-between">
              <p>Usage</p>{" "}
              <p className="text-neutral-600">{`${vehicle.consumption} L`}</p>
            </li>
            <li className="flex justify-between">
              <p>Fuel</p>{" "}
              <p className="text-neutral-600">{vehicle.fuel.name}</p>
            </li>
            <li className="flex justify-between">
              <p>Luggage</p>{" "}
              <p className="text-neutral-600">{vehicle.luggage}</p>
            </li>
          </ul>
        </div>
        <div className="card-actions flex-col items-start gap-5 md:flex-row md:justify-between">
          <p className="text-2xl font-bold ">
            {`€ ${vehicle.price_per_day}`} /{" "}
            <span className="text-neutral-400 text-base">day</span>
          </p>
          <Link to={`${user ? '/payment' : '/login'}`}>
            <button
              onClick={() => setSelectedCar(vehicle)}
              className="btn bg-blue-600 text-white w-full text-sm mb-7 md:w-fit"
            >
              Rent Now
            </button>
          </Link>
        </div>
      </div>

      <div id="map" className="h-[400px] flex w-[327px] rounded-sm "></div>
    </div>
  );
};

export default CarDetails;
