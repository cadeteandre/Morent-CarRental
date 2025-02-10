export default function calculateTotalPrice(pricePerDay: number | null, pickupDate: string, dropOffDate: string): number | null {
    if(pricePerDay) {    
        const days = diffInDaysConversor(pickupDate, dropOffDate);
        const total = pricePerDay * days * (1 + 0.19);
        return Math.round(total * 100) / 100;
    } else {
        return null;
    }
};

export function calculateTax(pricePerDay: number, days: number, taxRate: number): number {
    return pricePerDay * days * taxRate;
}

 // Calculates the difference in milliseconds and converts to days
export function diffInDaysConversor(pickupDate: string, dropOffDate: string): number {
    const start = new Date(pickupDate);
    const end = new Date(dropOffDate);
    const diffInTime = end.getTime() - start.getTime();
    const diffInDays = Math.max(Math.ceil(diffInTime / (1000 * 60 * 60 * 24)), 1);

    return diffInDays;
}