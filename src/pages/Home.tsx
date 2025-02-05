import AdCard from "../components/AdCard";
import AutoCard from "../components/autoCard";
import PickUpDropOff from "../components/PickUpDropOff";

const Home = () => {
  return (
    <section className="mx-4 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
        <AdCard
          adTitle={`The Best Platform for Car Rental`}
          adText="Ease of doing a car rental safely and reliably. Of course at a low price."
          adBackgroundImg="/images/ad-card-bg1.png"
          adButtonColor="bg-blue-600"
          adCarImg="/images/ad-car1.png"
        />
        <AdCard
          adTitle="Easy way to rent a car at a low price"
          adText="Providing cheap car rental services and safe and comfortable facilities."
          adBackgroundImg="/images/ad-card-bg2.png"
          adButtonColor="bg-blue-400"
          adCarImg="/images/ad-car2.png"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <PickUpDropOff componentTitle="Pickup" />
        <button className="btn bg-blue-600 text-white h-fit p-4 cursor-pointer rounded-sm hover:bg-blue-800">
            <img src="./svg/austauschen.svg" alt="Change Locations Icon" className="w-7 h-7" />
        </button>
        <PickUpDropOff componentTitle="Drop-off" />
      </div>
      <div className="self-center md:self-start">
        <AutoCard />
      </div>
      <div className="w-full items-center flex">
          <div className="flex flex-1 items-center justify-center">
            <button className="btn border-0 bg-blue-600 text-white">Show more car</button>
          </div>
          <span className="text-[#90A3BF]">120 Car</span>
      </div>
    </section>
  );
};

export default Home;
