export interface IReview {
    text: string;
    stars: number;
    created_at: string;
    profiles: {
      firstname: string;
      lastname: string;
    };
  }