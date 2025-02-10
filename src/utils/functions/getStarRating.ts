export default function getStarRating(stars: number): string {
    const filledStars = "★".repeat(stars);
    const emptyStars = "☆".repeat(5 - stars);
    return filledStars + emptyStars;
};

export function calculateAverage(numbers: number[]): number {
    if(numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return Math.round(sum / numbers.length); 
}