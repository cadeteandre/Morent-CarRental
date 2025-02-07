import { IReview } from "../../interfaces/IReview";
import { supabase } from "../supabase/setupSupabase";

export default async function fetchReviewsByCar(carId: string, setReviews: React.Dispatch<React.SetStateAction<IReview[]>>) {
    const { data, error } = await supabase
      .from("reviews")
      .select(
        `
        text,
        stars,
        created_at,
        profiles:profile_id (firstname, lastname, img_url)
      `
      )
      .eq("vehicle_id", carId);
  
    if (error) {
      console.error("Error by fetching reviews:", error.message);
      return;
    }
    
    const reviewsData = data?.map((item) => item);
    setReviews(reviewsData as IReview[]);
  }