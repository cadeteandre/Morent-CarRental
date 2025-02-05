import BackIcon from "../assets/SVG/BackIcon";
import BitcoinIcon from "../assets/SVG/BitcoinIcon";
import CreditCardIcon from "../assets/SVG/CreditCardIcon";
import PayPalIcon from "../assets/SVG/PayPalIcon";
import SecurityIcon from "../assets/SVG/SecurityIcon";

const Payment = () => {
  return (
    <main>
      {/* back btn für desktop version */}
      <a role="tab" className="tab  justify-start items-center hidden md:flex">
        <BackIcon /> Back
      </a>
      {/* Billing Info */}
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box md:w-full ">
        <div className="flex items-center justify-between">
          {" "}
          <h1 className="text-[28px] font-bold text-blue-950">Billing Info</h1>
          <p>Step 1 of 4</p>
        </div>
        <p>Please enter your billing info</p>
        <div className="flex flex-col ">
          <div className="flex flex-col md:flex-row">
            <div>
              <label htmlFor="yourName" className="fieldset-label">
                Name
              </label>
              <input
                type="text"
                className="input"
                id="yourName"
                placeholder="Your name"
              />
            </div>
            <div>
              {" "}
              <label htmlFor="phoneNumber" className="fieldset-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="input"
                id="phoneNumber"
                placeholder="Phone number"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div>
              {" "}
              <label htmlFor="YourAddress" className="fieldset-label">
                Address
              </label>
              <input
                type="text"
                className="input"
                id="YourAddress"
                placeholder="Address"
              />
            </div>
            <div>
              {" "}
              <label htmlFor="townOrCity" className="fieldset-label">
                Town / City
              </label>
              <input
                type="text"
                className="input"
                id="townOrCity"
                placeholder="Town or city"
              />
            </div>
          </div>
        </div>
      </fieldset>
      {/* Rental Info */}
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box md:w-full">
        <div className="flex items-center justify-between">
          {" "}
          <h1 className="text-[28px] font-bold text-blue-950">Rental Info</h1>
          <p>Step 2 of 4</p>
        </div>
        <p>Please select your rental date</p>
        <p>Pick – Up</p>

        <div className="flex flex-col md:flex-row md:flex-wrap">
          <div>
            <label htmlFor="pickUpLocation" className="fieldset-label">
              Locations
            </label>
            <input
              type="text"
              className="input"
              id="pickUpLocation"
              placeholder="Bremen"
            />
          </div>
          <div>
            {" "}
            <label htmlFor="pickUpDate" className="fieldset-label">
              Date
            </label>
            <input type="date" id="pickUpDate" className="input" />
          </div>
          <div>
            {" "}
            <label htmlFor="pickUpTime" className="fieldset-label">
              Time
            </label>
            <input type="time" id="pickUpTime" className="input" />
          </div>
        </div>
        <p>Drop – Off</p>
        <div className="flex flex-col md:flex-row md:flex-wrap">
          <div>
            <label htmlFor="dropOffLocation" className="fieldset-label">
              Locations
            </label>
            <input
              type="text"
              className="input"
              id="dropOffLocation"
              placeholder="Bremen"
            />
          </div>
          <div>
            {" "}
            <label htmlFor="dropOffDate" className="fieldset-label">
              Date
            </label>
            <input type="date" id="dropOffDate" className="input" />
          </div>
          <div>
            {" "}
            <label className="fieldset-label" htmlFor="dropOffTime">
              Time
            </label>
            <input type="time" id="dropOffTime" className="input" />
          </div>
        </div>
      </fieldset>
      {/* Payment Method */}
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box md:w-full ">
        <div className="flex items-center justify-between">
          {" "}
          <h1 className="text-[28px] font-bold text-blue-950">
            Payment Method
          </h1>
          <p>Step 3 of 4</p>
        </div>
        <p>Please enter your payment method</p>
        <div className="flex flex-col ">
          <div className="flex ">
            <input
              type="radio"
              name="paymentMethod"
              className="radio radio-primary  radio-xs"
              id="creditCard"
            />{" "}
            <label
              className="flex justify-between items-center w-full"
              htmlFor="creditCard"
            >
              Credit Card <CreditCardIcon />
            </label>
          </div>
          <div className="flex ">
            <input
              type="radio"
              name="paymentMethod"
              className="radio radio-primary radio-xs"
              id="PayPal"
            />{" "}
            <label
              className="flex justify-between items-center w-full"
              htmlFor="PayPal"
            >
              PayPal <PayPalIcon />
            </label>
          </div>{" "}
          <div className="flex ">
            <input
              type="radio"
              name="paymentMethod"
              className="radio radio-primary radio-xs"
              id="Bitcoin"
            />{" "}
            <label
              className="flex justify-between items-center w-full"
              htmlFor="Bitcoin"
            >
              Bitcoin <BitcoinIcon />
            </label>
          </div>
        </div>
      </fieldset>
      {/* Confirmation */}
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box md:w-full ">
        <div className="flex items-center justify-between">
          {" "}
          <h1 className="text-[28px] font-bold text-blue-950">Confirmation</h1>
          <p>Step 4 of 4</p>
        </div>
        <p>
          We are getting to the end. Just a few clicks and your rental is ready!
        </p>
        <div className="flex flex-col ">
          <label className="fieldset-label">
            <input
              type="checkbox"
              name="checkboxMarketing"
              className="checkbox  checkbox-xs"
            />
            I agree with sending marketing and newsletter emails. No spam,
            promised!
          </label>
          <label className="fieldset-label">
            <input
              type="checkbox"
              name="checkboxPolicy"
              className="checkbox checkbox-xs"
            />
            I agree with our terms and conditions and privacy policy.
          </label>
        </div>
        <div>
          <SecurityIcon />
          <p>All your data are safe</p>
          <p>
            We are using the most advanced security to provide you the best
            experience ever.
          </p>
        </div>
      </fieldset>

      {/* Rental Summary */}
      <div className="card w-xs bg-base-200 border border-base-300 p-4 rounded-box md:w-full">
        <h1 className="text-[28px] font-bold text-blue-950">Confirmation</h1>
        <p>
          Prices may change depending on the length of the rental and the price
          of your rental car.
        </p>
        <div className="flex w-full flex-col">
          <div className=" flex flex-row items-center">
            <img
              className="size-10 rounded-full "
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />

            <div className="flex flex-col gap-3.5 w-full">
              <div className="flex flex-row justify-between items-center ">
                <p className="text-[18.7px] font-bold">Olivia King</p>{" "}
                <div>
                  <p className="text-neutral-400">2024.09.02</p>
                  <p className="text-lg text-amber-400">★★★☆☆</p>
                </div>
              </div>

              <p className=" text-sm opacity-60">
                Comfortable and stylish, this car is perfect for long drives.
                (Model: Volkswagen Golf)
              </p>
            </div>
          </div>
          <div className="divider h-[1px]"></div>
          <div>
            <div className="flex justify-between items-center">
              <p>Price per Day</p> <p>€100</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Tax</p> <p>€0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rent now! button */}
      <button className="btn btn-primary  text-xs font-Jakarta-SemiBold">
        Rent Now!
      </button>
    </main>
  );
};

export default Payment;
