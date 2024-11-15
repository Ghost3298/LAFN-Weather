import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import boxData from './boxData.json';

const Documentations = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [details, setDetails] = useState(null);
  const [scaleEnc, setScaleEnc] = useState(null);
  const [scalePc, setScalePc] = useState(null);
  const [int, setInt] = useState(null);

  return (
    <div className="DocumentationsView">
      <div>
        <h3>Lebanese Charting Plan:</h3>
        <MapContainer center={[33.8938, 35.5018]} zoom={7} style={{ width: "100%", height: "500px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
        <TileLayer 
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" 
          attribution='&copy; <a href="https://www.esri.com/en-us/arcgis/about-arcgis/terms">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
        />

          {boxData.map((box) => (
            <React.Fragment key={box.id}>
              <Polygon
                positions={box.coordinates}
                pathOptions={{ color: box.color, fillColor: box.color, fillOpacity: 0.5 }}
                eventHandlers={{
                  click: () => {
                    setSelectedLocation(box.info);
                    setDetails(box.details);
                    setScaleEnc(box.scale_enc);
                    setScalePc(box.scale_pc);
                    setInt(box.int);
                  },
                }}
              />
              <Marker
                position={box.coordinates[0]}
                icon={L.divIcon({
                  className: "custom-label",
                  html: `<span style="color: black; background: white; padding: 2px 4px; border-radius: 3px;">${box.info}</span>`,
                  iconSize: [30, 15],
                })}
                interactive={false}
              />
            </React.Fragment>
          ))}
        </MapContainer>

        {selectedLocation && (
          <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
            <p>{selectedLocation}</p>
            <p style={{ whiteSpace: 'pre-line' }}>{details}</p>
            <p>Scale ENC: {scaleEnc}</p>
            <p>Scale PC: {scalePc}</p>
            <p>INT: {int}</p>
          </div>
        )}
      </div>

      <div>
        <h3>Point of sales:</h3>
        <ul>
          <li>Lebanese Navy - Beirut Naval Base - <a href="tel:+9611983451" style={{color: "black", textDecoration:"none"}}>+961 1 983 451/2/3 &nbsp; ext 43091</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Documentations;
