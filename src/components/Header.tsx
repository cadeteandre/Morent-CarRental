import { Link } from "react-router";
import ProfileDropDown from "./ProfileDropDown";
import { useContext, useEffect, useState } from "react";
import { mainContext } from "../context/MainProvider";
import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase/setupSupabase";
import { Tables } from "../utils/supabase/supabase";

type TSearchResult = Tables<"vehicles">;

const Header = () => {
  const { user } = useContext(mainContext) as {
    user: User | null;
  };
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TSearchResult[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const getSearchResults = async () => {
      if (input.length > 0) {
        const { data, error } = await supabase
          .from("vehicles")
          .select()
          .ilike("model", `%${input}%`);

        if (error) {
          console.error(error.message);
        }
        if (data) {
          setSearchResults(data);
        }
      }
    };

    getSearchResults();
  }, [input]);

  return (
    <header className="my-6 font-Jakarta-Bold px-6 md:px-14 xl:max-w-[1440px] xl:mx-auto ">
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
        <div className="w-full flex  flex-col dropdown justify-start items-center md:items-start">
          <label
            htmlFor="searchInput"
            className="input rounded-4xl w-full md:w-md"
          >
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
              type="text"
              className="font-Jakarta-Medium"
              required
              id="searchInput"
              value={input}
              onChange={(e) => handleChange(e)}
              placeholder="Search by car model"
            />{" "}
          </label>

          {input.length > 0 && (
            <div className="dropdown-content menu bg-base-100 rounded-lg z-1  w-52 p-2 shadow-sm mt-12  ml-12 self-start">
              {" "}
              <ul>
                {searchResults.length > 0 ? (
                  searchResults.map((singleCar: TSearchResult) => (
                    <Link to={`/details/${singleCar.id}`} key={singleCar.id}>
                      <li className="hover:bg-secondary hover:text-white p-2">
                        {singleCar.model}
                      </li>
                    </Link>
                  ))
                ) : (
                  <li>No results found.</li>
                )}
              </ul>{" "}
            </div>
          )}
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
