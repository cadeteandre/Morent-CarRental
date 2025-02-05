import AutoCard from "../components/autoCard";

const Favorites = () => {
    return (  
        <section className="flex flex-col items-center gap-6 px-8 py-8">
            <h1 className="text-2xl font-bold self-start">Your Favorite Cars</h1>
            <div className="w-full">
                <AutoCard />
            </div>
        </section>
    );
}

export default Favorites;