'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMemo } from 'react';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
}

export default function StudioMap({ location }: Readonly<MapProps>) {
  // Custom icon for marker with studio logo
  const customIcon = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const L = require('leaflet');
    return new L.DivIcon({
      html: `
        <div style="
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #A8D646 0%, #9BC53D 100%);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 4px solid #000;
          box-shadow: 0 10px 30px rgba(168, 214, 70, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        ">
          <div style="
            width: 50px;
            height: 50px;
            background: #000;
            border-radius: 50%;
            transform: rotate(45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            padding: 5px;
          ">
            <img
              src="/images/IMG_20251121_085355_649.png"
              style="
                width: 100%;
                height: 100%;
                object-fit: contain;
                transform: rotate(0deg);
              "
              alt="Podcast EcoSpace"
            />
          </div>
        </div>
      `,
      className: 'custom-marker',
      iconSize: [70, 70],
      iconAnchor: [35, 70],
      popupAnchor: [0, -70],
    });
  }, []);

  return (
    <>
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={17}
        scrollWheelZoom={false}
        zoomControl={true}
        className="h-full w-full z-0"
        style={{ background: '#F5F5F5' }}
      >
        {/* Light theme with visible roads and labels - English */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          subdomains="abc"
          maxZoom={19}
        />
        {customIcon && (
          <Marker position={[location.lat, location.lng]} icon={customIcon}>
            <Popup className="custom-popup">
              <div
                style={{
                  background: 'linear-gradient(135deg, #0A3D47 0%, #0A0A0A 100%)',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '2px solid #A8D646',
                  minWidth: '250px',
                  boxShadow: '0 10px 40px rgba(168, 214, 70, 0.3)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <h3
                    style={{
                      fontWeight: '900',
                      fontSize: '20px',
                      marginBottom: '12px',
                      color: '#A8D646',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Podcast EcoSpace
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#E5E5E5',
                      marginBottom: '4px',
                      lineHeight: '1.6',
                    }}
                  >
                    {location.address}
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#E5E5E5',
                      marginBottom: '16px',
                    }}
                  >
                    {location.city}
                  </p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#A8D646',
                      color: '#000',
                      fontWeight: '700',
                      fontSize: '12px',
                      padding: '10px 20px',
                      borderRadius: '25px',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#9BC53D';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = '#A8D646';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Custom Popup Styles */}
      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
          border-radius: 16px !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }
        .leaflet-popup-tip {
          background: #0a3d47 !important;
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </>
  );
}
