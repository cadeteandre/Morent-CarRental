import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";

const RootLayout = () => {
    return (  
        <>
            <Header />
            <main className="bg-[#F6F7F9]">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default RootLayout;
