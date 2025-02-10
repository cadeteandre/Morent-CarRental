export default function calculateTotalPrice(pricePerDay: number | null, pickupDate: string, dropOffDate: string): number | null {
    if(pricePerDay) {
        const start = new Date(pickupDate);
        const end = new Date(dropOffDate);
    
        // Calculates the difference in milliseconds and converts to days
        const diffInTime = end.getTime() - start.getTime();
        const diffInDays = Math.max(Math.ceil(diffInTime / (1000 * 60 * 60 * 24)), 1);
    
        return pricePerDay * diffInDays;
    } else {
        return null;
    }
};