import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";
import getCityCoordinates from '../utils/functions/getCityCoordinates';
import { useEffect } from 'react';

interface ILeafletMapProps {
    pickupCity: string,
    mapNumber: number
}

const LeafletMap: React.FC<ILeafletMapProps> = ({ pickupCity, mapNumber }) => {

    useEffect(() => {
        const map = L.map(`map${mapNumber}`).setView([0, 0], 13);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        getCityCoordinates(pickupCity)
        .then(({ latitude, longitude }) => {
            map.setView([latitude, longitude], 13);

            L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup('Selected city')
            .openPopup();
        })
        .catch((error) => console.error(error));

        return () => {
            map.remove();
        };

    }, [pickupCity, mapNumber]);

    return (  
        <div id={`map${mapNumber}`} className='h-[200px] w-full rounded-2xl'></div>
    );
}

export default LeafletMap;