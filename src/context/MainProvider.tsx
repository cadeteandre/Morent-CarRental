import { createContext, useState } from "react";
import { Vehicle } from "../pages/Home";
import { TVehicleDetail } from "../pages/Details";
import { User } from "@supabase/supabase-js";

export const mainContext = createContext({});

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null!);
  const [selectedCar, setSelectedCar] = useState<
    Vehicle | TVehicleDetail | null
  >(null);
  const [refreshFavList, setRefreshFavList] = useState<boolean>(false);

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
