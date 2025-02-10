import { useContext, useEffect, useRef, useState } from "react";
import BackIcon from "../assets/SVG/BackIcon";
import BitcoinIcon from "../assets/SVG/BitcoinIcon";
import CreditCardIcon from "../assets/SVG/CreditCardIcon";
import PayPalIcon from "../assets/SVG/PayPalIcon";
import SecurityIcon from "../assets/SVG/SecurityIcon";
import { useNavigate } from "react-router";
import { supabase } from "../utils/supabase/setupSupabase";
import { Tables } from "../utils/supabase/supabase";
import { mainContext } from "../context/MainProvider";
import { User } from "@supabase/supabase-js";
import { Vehicle } from "./Home";
import { TVehicleDetail } from "./Details";
import fetchReviewsByCar from "../utils/functions/fetchReviewsByCar";
import { IReview } from "../interfaces/IReview";
import getStarRating, { calculateAverage } from "../utils/functions/getStarRating";
import calculateTotalPrice, { calculateTax, diffInDaysConversor } from "../utils/functions/calculateTotalPrice";

type Booking = Tables<"bookings">;

interface Data {
  name: string | null;
  id: string;
}

const Payment = () => {
  const nameRef = useRef<HTMLInputElement>(null!);
  const phoneNumberRef = useRef<HTMLInputElement>(null!);
  const addressRef = useRef<HTMLInputElement>(null!);
  const townCityRef = useRef<HTMLInputElement>(null!);
  const pickUpLocationRef = useRef<HTMLInputElement>(null!);
  const pickUpDateRef = useRef<HTMLInputElement>(null!);
  const pickUpTimeRef = useRef<HTMLInputElement>(null!);
  const dropOffLocationRef = useRef<HTMLInputElement>(null!);
  const dropOffDateRef = useRef<HTMLInputElement>(null!);
  const dropOffTimeRef = useRef<HTMLInputElement>(null!);
  const navigate = useNavigate();
  const [locations, setLocations] = useState<Data[]>([]);
  const [error, setError] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const { user, selectedCar } = useContext(mainContext) as {
    user: User;
    selectedCar: Vehicle | TVehicleDetail;
  };
  const [reviews, setReviews] = useState<IReview[]>([]);
  const reviewsStars: number = calculateAverage(
    reviews.map((singleReview) => singleReview.stars)
  );
  const carId = selectedCar?.id;
  const [pickupDate, setPickupDate] = useState<string>('');
  const [dropoffDate, setDropoffDate] = useState<string>('');

  async function fetchLocations() {
    const { data, error } = await supabase.from("locations").select("*");
    if (error) {
      console.error(
        "es ist ein Fehler beim fetchen der Locations aufgetreten: ",
        error
      );
    } else {
      setLocations(data);
    }
  }

  useEffect(() => {
    fetchLocations();
    fetchReviewsByCar(carId, setReviews);
  }, [carId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const pickUpLocationValue = pickUpLocationRef.current?.value;
    const pickUpDateValue = pickUpDateRef.current?.value;

    const dropOffLocationValue = dropOffLocationRef.current?.value;
    const dropOffDateValue = dropOffDateRef.current?.value;

    if (formRef.current && formRef.current.checkValidity()) {
      const pickUpLocationUUID = locations?.find(
        (location) => location.name === pickUpLocationValue
      )?.id as string;
      const dropOffLocationUUID = locations?.find(
        (location) => location.name === dropOffLocationValue
      )?.id as string;

      const newBooking: Pick<
        Booking,
        | "profile_id"
        | "vehicle_id"
        | "location_start"
        | "location_end"
        | "start_date"
        | "end_date"
        | "price"
      > = {
        profile_id: user.id,
        location_start: pickUpLocationUUID,
        location_end: dropOffLocationUUID,
        start_date: pickUpDateValue,
        end_date: dropOffDateValue,
        vehicle_id: selectedCar?.id,
        price: Number(
          calculateTotalPrice(
            selectedCar.price_per_day,
            pickUpDateValue,
            dropOffDateValue
          )
        ),
      };

      const { data, error } = await supabase
        .from("bookings")
        .insert(newBooking)
        .select();

      if (error) {
        setError(error.message);
        nameRef.current.value = "";
        phoneNumberRef.current.value = "";
        addressRef.current.value = "";
        townCityRef.current.value = "";
        pickUpLocationRef.current.value = "";
        pickUpDateRef.current.value = "";
        pickUpTimeRef.current.value = "";
        dropOffLocationRef.current.value = "";
        dropOffDateRef.current.value = "";
        dropOffTimeRef.current.value = "";
      }
      if (data) {
        setError("");

        navigate("/payment_confirmed");
        nameRef.current.value = "";
        phoneNumberRef.current.value = "";
        addressRef.current.value = "";
        townCityRef.current.value = "";
        pickUpLocationRef.current.value = "";
        pickUpDateRef.current.value = "";
        pickUpTimeRef.current.value = "";
        dropOffLocationRef.current.value = "";
        dropOffDateRef.current.value = "";
        dropOffTimeRef.current.value = "";
      }
    } else {
      formRef.current?.reportValidity();
      setError("All required fields must be filled out.");
      nameRef.current.value = "";
      phoneNumberRef.current.value = "";
      addressRef.current.value = "";
      townCityRef.current.value = "";
      pickUpLocationRef.current.value = "";
      pickUpDateRef.current.value = "";
      pickUpTimeRef.current.value = "";
      dropOffLocationRef.current.value = "";
      dropOffDateRef.current.value = "";
      dropOffTimeRef.current.value = "";
    }
  }
  console.log(pickupDate, dropoffDate);
  return (
    <form onSubmit={handleSubmit} ref={formRef} className="font-display">
      {/* back btn für desktop version */}
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
        className="tab p-0 justify-start items-center text-base mb-12  hidden md:flex"
      >
        <BackIcon /> Back
      </button>
      <section className="flex flex-col gap-[30px] md:flex-row md:justify-between">
        <div className="flex flex-col gap-[30px] md:w-3xl">
          {/* Billing Info */}
          <fieldset className="fieldset w-xs bg-white  p-5 rounded-lg md:w-full ">
            <div className="flex items-center justify-between">
              {" "}
              <h1 className="text-2xl font-bold text-neutral-800">
                Billing Info
              </h1>
              <p className="text-sm text-neutral-500">Step 1 of 4</p>
            </div>
            <p className="text-sm text-neutral-500 mb-5">
              {" "}
              Please enter your billing info
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5 md:flex-row ">
                <div className="md:w-full">
                  <label
                    htmlFor="yourName"
                    className="fieldset-label  text-neutral-800 text-sm mb-[5px]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="input validator bg-neutral-50  md:w-full"
                    id="yourName"
                    ref={nameRef}
                    placeholder="Your name"
                    required
                  />
                  <div className="validator-hint">Enter valid name</div>
                </div>{" "}
                <div className="md:w-full">
                  {" "}
                  <label
                    htmlFor="phoneNumber"
                    className="fieldset-label text-neutral-800 text-sm mb-[5px]"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="input  validator required  bg-neutral-50 md:w-full"
                    id="phoneNumber"
                    ref={phoneNumberRef}
                    required
                    placeholder="Phone number"
                  />
                  <div className="validator-hint">Enter valid Phone number</div>
                </div>
              </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="md:w-full">
                  {" "}
                  <label
                    htmlFor="YourAddress"
                    className="fieldset-label text-neutral-800 text-sm mb-[5px]"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="input validator  bg-neutral-50 md:w-full"
                    id="YourAddress"
                    ref={addressRef}
                    placeholder="Address"
                    required
                  />
                  <div className="validator-hint">Enter valid address</div>
                </div>
                <div className="md:w-full">
                  {" "}
                  <label
                    htmlFor="townOrCity"
                    className="fieldset-label text-neutral-800 text-sm mb-[5px]"
                  >
                    Town / City
                  </label>
                  <input
                    type="text"
                    className="input validator bg-neutral-50 md:w-full"
                    id="townOrCity"
                    ref={townCityRef}
                    required
                    placeholder="Town or city"
                  />
                  <div className="validator-hint">Enter valid town or city</div>
                </div>
              </div>
            </div>
          </fieldset>
          {/* Rental Info */}
          <fieldset className="fieldset w-xs bg-white  p-5 rounded-lg md:w-full">
            <div className="flex items-center justify-between">
              {" "}
              <h1 className="text-2xl font-bold text-neutral-800">
                Rental Info
              </h1>
              <p className="text-sm text-neutral-500">Step 2 of 4</p>
            </div>
            <p className="text-sm text-neutral-500 mb-5">
              Please select your rental date
            </p>
            <p className="text-base mb-5">Pick – Up</p>

            <div className="flex flex-col gap-5 ">
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="md:w-full">
                  <label
                    htmlFor="pickUpLocation"
                    className="fieldset-label text-neutral-800 text-sm mb-[5px]"
                  >
                    Locations
                  </label>
                  <input
                    list="pickUpLocations"
                    className="input validator bg-neutral-50 md:w-full"
                    ref={pickUpLocationRef}
                    id="pickUpLocation"
                    placeholder="Bremen"
                    required
                  />{" "}
                  <div className="validator-hint">Enter valid Location</div>
                  <datalist id="pickUpLocations">
                    {locations?.length > 0 &&
                      locations?.map((location, i) => (
                        <option value={location.name as string} key={i}>
                          {location.name}
                        </option>
                      ))}
                  </datalist>
                </div>
                <div className="md:w-full">
                  {" "}
                  <label
                    htmlFor="pickUpDate"
                    className="fieldset-label text-neutral-800 text-sm mb-[5px]"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="pickUpDate"
                    ref={pickUpDateRef}
                    className="input validator bg-neutral-50 md:w-full"
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                  />
                  <div className="validator-hint">Enter valid Date</div>
                </div>
              </div>
              <div className="md:w-full">
                {" "}
                <label
                  htmlFor="pickUpTime"
                  className="fieldset-label text-neutral-800 text-sm mb-[5px]"
                >
                  Time
                </label>
                <input
                  type="time"
                  id="pickUpTime"
                  ref={pickUpTimeRef}
                  required
                  className="input validator bg-neutral-50 md:w-[354px]"
                />
                <div className="validator-hint">Enter valid Time</div>
              </div>
            </div>
            <p className="text-base my-5">Drop – Off</p>
            <div className="flex flex-col gap-5 ">
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="md:w-full">
                  <label
                    htmlFor="dropOffLocation"
                    className="fieldset-label text-neutral-800 text-sm mb-[5px]"
                  >
                    Locations
                  </label>
                  <input
                    list="dropOffLocations"
                    className="input validator bg-neutral-50 md:w-full"
                    id="dropOffLocation"
                    ref={dropOffLocationRef}
                    placeholder="Bremen"
                    required
                  />
                  <div className="validator-hint">Enter valid Location</div>
                  <datalist id="dropOffLocations">
                    {locations?.length > 0 &&
                      locations?.map((location, i) => (
                        <option value={location.name as string} key={i}>
                          {location.name}
                        </option>
                      ))}
                  </datalist>
                </div>
                <div className="md:w-full">
                  {" "}
                  <label
                    htmlFor="dropOffDate"
                    className="fieldset-label text-neutral-800 text-sm mb-[5px]"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="dropOffDate"
                    ref={dropOffDateRef}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    required
                    className="input validator bg-neutral-50 md:w-full"
                  />
                  <div className="validator-hint">Enter valid Date</div>
                </div>
              </div>
              <div className="md:w-full">
                {" "}
                <label
                  className="fieldset-label text-neutral-800 text-sm mb-[5px]"
                  htmlFor="dropOffTime"
                >
                  Time
                </label>
                <input
                  type="time"
                  id="dropOffTime"
                  ref={dropOffTimeRef}
                  required
                  className="input validator bg-neutral-50 md:w-[354px]"
                />
                <div className="validator-hint">Enter valid Time</div>
              </div>
            </div>
          </fieldset>
          {/* Payment Method */}
          <fieldset className="fieldset w-xs bg-white  p-5 rounded-lg md:w-full ">
            <div className="flex items-center justify-between">
              {" "}
              <h1 className="text-2xl font-bold text-neutral-800">
                Payment Method
              </h1>
              <p className="text-sm text-neutral-500">Step 3 of 4</p>
            </div>
            <p className="text-sm text-neutral-500 mb-5">
              Please enter your payment method
            </p>
            <div className="flex flex-col gap-5 ">
              <div className="flex  items-center gap-2.5  bg-neutral-50 rounded-lg  p-[15px]">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio validator  radio-primary  radio-xs"
                  required
                  id="creditCard"
                />{" "}
                <label
                  className="flex justify-between items-center w-full text-neutral-800 text-base"
                  htmlFor="creditCard"
                >
                  Credit Card <CreditCardIcon />
                </label>
              </div>
              <div className="flex items-center gap-2.5  bg-neutral-50 rounded-lg  p-[15px] ">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio validator radio-primary radio-xs"
                  required
                  id="PayPal"
                />{" "}
                <label
                  className="flex justify-between items-center w-full text-neutral-800 text-base"
                  htmlFor="PayPal"
                >
                  PayPal <PayPalIcon />
                </label>
              </div>{" "}
              <div className="flex items-center  gap-2.5  bg-neutral-50 rounded-lg  p-[15px]">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio validator radio-primary radio-xs"
                  required
                  id="Bitcoin"
                />{" "}
                <label
                  className="flex justify-between items-center w-full text-neutral-800 text-base"
                  htmlFor="Bitcoin"
                >
                  Bitcoin <BitcoinIcon />
                </label>
              </div>
            </div>
          </fieldset>
          {/* Confirmation */}
          <fieldset className="fieldset w-xs bg-white  p-5 rounded-lg md:w-full ">
            <div className="flex items-center justify-between">
              {" "}
              <h1 className="text-2xl font-bold text-neutral-800">
                Confirmation
              </h1>
              <p className="text-sm text-neutral-500">Step 4 of 4</p>
            </div>
            <p className="text-sm text-neutral-500 mb-5">
              We are getting to the end. Just a few clicks and your rental is
              ready!
            </p>
            <div className="flex flex-col gap-5 ">
              <label className="fieldset-label text-neutral-800 text-sm  bg-neutral-50 rounded-lg  p-[15px] items-start ">
                <input
                  type="checkbox"
                  name="checkboxMarketing"
                  className="checkbox  checkbox-xs mr-2.5 "
                />
                I agree with sending marketing and newsletter emails. No spam,
                promised!
              </label>
              <label className="fieldset-label text-neutral-800 text-sm  bg-neutral-50 rounded-lg  p-[15px] items-start ">
                <input
                  type="checkbox"
                  name="checkboxPolicy"
                  required
                  className="checkbox validator checkbox-xs mr-2.5"
                />
                I agree with our terms and conditions and privacy policy.
              </label>
            </div>
            <div className="mt-5 text-neutral-400 text-sm">
              <SecurityIcon />
              <p className="mt-6">All your data are safe</p>
              <p>
                We are using the most advanced security to provide you the best
                experience ever.
              </p>
            </div>
          </fieldset>
        </div>
        {/* Rental Summary */}
        {selectedCar ? (
          <div className="card w-xs h-fit bg-white    p-5 rounded-lg md:w-md ">
            <h1 className="text-2xl font-bold text-neutral-800">
              Rental Summary
            </h1>
            <p className="text-sm text-neutral-500 mb-5">
              Prices may change depending on the length of the rental and the
              price of your rental car.
            </p>
            <div className="flex w-full flex-col">
              <div className=" flex flex-row items-center gap-5  w-full">
                <figure className="size-20 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    className="w-full h-full object-contain "
                    src={
                      selectedCar.car_img
                        ? selectedCar.car_img
                        : `/images/img_placeholder.png`
                    }
                  />
                </figure>

                <div className="flex flex-col ">
                  <h1 className="text-lg font-bold text-neutral-800">
                    {`${selectedCar.brand.name} ${selectedCar.model}`}
                  </h1>
                  <div className="flex items-center gap-2.5">
                    <p className="text-lg text-amber-400">
                      {getStarRating(reviewsStars)}
                    </p>
                    <p className="text-sm text-neutral-500">{`${reviews.length} Reviewer`}</p>
                  </div>
                </div>
                <div className="divider h-[1px]"></div>
                <div className="mb-5">
                  <div
                    className="flex justify-between items-center mb-5
                "
                >
                  <p>Price per Day</p> <p>€ {selectedCar.price_per_day}</p>
                </div>
                <div className="flex justify-between items-center mb-5">
                  <p>Tax</p> <p>{`€ ${
                  selectedCar.price_per_day && 
                  pickupDate &&
                  dropoffDate ? calculateTax(selectedCar.price_per_day, diffInDaysConversor(pickupDate, dropoffDate), 0.19) : 0}`}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p>Total Price</p>
                  <p>{`€ ${
                  selectedCar.price_per_day && 
                  pickupDate &&
                  dropoffDate ? calculateTotalPrice(selectedCar.price_per_day, pickupDate, dropoffDate) : selectedCar.price_per_day}`}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card text-center w-xs h-fit bg-white p-5 gap-6 rounded-lg md:w-sm">
            <h1 className="text-2xl font-bold text-neutral-800">
              Rental Summary
            </h1>
            <p>No car selected</p>
          </div>
        )}
      </section>
      {/* Rent now! button */}
      <button
        type="submit"
        className="btn btn-primary  text-xs font-Jakarta-SemiBold mt-8"
      >
        Rent Now!
      </button>
      {error.length > 0 && (
        <div role="alert" className="alert alert-error alert-soft">
          <span>{error}</span>
        </div>
      )}
    </form>
  );
};

export default Payment;
