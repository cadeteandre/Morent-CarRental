import { useEffect } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

const CarDetails = () => {
  useEffect(() => {
    const map = L.map("map").setView([51.233334, 6.783333], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([51.233334, 6.783333])
      .addTo(map)
      // .bindPopup('Here is the marker!')
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className=" flex w-[327px] flex-col gap-7 font-display md:flex-row md:w-full ">
      <figure className=" bg-base-100 shadow-sm rounded-box flex items-center justify-center md:w-lg md:h-[401px] md:overflow-hidden ">
        <img
          className="md:w-full md:h-full md:object-cover "
          src="https://res.cloudinary.com/dg1qeccqc/image/upload/v1712567777/Cars/Golf.webp	"
          alt="Volkswagen Golf"
        />
      </figure>
      <div className="card bg-base-100 shadow-sm rounded-box   gap-[30px] p-[30px] md:w-[541px]">
        <div>
          <h1 className="text-[28px] font-bold text-blue-950">
            Volkswagen Golf
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
              <p>Type Car</p> <p className="text-neutral-600">Sedan</p>
            </li>
            <li className="flex justify-between">
              <p>Gear</p> <p className="text-neutral-600">Manuel</p>
            </li>
            <li className="flex justify-between">
              <p>HP</p> <p className="text-neutral-600">110</p>
            </li>
            <li className="flex justify-between">
              <p>Color</p> <p className="text-neutral-600">Blue</p>
            </li>
          </ul>
          <ul className="text-sm text-neutral-400 flex flex-col gap-3.5 md:w-full">
            <li className="flex justify-between">
              <p>Capacity</p> <p className="text-neutral-600">5 Persons</p>
            </li>
            <li className="flex justify-between">
              <p>Usage</p> <p className="text-neutral-600">7 L</p>
            </li>
            <li className="flex justify-between">
              <p>Fuel</p> <p className="text-neutral-600">Gasoline</p>
            </li>
            <li className="flex justify-between">
              <p>Laggage</p> <p className="text-neutral-600">2</p>
            </li>
          </ul>
        </div>
        <div className="card-actions flex-col items-start gap-5 md:flex-row md:justify-between">
          <p className="text-2xl font-bold ">
            € 50 / <span className="text-neutral-400 text-base">day</span>
          </p>
          <button className="btn btn-primary w-full text-sm mb-7 md:w-fit">
            Rent Now
          </button>
        </div>
      </div>

      <div id="map" className="h-[400px] flex w-[327px] rounded-sm "></div>
    </div>
  );
};

export default CarDetails;
