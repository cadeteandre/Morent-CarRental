interface IAdCardProps {
  adTitle: string;
  adText: string;
  adBackgroundImg: string;
  adButtonColor: string;
  adCarImg: string;
}

const AdCard: React.FC<IAdCardProps> = ({
  adTitle,
  adText,
  adBackgroundImg,
  adButtonColor,
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
        <div className="card-actions justify-start">
          <button className={`btn border-0 ${adButtonColor} text-white`}>
            Rental Car
          </button>
        </div>
        <img src={`${adCarImg}`} alt="Ad Car" />
      </div>
    </div>
  );
};

export default AdCard;
