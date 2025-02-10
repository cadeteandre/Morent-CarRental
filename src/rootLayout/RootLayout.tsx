import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="bg-[#F6F7F9] px-6 pt-8 pb-11 md:px-14">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
