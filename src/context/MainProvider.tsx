import { createContext, useEffect, useState } from "react";
import { Vehicle } from "../pages/Home";
import { TVehicleDetail } from "../pages/Details";
import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase/setupSupabase";

export const mainContext = createContext({});

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCar, setSelectedCar] = useState<
    Vehicle | TVehicleDetail | null
  >(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  return (
    <mainContext.Provider
      value={{
        user,
        setUser,
        selectedCar,
        setSelectedCar,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </mainContext.Provider>
  );
}
