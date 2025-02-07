import { useRef, useState } from "react";
import BackIcon from "../assets/SVG/BackIcon";
import BitcoinIcon from "../assets/SVG/BitcoinIcon";
import CreditCardIcon from "../assets/SVG/CreditCardIcon";
import PayPalIcon from "../assets/SVG/PayPalIcon";
import SecurityIcon from "../assets/SVG/SecurityIcon";
import { useNavigate } from "react-router";

const Payment = () => {
  const nameRef = useRef<HTMLInputElement>(null!);
  const phoneNumberRef = useRef<HTMLInputElement>(null!);
  const addressRef = useRef<HTMLInputElement>(null!);
  const townCityRef = useRef<HTMLInputElement>(null!);
  const pickUpLocationRef = useRef<HTMLInputElement>(null!);
  const pickUpDateRef = useRef<HTMLInputElement>(null!);
  const dropOffLocationRef = useRef<HTMLInputElement>(null!);
  const dropOffDateRef = useRef<HTMLInputElement>(null!);

  // const [success, setSuccess] = useState<string>("");
  // const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  async function handelRentNowButton() {
    const nameValue = nameRef.current?.value;
    const phoneNumberValue = phoneNumberRef.current?.value;
    const addressValue = addressRef.current?.value;
    const townCityValue = townCityRef.current?.value;
    const pickUpLocationValue = pickUpLocationRef.current?.value;
    const pickUpDateValue = pickUpDateRef.current?.value;
    const dropOffLocationValue = dropOffLocationRef.current?.value;
    const dropOffDateValue = dropOffDateRef.current?.value;

    console.log(
      "payment input values",
      nameValue,
      phoneNumberValue,
      addressValue,
      townCityValue,
      pickUpLocationValue,
      pickUpDateValue,
      dropOffLocationValue,
      dropOffDateValue
    );

    if (
      !nameValue ||
      !phoneNumberValue ||
      !addressValue ||
      !townCityValue ||
      !pickUpLocationValue ||
      !pickUpDateValue ||
      !dropOffLocationValue ||
      !dropOffDateValue
    ) {
      // setError("All required fields must be filled out.");
      // setSuccess("");
      return;
    }
  }

  return (
    <main className="font-display">
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
      <section className="flex flex-col gap-[30px] md:flex-row">
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
                    className="input bg-neutral-50  md:w-full"
                    id="yourName"
                    ref={nameRef}
                    placeholder="Your name"
                  />
                </div>
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
                    className="input bg-neutral-50 md:w-full"
                    id="phoneNumber"
                    ref={phoneNumberRef}
                    placeholder="Phone number"
                  />
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
                    className="input bg-neutral-50 md:w-full"
                    id="YourAddress"
                    ref={addressRef}
                    placeholder="Address"
                  />
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
                    className="input bg-neutral-50 md:w-full"
                    id="townOrCity"
                    ref={townCityRef}
                    placeholder="Town or city"
                  />
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
                    type="text"
                    className="input  bg-neutral-50 md:w-full"
                    ref={pickUpLocationRef}
                    id="pickUpLocation"
                    placeholder="Bremen"
                  />
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
                    className="input  bg-neutral-50 md:w-full"
                  />
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
                  className="input  bg-neutral-50 md:w-[354px]"
                />
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
                    type="text"
                    className="input  bg-neutral-50 md:w-full"
                    id="dropOffLocation"
                    ref={dropOffLocationRef}
                    placeholder="Bremen"
                  />
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
                    className="input  bg-neutral-50 md:w-full"
                  />
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
                  className="input  bg-neutral-50 md:w-[354px]"
                />
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
              <div className="flex  items-center gap-2.5  bg-neutral-50 rounded-md  p-[15px]">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio radio-primary  radio-xs"
                  id="creditCard"
                />{" "}
                <label
                  className="flex justify-between items-center w-full text-neutral-800 text-base"
                  htmlFor="creditCard"
                >
                  Credit Card <CreditCardIcon />
                </label>
              </div>
              <div className="flex items-center gap-2.5  bg-neutral-50 rounded-md  p-[15px] ">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio radio-primary radio-xs"
                  id="PayPal"
                />{" "}
                <label
                  className="flex justify-between items-center w-full text-neutral-800 text-base"
                  htmlFor="PayPal"
                >
                  PayPal <PayPalIcon />
                </label>
              </div>{" "}
              <div className="flex items-center  gap-2.5  bg-neutral-50 rounded-md  p-[15px]">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio radio-primary radio-xs"
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
              <label className="fieldset-label text-neutral-800 text-sm  bg-neutral-50 rounded-md  p-[15px] items-start ">
                <input
                  type="checkbox"
                  name="checkboxMarketing"
                  className="checkbox  checkbox-xs mr-2.5 "
                />
                I agree with sending marketing and newsletter emails. No spam,
                promised!
              </label>
              <label className="fieldset-label text-neutral-800 text-sm  bg-neutral-50 rounded-md  p-[15px] items-start ">
                <input
                  type="checkbox"
                  name="checkboxPolicy"
                  className="checkbox checkbox-xs mr-2.5"
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
              <figure className="size-20 rounded-md overflow-hidden flex items-center justify-center">
                <img
                  className="w-full h-full object-contain "
                  src="https://res.cloudinary.com/dg1qeccqc/image/upload/v1712567777/Cars/Golf.webp"
                />
              </figure>

              <div className="flex flex-col ">
                <h1 className="text-lg font-bold text-neutral-800">
                  Ford Transit
                </h1>
                <div className="flex items-center gap-2.5">
                  <p className="text-lg text-amber-400">★★★☆☆</p>
                  <p className="text-sm text-neutral-500">2 Reviewer</p>
                </div>
              </div>
            </div>
            <div className="divider h-[1px]"></div>
            <div className="mb-5">
              <div
                className="flex justify-between items-center mb-5
              "
              >
                <p>Price per Day</p> <p>€100</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Tax</p> <p>€0</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Rent now! button */}
      <button
        onClick={handelRentNowButton}
        className="btn btn-primary  text-xs font-Jakarta-SemiBold mt-8"
      >
        Rent Now!
      </button>
    </main>
  );
};

export default Payment;
