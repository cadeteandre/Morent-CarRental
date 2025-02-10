interface IAdCardProps {
  adTitle: string;
  adText: string;
  adBackgroundImg: string;
  adCarImg: string;
}

const AdCard: React.FC<IAdCardProps> = ({
  adTitle,
  adText,
  adBackgroundImg,
  adCarImg,
}) => {
  return (
    <div
      className="card max-h-[325px] w-full md:max-w-[610px]  rounded-lg text-white bg-cover bg-center static"
      style={{ backgroundImage: `url(${adBackgroundImg})` }}
    >
      <div className="card-body  ">
        <h2 className="text-2xl font-bold">{adTitle}</h2>
        <p className="font-light">{adText}</p>
        <img src={`${adCarImg}`} alt="Ad Car" />
      </div>
    </div>
  );
};

export default AdCard;
