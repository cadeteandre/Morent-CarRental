import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect } from 'react';


const BookingItem = () => {
    
    useEffect(() => {
        const map = L.map('map').setView([51.233334, 6.783333], 13);
    
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
        <div className="flex flex-col rounded-xl">
            <p className='font-bold text-left ml-6'>DD_MM_YY</p>
            <div className='flex flex-col rounded-xl px-6'>
                <div className='flex gap-2 justify-center items-center sm:self-start'>
                    <img src="/images/booking-car-example.png" alt="Booking Car" />
                    <div>
                        <p className='font-bold'>Car Name</p>
                        <p className='font-extralight text-xs'>Pickup DD_MM_YY</p>
                        <p className='font-extralight text-xs'>Drop-off DD_MM_YY</p>
                        <p className='font-bold'>Price €</p>
                    </div>
                </div>
                <hr className="w-full self-center my-4" />
                <div className='flex items-center gap-4'>
                    <div className='flex gap-4 px-2 flex-1'>
                        <img src="/svg/pick-drop-icon.svg" alt="Pickup Drop-off Icon" />
                        <div className='flex flex-col justify-between'>
                            <p className='text-xs'>Pickup</p>
                            <p className='text-xs'>Drop-off</p>
                        </div>
                    </div>
                    <div id="map" className='h-[200px] w-full rounded-2xl flex-2'></div>
                </div>
            </div>
        </div>
    );
}

export default BookingItem;