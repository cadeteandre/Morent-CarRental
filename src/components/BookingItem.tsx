import "leaflet/dist/leaflet.css";
import { Link } from "react-router";
import LeafletMap from "./LeafletMap";
import calculateTotalPrice from "../utils/functions/calculateTotalPrice";

interface IBookingItemProps {
  carId: string;
  carBrand: string;
  carModel: string;
  pickupDate: string;
  dropOffDate: string;
  price: number;
  pickupCity: string;
  dropOffCity: string;
  carImg: string;
  mapNumber: number;
}

const BookingItem: React.FC<IBookingItemProps> = ({
  carId,
  carBrand,
  carModel,
  pickupDate,
  dropOffDate,
  price,
  pickupCity,
  dropOffCity,
  carImg,
  mapNumber,
}) => {
  return (
    <div className="flex flex-col w-full  mb-8">
      <p className="font-bold text-left text-lg ml-6 mb-2">{pickupDate}</p>
      <div className="flex flex-col rounded-lg p-7 bg-white">
        <div className="flex gap-7 ">
          <Link
            to={`/details/${carId}`}
            className="  rounded-lg flex items-center justify-center  w-[100px] h-[80px] overflow-hidden "
          >
            <img
              src={carImg}
              alt="Booking Car"
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>
          <div className="flex flex-col gap-1.5  md:gap-2.5 items-start  font-Jakarta-SemiBold">
            <Link to={`/details/${carId}`}>
              <p className="font-bold font-Jakarta-SemiBold">
                {carBrand} {carModel}
              </p>
            </Link>
            <div className="text-xs text-neutral-500 flex flex-col items-start md:flex-row">
              <p>{pickupDate} - </p>
              <p>{dropOffDate}</p>
            </div>

            <p className="font-bold">
              {calculateTotalPrice(price, pickupDate, dropOffDate)} €
            </p>
          </div>
        </div>
        <hr className="w-full self-center my-4 opacity-50" />
        <div className="flex items-center gap-10">
          <div className="flex gap-4 px-2">
            <img src="/svg/pick-drop-icon.svg" alt="Pickup Drop-off Icon" />
            <div className="flex flex-col items-start justify-between">
              <p className="text-xs text-neutral-500">{pickupCity}</p>
              <p className="text-xs text-neutral-500">{dropOffCity}</p>
            </div>
          </div>
          <LeafletMap pickupCity={pickupCity} mapNumber={mapNumber} />
        </div>
      </div>
    </div>
  );
};

export default BookingItem;
