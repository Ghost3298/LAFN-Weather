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
        <h2>Purpose and Organization of the Lebanese National Charting Plan</h2>
        <h3>Introduction</h3>
        <p>
          <i>
            Reference: <br/>
            &nbsp;&nbsp;- Technical Arrangement between the Ministry of National Defence of the Lebanese Republic
            and the Ministry of the Defense of the Italian Republic in the field of Hydrogrpahy,
            Oceanography and Nautical Cartography, signed in July 2020;
          </i>
        </p>
        <p>
          The Lebanese Navy Hydrographic Service was established in 2014 as part of the Lebanese Navy to
          provide navigational products and services that ensure safe navigation and efficient maritime
          commerce on Lebanese’s coastal waters. This comprises an area of about 22.730 square km and 230
          km of coastline.
        </p>
        <p>
          This plan describes a strategy to create a comprehensive “Nautical Charting Plan” to be developped
          in the next decade (2021-2031) together with a suite of nautical publications. The evolving state of
          marine navigation and nautical chart production has provided LNHS with opportunities to develop a
          “ENC-based” nautical porfolio and to enhance the content and utility of its future nautical charts.
          Following the Technial Arrangement dated July 2020 (see reference), the Italian Hydrographic
          Institute (IIM) will support the LNHS in the development and production of the Lebanese Nautical
          Charting Plan.
        </p>
        <p>
          SOLAS Chapter V regulation 27 requires nautical charts and nautical publications necessary for the
          intended voyage to be adequate and up-to-date. Ships should also take into account the guidelines
          for voyage planning, as adopted by the International Maritime Organization (IMO) Resolution
          A.893(21). For an Electronic Navigational Chart (ENC) or paper nautical chart to be considered
          adequate for navigational purposes, it must be:
        </p>
          <ul>
            <li>issued officially</li>
            <li>of appropriate scale, suitable for the navigational task at hand</li>
            <li>of the latest edition</li>
            <li>used in its original form, and</li>
            <li>maintained up-to-date, using the latest available notices to mariners or ENC update service.</li>
          </ul>

        <p>
          The scope of this document is to describe the Paper Charts and ENCs Scheme which is going to be
          produced by the LNHS together with the IIM with the main aim to ensure safety of navigation
          through realiable and updated nautical products.
        </p>

        <h3>Lebanese Nautical Charts Portfolio</h3>
        <p>
        Official Lebanese nautical charts (Paper Charts and ENCs ) are issued and updated by the LNHS under
        the ‘LB’ series. LNHS paper nautical charts are easily identified by their ‘LB’ chart number and LNHS
        crest above the chart’s title together with the IIM logo if co-produced.
        </p>
        <p>
        The Charts Porfolio will be developped starting with the production of the Electronic Nautical Charts
        (ENCs). Traditional Paper Charts (PCs) are considered as a derived product. As consequence, it was
        chosen to maintain the correspondance between ENCs and PC.
        </p>
        <p>
        The Lebanese Nautitcal Charting plan is composed of 3 series of charts (ENCs and Paper Charts) in
        accordance with the navigational requirements of shipping and the need to provide a coherent and
        logical scheme of charts for a route or for port entry (see Table 1). The following scale bands were
        considered for the charting pland definition:
        </p>
        <ul>
            <li>
              <b>Coastal:</b><br/>
              To provide for coastal navigation and coastal shipping routes. The coastal series will have a
              uniform 1:100.000 scale for national charts and 1:250.000 for INT charts.
            </li>
            <li>
              <b>Approach:</b><br/>
              To provide for navigating in the approaches to ports and in major shipping areas. Generally,
              at scales between 1:25.000 and 1:50.000. Such areas may well contain complicated traffic
              routeing measures. Uncomplicated port approaches should not warrant the provision of
              separate approach charts; in such cases, the harbour charts will be schemed with sufficient
              sea-room offshore to permit the safe transfer by the user from the appropriate chart of the
              coastal series.
            </li>
            <li>
              <b>Harbour:</b><br/>
              To provide for port entry, and navigating within ports, harbours, anchorages, bays.
              Generally, at scales between 1:5.000 and 1:10.000.
            </li>
        </ul>

        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{textAlign: "left"}}>
              <th>Series</th>
              <th>Purpose</th>
              <th>Scale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>LB 300</b></td>
              <td>Coastal</td>
              <td>1:100.000 1:250.000</td>
            </tr>
            <tr>
              <td><b>LB 400</b></td>
              <td>Approach</td>
              <td>1:25.000 1:50.000</td>
            </tr>
            <tr>
              <td><b>LB 500</b></td>
              <td>Harbour</td>
              <td>1:5.000 1:10.000</td>
            </tr>
          </tbody>
        </table>

        <p>
        During the definition of the charting plan, a set of medium and large-scale charts was specifically
        designed for planning, landfall and coastal navigation and access to ports used by ships engaged in
        international trade. Some of these National charts, conceived for the needs of the international
        mariner, will be possibly published as INT charts in the future following the International
        Hydrographic Organization approbation process (see International Hydrographic Organization
        Publication ”Guidance for the preparation and maintenance of international (INT) chart and ENC
        schemes” - S-11, Edition 3, February 2018).
        </p>
        <p>
        At the moment nr. 03 charts of the 10 are planned to be published as INT.
        The Charts and ENCs scheme is summarised in the Table 2. Each chart is described in detail in the
        following paragraphs.
        </p>

        <table className="ChartsDetails">
          <thead>
            <tr style={{textAlign: "left"}}>
              <th></th>
              <th>TITLE</th>
              <th>SACLE ENC</th>
              <th>SCALE PC</th>
              <th>INT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>LB 301</b></td>
              <td>Tripoli to Ras es Saadiyat</td>
              <td>1:90.000</td>
              <td>1:100.000</td>
              <td></td>
            </tr>
            <tr>
              <td><b>LB 302</b></td>
              <td>Ras El Maameltein to Ras Al Naqourah</td>
              <td>1:90.000</td>
              <td>1:100.000</td>
              <td></td>
            </tr>
            <tr>
              <td><b>LB 303</b></td>
              <td>Baniyas to Akka</td>
              <td>1:180.000</td>
              <td>1:250.000</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><b>LB 401</b></td>
              <td>Approach to Tripoli and Selaata <br/>Approach to Tripoli (A)</td>
              <td>1:45.000</td>
              <td>1:40.000</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>Approach to Selaata (B)</td>
              <td>1:22.000</td>
              <td>1:20.000</td>
              <td></td>
            </tr>
            <tr>
              <td><b>LB 402</b></td>
              <td>Approach to Beirut and Ports of Jounieh</td>
              <td>1:45.000</td>
              <td>1:40.000</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>Ports of Jounieh (A)</td>
              <td>1:12.000</td>
              <td>1:12.000</td>
              <td></td>
            </tr>
            <tr>
              <td><b>LB 403</b></td>
              <td>Approach to Sidon</td>
              <td>1:22.000</td>
              <td>1:25.000</td>
              <td></td>
            </tr> 
            <tr>
              <td><b>LB 404</b></td>
              <td>Approach to tyre</td>
              <td>1:22.000</td>
              <td>1:25.000</td>
              <td></td>
            </tr>
            <tr>
              <td><b>LB 501</b></td>
              <td>Port of Tripoli</td>
              <td>1:8.000</td>
              <td>1:8.000</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><b>LB 502</b></td>
              <td>Port of Beirut</td>
              <td>1:8.000</td>
              <td>1:8.000</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><b>LB 503</b></td>
              <td>Port of Sidon</td>
              <td>1:4.000</td>
              <td>1:6.000</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>
        
      </div>
      <div>
        <h2>Point of sales:</h2>
        <ul>
          <li>Lebanese Navy - Beirut Naval Base - <a href="tel:+9611983451" style={{color: "black", textDecoration:"none"}}>+961 1 983 451/2/3 &nbsp; ext 43091</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Documentations;
