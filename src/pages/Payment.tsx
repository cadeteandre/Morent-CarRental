const Payment = () => {
  return (
    <main>
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
              <label className="fieldset-label">Name</label>
              <input type="text" className="input" placeholder="Your name" />
            </div>
            <div>
              {" "}
              <label className="fieldset-label">Phone Number</label>
              <input type="tel" className="input" placeholder="Phone number" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div>
              {" "}
              <label className="fieldset-label">Address</label>
              <input type="text" className="input" placeholder="Address" />
            </div>
            <div>
              {" "}
              <label className="fieldset-label">Town / City</label>
              <input type="text" className="input" placeholder="Town or city" />
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
            <label className="fieldset-label">Locations</label>
            <input type="text" className="input" placeholder="Bremen" />
          </div>
          <div>
            {" "}
            <label className="fieldset-label">Date</label>
            <input type="date" className="input" />
          </div>
          <div>
            {" "}
            <label className="fieldset-label">Time</label>
            <input type="time" className="input" />
          </div>
        </div>
        <p>Drop – Off</p>
        <div className="flex flex-col md:flex-row md:flex-wrap">
          <div>
            <label className="fieldset-label">Locations</label>
            <input type="text" className="input" placeholder="Bremen" />
          </div>
          <div>
            {" "}
            <label className="fieldset-label">Date</label>
            <input type="date" className="input" />
          </div>
          <div>
            {" "}
            <label className="fieldset-label">Time</label>
            <input type="time" className="input" />
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
          <div>
            <input
              type="radio"
              name="paymentMethod"
              className="radio radio-primary"
              id="creditCard"
            />{" "}
            <label htmlFor="creditCard">Credit Card</label>
          </div>
          <div>
            <input
              type="radio"
              name="paymentMethod"
              className="radio radio-primary"
              id="PayPal"
            />{" "}
            <label htmlFor="PayPal">PayPal</label>
          </div>{" "}
          <div>
            <input
              type="radio"
              name="paymentMethod"
              className="radio radio-primary"
              id="Bitcoin"
            />{" "}
            <label htmlFor="Bitcoin">Bitcoin</label>
          </div>
        </div>
      </fieldset>
      {/* Confirmation */}
      {/* Rental Summary */}
      {/* Rent now! button */}
      {/* back btn für desktop version */}
    </main>
  );
};

export default Payment;
