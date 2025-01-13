import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const JobLocationsMap = ({ data }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Initialize map
    if (!mapRef.current) return;

    mapInstanceRef.current = L.map(mapRef.current).setView([39.8283, -98.5795], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !data.locations) return;

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Circle) {
        layer.remove();
      }
    });

    // Calculate max count for scaling
    const maxCount = Math.max(...data.locations.map(loc => loc.count));

    // Add circles to map
    data.locations.forEach(location => {
      const radius = Math.sqrt(location.count / maxCount) * 200000;

      const circle = L.circle(location.coords, {
        color: '#7C3AED',
        fillColor: '#7C3AED',
        fillOpacity: 0.1,
        radius: radius,
        weight: 1,
      }).addTo(mapInstanceRef.current);

      const popupContent = `
        <div class="bg-gray-800 p-2 rounded">
          <strong class="text-white">${location.name}</strong><br/>
          <span class="text-gray-300">Positions: ${location.count}</span>
        </div>
      `;

      circle.bindPopup(popupContent);
      circle.on('mouseover', function(e) {
        this.setStyle({ fillOpacity: 0.8, weight: 2 });
        this.openPopup();
      });
      circle.on('mouseout', function(e) {
        this.setStyle({ fillOpacity: 0.1, weight: 1 });
        this.closePopup();
      });
    });
  }, [data]);

  return (
    <div className="w-full bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Job Locations</h2>
      <div 
        ref={mapRef} 
        className="h-[500px] rounded-lg overflow-hidden border border-gray-700"
      />
      <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
        <div className="bg-gray-700 p-4 rounded-lg">
          <span className="text-gray-400">Remote Positions:</span>
          <span className="ml-2 text-white">{data.remoteCount}</span>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <span className="text-gray-400">Hybrid Positions:</span>
          <span className="ml-2 text-white">{data.hybridCount}</span>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <span className="text-gray-400">In-Person Positions:</span>
          <span className="ml-2 text-white">{data.totalCount}</span>
        </div>
      </div>
    </div>
  );
};

export default JobLocationsMap;