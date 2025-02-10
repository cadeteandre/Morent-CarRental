import UserFavCarsList from "../components/userFavCarsList";

const Favorites = () => {
  return (
    <section className="flex flex-col items-center gap-8 pt-8 pb-16">
      <h1 className="text-2xl font-display font-bold self-start">
        Your Favorite Cars
      </h1>
      <div className="w-full">
        <UserFavCarsList />
      </div>
    </section>
  );
};

export default Favorites;
