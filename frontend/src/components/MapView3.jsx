import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapView3 = ({ latitude, longitude }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const lat = Number(latitude);
    const lng = Number(longitude);

    // 🚨 STOP if invalid
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

    // 🗺️ CREATE MAP
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([lat, lng], 15);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(mapRef.current);

      markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
    } 
    // 🔄 UPDATE POSITION
    else {
      markerRef.current.setLatLng([lat, lng]);
      mapRef.current.setView([lat, lng]);
    }

    // 🧠 FIX hidden container bug
    setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 500);

    // 🧹 CLEANUP (VERY IMPORTANT)
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "10px",
        border: "2px solid #ccc",
      }}
    />
  );
};

export default MapView3;
