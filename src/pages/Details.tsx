import AutoCard from "../components/autoCard";
import CarDetails from "../components/CarDetails";
import Reviews from "../components/Reviews";

const Details = () => {
    return (  
        <>
            <button className="cursor-pointer flex items-center justify-center mb-6">
                <img src="/svg/back-btn-icon.svg" alt="Back button icon" />
                <span className="text-[#90A3BF] py-1 text-lg">back</span>
            </button> 
            <div className="flex flex-col items-center justify-center gap-6 mb-10 px-8">
                <div>
                    <CarDetails />
                </div>
                <div>
                    <Reviews />
                </div>
                <div className="mb-4">
                    <p className="text-[#90A3BF] text-lg mb-4">Available Nearby</p>
                    <AutoCard />
                </div>
                <div className="w-full items-center flex justify-between">
                    <button className="btn border-0 bg-blue-600 text-white">Show more car</button>
                    <span className="text-[#90A3BF]">120 Car</span>
                </div>
            </div>
        </>
    );
}

export default Details;