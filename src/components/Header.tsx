import { Link } from "react-router";
import ProfileDropDown from "./ProfileDropDown";
import { useContext } from "react";
import { mainContext } from "../context/MainProvider";
import { User } from "@supabase/supabase-js";

const Header = () => {
  const { user } = useContext(mainContext) as {
    user: User | null;
  };

  return (
    <header className="my-6 font-Jakarta-Bold ">
      <nav className="navbar bg-base-100  flex flex-col gap-8 items-center justify-center  md:flex-row md:justify-between">
        <div className="flex items-center justify-between w-full md:w-fit">
          {" "}
          <Link
            to={"/"}
            className="btn btn-ghost text-2xl text-primary md:text-3xl "
          >
            MORENT
          </Link>
          <div className="mobile-icon flex gap-5 md:hidden">
            {user ? (
              <ProfileDropDown />
            ) : (
              <Link
                to={"/login"}
                className="btn bg-primary text-white  md:hidden"
              >
                Login
              </Link>
            )}
          </div>
        </div>{" "}
        <div className="w-full flex justify-center md:justify-start">
          <label htmlFor="searchInput" className="input rounded-4xl w-md ">
            <svg
              className="h-[1.8em] opacity-30"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="font-Jakarta-Medium"
              required
              id="searchInput"
              placeholder="Search by car brand or model"
            />
          </label>
        </div>
        {user ? (
          <div className="desktop-icons  gap-5 hidden md:flex ">
            <button className="btn btn-circle border bg-transparent hidden md:flex ">
              <div className="indicator">
                <img src="/svg/notification-icon.svg" alt="notification icon" />
                <span className="badge badge-xs bg-red-600 indicator-item rounded-full"></span>
              </div>
            </button>

            <button className="btn btn-circle border bg-transparent hidden md:flex ">
              <div>
                <img src="/svg/settings-icon.svg" alt="setting icon" />
              </div>
            </button>
            <ProfileDropDown />
          </div>
        ) : (
          <Link
            to={"/login"}
            className="btn bg-primary text-white hidden md:flex"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
