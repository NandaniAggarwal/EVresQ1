import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MapView3 from "./MapView";

export default function ProfileOfDriver() {
  const { state } = useLocation();

  if (!state) return <p>No driver assigned</p>;

  const { driver, status } = state;

  return (
    <div>
      <h1>🚗 Driver Assigned</h1>

      <p><b>Name:</b> {driver.name}</p>
      <p><b>Phone:</b> {driver.phone}</p>
      <p><b>Vehicle:</b> {driver.vehicleNumber}</p>

      <h3>Status: {status}</h3>

      {status === "on_the_way" && <p>🚐 Driver is on the way</p>}
      {status === "completed" && <p>✅ Trip completed</p>}
      {driver && (
        <MapView3
          latitude={driver.latitude}
          longitude={driver.longitude}
        />
      )}
    </div>
  );
}
