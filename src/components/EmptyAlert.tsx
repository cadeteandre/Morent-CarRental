import { FC } from "react";
import { Link } from "react-router";

interface EmptyAlertProps {
  text: string;
}
const EmptyAlert: FC<EmptyAlertProps> = ({ text }) => {
  return (
    <div role="alert" className="alert alert-vertical sm:alert-horizontal mt-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>{text}</span>
      <div>
        <Link to={"/"}>
          {" "}
          <button className="btn btn-sm btn-primary">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyAlert;
