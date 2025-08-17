// src/components/Map.tsx
"use client";

import { Hotel } from '@/types/hotel';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocale } from "next-intl"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen/Control.FullScreen.js';
// Icons
import { MapPin, Minus, Plus, Maximize, Minimize, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define extended map type for fullscreen methods
interface FullscreenMap extends L.Map {
  isFullscreen?: () => boolean;
  toggleFullscreen?: () => void;
  exitFullscreen?: () => void;
  enterFullscreen?: () => void;
}

// Define fullscreen control factory type
interface FullscreenControlFactory {
  fullscreen: (options: FullscreenControlOptions) => L.Control;
}

interface FullscreenControlOptions {
  position: 'topright' | 'bottomright' | 'topleft' | 'bottomleft';
  title: string;
  titleCancel: string;
  forceSeparateButton: boolean;
}

// Fix for default marker icons in Leaflet
const createIcon = (color: string) => L.icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
  iconRetinaUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const defaultIcon = createIcon('red');
const selectedIcon = createIcon('blue');
const hoverIcon = createIcon('green');

type MapProps = {
  hotels: Hotel[];
  selectedHotel?: Hotel | null;
  hoveredHotel?: Hotel | null;
  onHotelSelect: (hotel: Hotel) => void;
  loading?: boolean;
};

export default function MapComponent({ 
  hotels, 
  selectedHotel, 
  hoveredHotel,
  onHotelSelect,
  loading = false
}: MapProps) {
  const mapRef = useRef<FullscreenMap | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const lang = useLocale();

  // Initialize map
  const initMap = useCallback(() => {
    if (hotels.length === 0 || mapRef.current) return;
    
    const firstHotel = hotels[0];
    mapRef.current = L.map('map', {
      zoomControl: false,
      fadeAnimation: true,
      markerZoomAnimation: true
    }) as FullscreenMap;

    mapRef.current.setView(
      [firstHotel.location.latitude, firstHotel.location.longitude],
      13
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      detectRetina: true
    }).addTo(mapRef.current);

    // Add fullscreen control with proper typing
    const fullscreenControl = (L.control as unknown as FullscreenControlFactory).fullscreen({
      position: 'topright',
      title: 'Enter Full Screen',
      titleCancel: 'Exit Full Screen',
      forceSeparateButton: true
    });

    mapRef.current.addControl(fullscreenControl);

    // Handle fullscreen events
    mapRef.current.on('fullscreenchange', () => {
      setIsFullScreen(!!(mapRef.current && typeof mapRef.current.isFullscreen === 'function' && mapRef.current.isFullscreen()));
    });

    setIsMapReady(true);
  }, [hotels]);

  // Update markers
  const updateMarkers = useCallback(() => {
    if (!mapRef.current || !isMapReady) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    hotels.forEach(hotel => {
      const isSelected = selectedHotel?.id === hotel.id;
      const isHovered = hoveredHotel?.id === hotel.id;

      const marker = L.marker([hotel.location.latitude, hotel.location.longitude], {
        icon: isSelected ? selectedIcon : isHovered ? hoverIcon : defaultIcon,
        riseOnHover: true
      })
        .addTo(mapRef.current!)
        .bindPopup(`
          <div class="w-48 p-4">
            <h3 class="font-bold text-sm mb-1">${hotel.name}</h3>
            <p class="text-xs text-gray-600 mb-1">${hotel.zoneName}</p>
            <div class="flex items-center mb-1">
              ${Array.from({ length: 5 }).map((_, i) => `
                <svg class="w-3 h-3 ${i < hotel.stars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              `).join('')}
              <span class="text-xs ml-1">${hotel.rating.toFixed(1)}</span>
            </div>
            <Link href='/${lang}/hotels/hotel' class="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition">
              Book Now
            </Link>
          </div>
        `, { 
          autoPan: true,
          autoPanPadding: [20, 20],
          className: 'custom-popup'
        });

      marker.on('click', () => {
        onHotelSelect(hotel);
        mapRef.current?.flyTo(marker.getLatLng(), 15, {
          animate: true,
          duration: 1
        });
      });

      marker.on('mouseover', () => {
        marker.setIcon(hoverIcon);
        mapRef.current?.panTo(marker.getLatLng(), {
          animate: true,
          duration: 0.5
        });
      });

      marker.on('mouseout', () => {
        if (!isSelected) marker.setIcon(defaultIcon);
      });

      markersRef.current.push(marker);

      if (isSelected) {
        setTimeout(() => marker.openPopup(), 300);
      }
    });

    // Fit bounds if hotels exist
    if (hotels.length > 0) {
      const bounds = L.latLngBounds(hotels.map(h => [h.location.latitude, h.location.longitude]));
      mapRef.current.fitBounds(bounds, { 
        padding: [50, 50],
        animate: true,
        duration: 1
      });
    }
  }, [hotels, selectedHotel, hoveredHotel, onHotelSelect, isMapReady, lang]);

  // Effect for map initialization
  useEffect(() => {
    initMap();
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [initMap]);

  // Effect for marker updates
  useEffect(() => {
    if (isMapReady) {
      updateMarkers();
    }
  }, [isMapReady, updateMarkers]);

  // Fullscreen toggle
  const toggleFullScreen = useCallback(() => {
    if (!mapRef.current) return;
    
    if (mapRef.current.isFullscreen && mapRef.current.isFullscreen()) {
      mapRef.current.exitFullscreen?.();
    } else {
      mapRef.current.enterFullscreen?.();
    }
  }, []); // Fixed missing dependency

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        setTimeout(() => mapRef.current?.invalidateSize(), 300);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Better error handling for no hotels
  const showNoHotels = !loading && hotels.length === 0;

  return (
    <div 
      id="map-container"
      className="h-full w-full rounded-xl border border-gray-200 relative overflow-hidden shadow-md transition-all duration-300 bg-white"
      ref={mapContainerRef}
    >
      <div 
        id="map" 
        className="h-full w-full rounded-xl transition-all duration-300"
      />
      
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 z-[1000] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <p className="mt-2 text-gray-600">Loading hotel data...</p>
          </div>
        </div>
      )}

      {showNoHotels && (
        <div className="absolute inset-0 flex items-center justify-center z-[800]">
          <div className="text-center p-6 rounded-lg bg-white bg-opacity-90 max-w-sm border border-gray-200 shadow-lg">
            <MapPin size={48} className="mx-auto mb-3 text-blue-400" />
            <h3 className="text-lg font-semibold mb-1">No Hotels Found</h3>
            <p className="text-gray-600 mb-3">Try adjusting your filters to find available properties</p>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Controls Container */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-3">
        <TooltipProvider delayDuration={300}>
          {/* Fullscreen Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleFullScreen}
                className="bg-white p-2.5 rounded-lg shadow-lg hover:bg-gray-50 transition-all flex items-center justify-center border border-gray-200"
                aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
              >
                {isFullScreen ? (
                  <Minimize size={20} className="text-gray-700" />
                ) : (
                  <Maximize size={20} className="text-gray-700" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}</p>
            </TooltipContent>
          </Tooltip>

          {/* Zoom Controls */}
          <div className="flex flex-col gap-2 bg-white p-1 rounded-lg shadow-lg border border-gray-200">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => mapRef.current?.zoomIn()}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Zoom in"
                >
                  <Plus size={20} className="text-gray-700" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Zoom In</p>
              </TooltipContent>
            </Tooltip>
            
            <div className="border-t border-gray-200 mx-2"></div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => mapRef.current?.zoomOut()}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Zoom out"
                >
                  <Minus size={20} className="text-gray-700" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Zoom Out</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-2 left-2 z-[800] bg-white bg-opacity-80 px-2 py-1 rounded text-xs text-gray-600 border border-gray-200">
        © OpenStreetMap
      </div>

      {/* Selected Hotel Indicator */}
      {selectedHotel && (
        <div className="absolute bottom-4 right-1/2 translate-x-1/2 z-[800] bg-white px-4 py-2 rounded-lg shadow-xl border border-gray-200">
          <p className="font-medium text-sm">{selectedHotel.name}</p>
          <p className="text-xs text-gray-600">{selectedHotel.zoneName}</p>
        </div>
      )}
    </div>
  );
}