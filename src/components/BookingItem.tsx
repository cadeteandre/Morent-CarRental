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
    <div className="flex flex-col w-full max-w-[1440px] mb-8">
      <p className="font-bold text-left ml-6 mb-2">{pickupDate}</p>
      <div className="flex flex-col rounded-lg py-4 bg-white">
        <div className="flex flex-col rounded-xl px-6">
          <div className="flex gap-2 items-center sm:self-start">
            <Link to={`/details/${carId}`}>
              <img
                src={carImg}
                alt="Booking Car"
                className="max-w-[100px] rounded-xl"
              />
            </Link>
            <div className="text-left">
              <Link to={`/details/${carId}`}>
                <p className="font-bold">
                  {carBrand} {carModel}
                </p>
              </Link>
              <p className="font-extralight text-xs">
                {pickupDate} - {dropOffDate}
              </p>
              <p className="font-bold">
                {calculateTotalPrice(price, pickupDate, dropOffDate)} €
              </p>
            </div>
          </div>
          <hr className="w-full self-center my-4 opacity-50" />
          <div className="flex items-center gap-10">
            <div className="flex gap-4 px-2">
              <img src="/svg/pick-drop-icon.svg" alt="Pickup Drop-off Icon" />
              <div className="flex flex-col justify-between">
                <p className="text-xs">{pickupCity}</p>
                <p className="text-xs">{dropOffCity}</p>
              </div>
            </div>
            <LeafletMap pickupCity={pickupCity} mapNumber={mapNumber} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingItem;
