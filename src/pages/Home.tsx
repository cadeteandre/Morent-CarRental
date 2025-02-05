import AdCard from "../components/AdCard";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <div className="p-4">
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
    </>
  );
};

export default Home;
