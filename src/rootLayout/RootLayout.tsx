import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="bg-[#F6F7F9] px-6 pt-8 pb-11 md:px-14 xl:max-w-[1440px] xl:mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
