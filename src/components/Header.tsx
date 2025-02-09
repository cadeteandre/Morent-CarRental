import { Link } from "react-router";

const Header = () => {
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
            <div className="dropdown dropdown-end ">
              <div tabIndex={0} role="button" className="btn btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Profile icon" src="/svg/profile-icon.svg" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 py-2 px-6 shadow"
              >
                <h1 className="text-xl font-bold">Hi, Max</h1>
                <li>
                  <Link to={"/"}>
                    <img
                      src="/svg/profile-dropdown-icon.svg"
                      alt="Profile Icon"
                    />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to={"/my_bookings"}>
                    <img
                      src="/svg/my-bookings-icon.svg"
                      alt="My Bookings Icon"
                    />
                    My Bookings
                  </Link>
                </li>
                <li>
                  <Link to={"/favorites"}>
                    <img src="/svg/favorites-icon.svg" alt="Favorites Icon" />
                    Favorites
                  </Link>
                </li>
                <hr className="w-40 self-center my-4" />
                <li>
                  <button className="btn bg-blue-600 text-white">Logout</button>
                </li>
              </ul>
            </div>
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
              placeholder="Search something here"
            />
          </label>
        </div>
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
          <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="btn btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Profile icon" src="/svg/profile-icon.svg" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 py-2 px-6 shadow"
            >
              <h1 className="text-xl font-bold">Hi, Max</h1>
              <li>
                <Link to={"/"}>
                  <img
                    src="/svg/profile-dropdown-icon.svg"
                    alt="Profile Icon"
                  />
                  Profile
                </Link>
              </li>
              <li>
                <Link to={"/my_bookings"}>
                  <img src="/svg/my-bookings-icon.svg" alt="My Bookings Icon" />
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to={"/favorites"}>
                  <img src="/svg/favorites-icon.svg" alt="Favorites Icon" />
                  Favorites
                </Link>
              </li>
              <hr className="w-40 self-center my-4" />
              <li>
                <button className="btn bg-blue-600 text-white">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
