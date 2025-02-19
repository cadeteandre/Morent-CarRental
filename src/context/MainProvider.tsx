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
  const [refreshFavList, setRefreshFavList] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCar, setSelectedCar] = useState<
    Vehicle | TVehicleDetail | null
  >(null);

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
        refreshFavList,
        setRefreshFavList,
      }}
    >
      {children}
    </mainContext.Provider>
  );
}
