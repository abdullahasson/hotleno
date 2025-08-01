// components/Map.tsx
"use client";

import { Hotel } from "./HotelList";
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

// Fix for default marker icons in Leaflet
const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const selectedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

type MapProps = {
    hotels: Hotel[];
    selectedHotel: Hotel | null;
    onHotelSelect: (hotel: Hotel) => void;
};

export default function MapComponent({ hotels, selectedHotel, onHotelSelect }: MapProps) {
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.Marker[]>([]);

    useEffect(() => {
        if (hotels.length === 0) return;

        // Initialize map
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView(
                [hotels[0].location.latitude, hotels[0].location.longitude],
                13
            );

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);
        }

        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Add new markers
        hotels.forEach(hotel => {
            const isSelected = selectedHotel?.hotelId === hotel.hotelId && selectedHotel?.provider === hotel.provider;

            const marker = L.marker([hotel.location.latitude, hotel.location.longitude], {
                icon: isSelected ? selectedIcon : defaultIcon
            })
                .addTo(mapRef.current!)
                .bindPopup(`
          <div class="w-40">
            <h3 class="font-bold text-sm mb-1">${hotel.name}</h3>
            <p class="text-xs text-gray-600 mb-1">${hotel.currency || 'USD'}${Math.min(...hotel.rooms.map(r => r.price))}</p>
            <div class="flex items-center">
              ${Array.from({ length: 5 }).map((_, i) => `
                <svg class="w-3 h-3 ${i < Math.floor(hotel.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              `).join('')}
              <span class="text-xs ml-1">${hotel.rating.toFixed(1)}</span>
            </div>
          </div>
        `);

            marker.on('click', () => {
                onHotelSelect(hotel);
            });

            markersRef.current.push(marker);

            if (isSelected) {
                marker.openPopup();
                mapRef.current?.setView([hotel.location.latitude, hotel.location.longitude], 15);
            }
        });

        // Fit bounds if more than one hotel
        if (hotels.length > 1) {
            const bounds = L.latLngBounds(hotels.map(h => [h.location.latitude, h.location.longitude]));
            mapRef.current?.fitBounds(bounds, { padding: [50, 50] });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [hotels, selectedHotel, onHotelSelect]);

    return (
        <div id="map" className="h-full w-full rounded-xl">
            {hotels.length === 0 && (
                <div className="h-full flex items-center justify-center bg-gray-100 text-gray-500">
                    <div className="text-center">
                        <MapPin size={32} className="mx-auto mb-2" />
                        <p>No hotels to display on map</p>
                    </div>
                </div>
            )}
        </div>
    );
}