import { Link } from "react-router";

const PaymentConfirmed = () => {
  return (
    <section>
      <div className="hero bg-base-200 min-h-screen font-Jakarta-SemiBold">
        <div className="hero-content text-center">
          <div className="max-w-md flex flex-col justify-center items-center">
            <figure className="w-28 h-w-28">
              <svg
                viewBox="0 0 329 329"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M164.19 328.379C254.869 328.379 328.379 254.869 328.379 164.19C328.379 73.5102 254.869 0 164.19 0C73.5102 0 0 73.5102 0 164.19C0 254.869 73.5102 328.379 164.19 328.379Z"
                  fill="#4BD37B"
                />
                <path
                  d="M240.811 65.6758L125.879 183.892L87.5677 144.487L49.2568 183.892L125.879 262.703L279.122 105.081L240.811 65.6758Z"
                  fill="white"
                />
              </svg>
            </figure>
            <h1 className="text-2xl font-bold mt-7">
              Payment and Booking
              <br />
              done Successfully!
            </h1>
            <p className="py-6">
              You will receive notification SMS and Email soon.
            </p>
            <Link to={"/"}>
              {" "}
              <button className="btn btn-primary">Home</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentConfirmed;
