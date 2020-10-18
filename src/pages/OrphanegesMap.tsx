import React, { useEffect, useState } from "react";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import mapMarkering from "../images/map-marker.svg";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import "../styles/pages/orphanages-map.css";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkering} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando sua visita</p>
        </header>
        <footer>
          <strong>Canela</strong>
          <span>Rio Grande do Sul</span>
        </footer>
      </aside>

      <Map
        center={[-29.3622556, -50.8162796]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={248}
                maxWidth={248}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`orphanages/${orphanage.id}`}>
                  <FiArrowRight size={32} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}
export default OrphanagesMap;
