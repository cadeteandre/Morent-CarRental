interface IAdCardProps {
    adTitle: string,
    adText: string,
    adBackgroundImg: string,
    adButtonColor: string,
    adCarImg: string
}

const AdCard: React.FC<IAdCardProps> = ({ adTitle, adText, adBackgroundImg, adButtonColor, adCarImg }) => {
    return (  
        <div 
            className="card max-w-96 sm:w-96 rounded-box text-white bg-cover bg-center static mt-4"
            style={{ backgroundImage: `url(${adBackgroundImg})` }}>
            <div className="card-body">
                <h2 className="text-2xl font-bold max-w-[68%]">{adTitle}</h2>
                <p className="font-light max-w-[76%]">{adText}</p>
                <div className="card-actions justify-start">
                    <button className={`btn border-0 ${adButtonColor} text-white`}>Rental Car</button>
                </div>
                <img src={`${adCarImg}`} alt="Ad Car" />
            </div>
        </div>
    );
}

export default AdCard;