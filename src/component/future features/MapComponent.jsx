

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../../style/mapComponent.css';

const MapComponent = ({ coordinates }) => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });


    const CenterMap = ({ center }) => {
        const map = useMap();
        useEffect(() => {
            map.setView(center, 15);
        }, [center]);
        return null;
    };

    return (
        <div className="map-container">
            <MapContainer center={coordinates ? [coordinates.lat, coordinates.lng] : [18.5204, 73.8567]} zoom={15} className="map">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[coordinates.lat, coordinates.lng]}>
                    <Popup>
                        {`Street: ${coordinates.street || ""}, City: ${coordinates.city || ""}, State: ${coordinates.state || ""}, Zip: ${coordinates.zipCode || ""}, Country: ${coordinates.country || ""}`}
                    </Popup>
                </Marker>
                <CenterMap center={[coordinates.lat, coordinates.lng]} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;

