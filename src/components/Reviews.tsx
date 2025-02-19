import { IReview } from "../interfaces/IReview";
import getStarRating from "../utils/functions/getStarRating";

interface IReviewsProps {
  reviews: IReview[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const Reviews: React.FC<IReviewsProps> = ({ reviews }) => {
  return (
    <ul className="list bg-base-100 rounded-lg shadow-md font-display p-7 md:w-full">
      <li className="p-4 pb-2 text-base font-bold tracking-wide flex items-center gap-2.5">
        Reviews{" "}
        <div className="badge bg-primary text-white badge-lg">
          {reviews.length}
        </div>
      </li>
      {reviews.map((singleReview, i) => (
        <li key={i} className="list-row flex flex-row items-center">
          <figure className="size-10 rounded-lg overflow-hidden flex items-center justify-center self-start md:self-center">
            <img
              className="w-full h-full object-cover rounded-lg "
              src={singleReview.profiles.img_url}
            />
          </figure>

          <div className="flex flex-col gap-3.5 w-full">
            <div className="flex flex-row justify-between items-center ">
              <p className="text-[18.7px] font-bold">{`${singleReview.profiles.firstname} ${singleReview.profiles.lastname}`}</p>{" "}
              <div>
                <p className="text-neutral-400">
                  {formatDate(singleReview.created_at)}
                </p>
                <p className="text-md text-amber-400">
                  {getStarRating(singleReview.stars)}
                </p>
              </div>
            </div>

            <p className=" text-sm opacity-60">{singleReview.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Reviews;
