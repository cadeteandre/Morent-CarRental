import { IReview } from "../interfaces/IReview";

interface IReviewsProps {
  reviews: IReview[]
}

const getStarRating = (stars: number): string => {
  const filledStars = "★".repeat(stars);
  const emptyStars = "☆".repeat(5 - stars);
  return filledStars + emptyStars;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const Reviews: React.FC<IReviewsProps> = ({ reviews }) => {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md font-display">
      <li className="p-4 pb-2 text-base font-bold tracking-wide flex items-center gap-2.5">
        Reviews <div className="badge bg-blue-600 text-white badge-lg">{reviews.length}</div>
      </li>
      {reviews.map((singleReview) => (
        <li className="list-row flex flex-row items-center">
          <img
            className="size-10 rounded-full "
            src="https://img.daisyui.com/images/profile/demo/1@94.webp"
          />

          <div className="flex flex-col gap-3.5 w-full">
            <div className="flex flex-row justify-between items-center ">
              <p className="text-[18.7px] font-bold">{`${singleReview.profiles.firstname} ${singleReview.profiles.lastname}`}</p>{" "}
              <div>
                <p className="text-neutral-400">{formatDate(singleReview.created_at)}</p>
                <p className="text-lg text-amber-400">{getStarRating(singleReview.stars)}</p>
              </div>
            </div>

            <p className=" text-sm opacity-60">
              {singleReview.text}
              (Model: Volkswagen Golf)
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Reviews;
