import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect } from 'react';

interface IBookingItemProps {
    carModel: string,
    pickupDate: string, //* Der Typ muss noch diskutiert werden
    dropOffDate: string, //* Der Typ muss noch diskutiert werden
    price: number | string, //* Der Typ muss noch diskutiert werden
    pickupCity: string,
    dropOffCity: string,
    carImg: string
}

const BookingItem: React.FC<IBookingItemProps> = ({ 
    carModel, 
    pickupDate, 
    dropOffDate, 
    price, 
    pickupCity, 
    dropOffCity, 
    carImg
}) => {
    
    useEffect(() => {
        const map = L.map('map').setView([51.233334, 6.783333], 13); //* Diese Daten müssen auch dynahmisch sein
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
    
        L.marker([51.233334, 6.783333]).addTo(map)
            // .bindPopup('Here is the marker!')
            .openPopup();
    
        return () => {
            map.remove();
        };

    }, []);

    return (  
        <div className='flex flex-col'>
            <p className='font-bold text-left ml-6 mb-2'>{pickupDate}</p>
            <div className="flex flex-col rounded-xl py-4 bg-white">
                <div className='flex flex-col rounded-xl px-6'>
                    <div className='flex gap-2 items-center sm:self-start'>
                        <img src={carImg} alt="Booking Car" className='max-w-[100px] rounded-xl' />
                        <div className='text-left'>
                            <p className='font-bold'>{carModel}</p>
                            <p className='font-extralight text-xs'>{pickupDate} - {dropOffDate}</p>
                            <p className='font-bold'>{price} €</p>
                        </div>
                    </div>
                    <hr className="w-full self-center my-4 opacity-50" />
                    <div className='flex items-center gap-10'>
                        <div className='flex gap-4 px-2'>
                            <img src="/svg/pick-drop-icon.svg" alt="Pickup Drop-off Icon" />
                            <div className='flex flex-col justify-between'>
                                <p className='text-xs'>{pickupCity}</p>
                                <p className='text-xs'>{dropOffCity}</p>
                            </div>
                        </div>
                        <div id="map" className='h-[200px] w-full rounded-2xl'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingItem;