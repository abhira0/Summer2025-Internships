
// src/components/analytics/JobLocationsMap.jsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function JobLocationsMap ({ data }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || !data?.locations) return;

    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([39.8283, -98.5795], 4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    // Clear existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Circle) {
        layer.remove();
      }
    });

    // Add markers for each location
    data.locations.forEach(location => {
      if (!location.coords || location.coords[0] === 'remote') return;
      
      const circle = L.circle(location.coords, {
        color: '#7C3AED',
        fillColor: '#7C3AED',
        fillOpacity: 0.1,
        radius: Math.sqrt(location.count) * 50000,
        weight: 1,
      }).addTo(mapRef.current);

      circle.bindPopup(`
        <div class="bg-gray-800 p-2 rounded">
          <strong class="text-white">${location.name}</strong><br/>
          <span class="text-gray-300">Positions: ${location.count}</span>
        </div>
      `);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [data]);

  return (
    <div className="w-full space-y-4">
      <div 
        ref={mapContainerRef} 
        className="w-full h-[500px] rounded-lg overflow-hidden border border-gray-700"
      />
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="bg-gray-800 p-4 rounded-lg">
          <span className="text-gray-400">Remote Positions:</span>
          <span className="ml-2 text-white">{data?.remoteCount || 0}</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <span className="text-gray-400">Hybrid Positions:</span>
          <span className="ml-2 text-white">{data?.hybridCount || 0}</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <span className="text-gray-400">In-Person Positions:</span>
          <span className="ml-2 text-white">{data?.totalCount || 0}</span>
        </div>
      </div>
    </div>
  );
};
