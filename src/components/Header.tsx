import { Link } from "react-router";

const Header = () => {
    return (  
        <header className="my-6">
            <nav className="navbar bg-base-100">
                <div className="flex-1 flex-wrap px-4">
                    <Link to={'/'} className="btn btn-ghost text-2xl text-blue-600">MORENT</Link>
                    <label className="input rounded-4xl mt-4 sm:mt-0 relative left-7 top-4 -translate-y-1/2 sm:relative sm:top-auto sm:left-auto sm:translate-y-0">
                        <svg className="h-[1.8em] opacity-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                        <input type="search" required placeholder="Search something here" />
                    </label>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-circle border bg-transparent hidden sm:flex">
                        <div className="indicator">
                            <img src="/svg/notification-icon.svg" alt="notification icon" />
                            <span className="badge badge-xs bg-red-600 indicator-item rounded-full"></span>
                        </div>
                    </button>
                    <button className="btn btn-circle border bg-transparent hidden sm:flex">
                        <div className="indicator">
                            <img src="/svg/settings-icon.svg" alt="notification icon" />
                        </div>
                    </button>
                    <div className="dropdown dropdown-end relative right-4 top-3/4 -translate-y-3/4 sm:relative sm:top-auto sm:right-auto sm:translate-y-0">
                        <div tabIndex={0} role="button" className="btn btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img alt="Profile icon" src="/svg/profile-icon.svg" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 py-2 px-6 shadow">
                            <h1 className="text-xl font-bold">Hi, Max</h1>
                            <li>
                                <Link to={'/profile'}>
                                    <img src="/svg/profile-dropdown-icon.svg" alt="Profile Icon" />
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to={'/my_bookings'}>
                                    <img src="/svg/my-bookings-icon.svg" alt="My Bookings Icon" />
                                    My Bookings
                                </Link>
                            </li>
                            <li>
                                <Link to={'/favorites'}>
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
}

export default Header;