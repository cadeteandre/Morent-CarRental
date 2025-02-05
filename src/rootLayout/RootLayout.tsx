import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";

const RootLayout = () => {
    return (  
        <>
            <Header />
            <main className="bg-gray-200 py-8">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default RootLayout;
