import { useContext, useEffect } from "react";
import { mainContext } from "../../context/MainProvider";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabase/setupSupabase";
import { Navigate } from "react-router";

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {

    const { setUser } = useContext(mainContext) as {setUser: React.Dispatch<React.SetStateAction<User>>};

    const { isLoggedIn, setIsLoggedIn } = useContext(mainContext) as {isLoggedIn: boolean, setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>};

    useEffect(() => {
        const checkLoginStatus = async () => {
            const { data: {user}, error } = await supabase.auth.getUser();
            setIsLoggedIn(!!user);
            if(user) setUser(user)

            if(error) console.error(error.message);
        }
        checkLoginStatus();
    }, [])

    return isLoggedIn ? children : <Navigate to={'/login'} replace />;
}

export default ProtectedRoute;