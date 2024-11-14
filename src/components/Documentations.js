import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Documentations = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const boxData = [
    {
      id: 1,
      coordinates: [
        [35.300, 34.480], // Top-left corner
        [35.300, 36.480], // Top-right corner
        [32.895, 36.480], // Bottom-right corner
        [32.895, 34.480], // Bottom-left corner
      ],
      color: "rgba(255, 255, 255, 0.5)",
      info: "LB303",
    },
    {
      id: 2,
      coordinates: [
        [34.650, 35.150], // Top-left corner
        [34.650, 36.150], // Top-right corner
        [33.650, 36.150], // Bottom-right corner
        [33.650, 35.150], // Bottom-left corner
      ],
      color: "rgba(0, 255, 0, 0.5)",
      info: "LB301",
    },
    {
        id: 3,
        coordinates: [
          [34.000, 34.700], // Top-left corner
          [34.000, 35.700], // Top-right corner
          [33.100, 35.700], // Bottom-right corner
          [33.100, 34.700], // Bottom-left corner
        ],
        color: "rgba(0, 255, 0, 0.5)",
        info: "LB302",
      },
  ];

  return (
    <div className="DocumentationsView">
      <div>
        <h3>Charting Plan:</h3>

        <MapContainer
          center={[33.8938, 35.5018]} // Default center (Beirut)
          zoom={7}
          style={{ width: "100%", height: "500px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Render clickable polygons for each box */}
          {boxData.map((box) => (
            <Polygon
              key={box.id}
              positions={box.coordinates}
              pathOptions={{ color: box.color, fillColor: box.color, fillOpacity: 0.5 }}
              eventHandlers={{
                click: () => {
                  setSelectedLocation(box.info);
                },
              }}
            >
            </Polygon>
          ))}
        </MapContainer>

        {/* Display selected location info */}
        {selectedLocation && (
          <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
            <p>{selectedLocation}</p>
          </div>
        )}
      </div>

      <div>
        <h3>Point of sales:</h3>
        <ul>
          <li>Lebanese Navy - Beirut Naval Base - <a href="tel:+9611983451">01983451</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Documentations;
