import { useContext, useEffect, useState } from "react";
import { mainContext } from "../context/MainProvider";
import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase/setupSupabase";
import { Link } from "react-router";

const ProfileDropDown = () => {
  const { user, setUser } = useContext(mainContext) as {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
  };
  const [profileURL, setProfileURL] = useState<string | null>("");
  async function getProfileImgURL() {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", `${user?.id}`)
      .single();

    if (error) {
      console.error(error);
    }
    if (data) {
      setProfileURL(data.img_url);
    }
  }

  useEffect(() => {
    getProfileImgURL();
  }, []);

  async function handleLogOutButton() {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    setUser(null);
  }
  return (
    <div className="dropdown dropdown-end ">
      <div tabIndex={0} role="button" className="btn btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Profile icon"
            src={profileURL ? profileURL : `/svg/profile-icon.svg`}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 py-6 px-4 shadow flex flex-col  gap-2"
      >
        <h1 className="text-lg font-bold ml-3">
          Hi, {user?.user_metadata.firstname}
        </h1>
        <li>
          <Link to={"/profile"} className="text-sm font-Jakarta-Medium ">
            <img src="/svg/profile-dropdown-icon.svg" alt="Profile Icon" />
            Profile
          </Link>
        </li>
        <li>
          <Link to={"/my_bookings"} className="text-sm font-Jakarta-Medium">
            <img src="/svg/my-bookings-icon.svg" alt="My Bookings Icon" />
            My Bookings
          </Link>
        </li>
        <li>
          <Link to={"/favorites"} className="text-sm font-Jakarta-Medium">
            <img src="/svg/favorites-icon.svg" alt="Favorites Icon" />
            Favorites
          </Link>
        </li>
        <hr className="w-40 self-center my-4" />
        <li>
          <button
            onClick={handleLogOutButton}
            className="btn bg-primary text-white"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
