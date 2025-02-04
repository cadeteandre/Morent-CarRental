import ConsumptionIcon from "../assets/SVG/ConsumptionIcon";
import GearTypeIcon from "../assets/SVG/GearTypeIcon";
import HeartIcon from "../assets/SVG/HeartIcon";
import SeatIcon from "../assets/SVG/SeatIcon";

const AutoCard = () => {
  return (
    <div className="card bg-base-100 w-[327px] shadow-sm font-display ">
      {" "}
      <div className="card-body p-6">
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-bold text-base">Volkswagen Golf</h2>{" "}
          <button
            type="button"
            title="add to my Favorites"
            className="cursor-pointer"
          >
            {" "}
            <HeartIcon />
          </button>
        </div>
        <p className="text-neutral-400 font-bold text-[10.7px]">Sedan</p>

        <figure>
          <img
            src="https://res.cloudinary.com/dg1qeccqc/image/upload/v1712567777/Cars/Golf.webp	"
            alt="Volkswagen Golf"
          />
        </figure>

        <ul className="flex justify-between items-center mb-9">
          <li
            className="flex gap-1 items-center text-neutral-500"
            title="consumption"
          >
            <ConsumptionIcon />7
          </li>
          <li
            className="flex gap-1 items-center text-neutral-500"
            title="gear type"
          >
            <GearTypeIcon />
            Manuel
          </li>
          <li
            className="flex gap-1 items-center text-neutral-500"
            title="seats"
          >
            <SeatIcon />5
          </li>
        </ul>

        <div className="card-actions justify-end items-center">
          <p className="text-base font-bold ">
            € 50 / <span className="text-neutral-400 text-sm">day</span>
          </p>
          <button className="btn btn-primary  text-xs font-Jakarta-SemiBold">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoCard;
