import { createContext, useState } from "react";
import { Vehicle } from "../pages/Home";
import { TVehicleDetail } from "../pages/Details";

export const mainContext = createContext({});

export default function MainProvider({children}: {children: React.ReactNode}) {

    const [user, setUser] = useState<any>({});
    const [selectedCar, setSelectedCar] = useState<Vehicle | TVehicleDetail | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <mainContext.Provider value={{user, setUser, selectedCar, setSelectedCar, isLoggedIn, setIsLoggedIn}}>
            {children}
        </mainContext.Provider>
    )
}