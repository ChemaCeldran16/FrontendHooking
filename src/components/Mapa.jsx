import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';


const Mapa = ({ coordenadas, altura }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (coordenadas.length > 0) {
      const centerCoordinates = [
        parseFloat(coordenadas[0].longitud),
        parseFloat(coordenadas[0].latitud),
      ];

      const view = new View({
        center: fromLonLat(centerCoordinates),
        zoom: 15,
      });

      const map = new Map({
        target: mapContainerRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view,
      });

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        }),
      });

      const markers = coordenadas.map((local) => {
        const { latitud, longitud } = local;
        const marker = new Feature({
          geometry: new Point(fromLonLat([parseFloat(longitud), parseFloat(latitud)])),
        });
        marker.setStyle(iconStyle);
        return marker;
      });

      const vectorSource = new VectorSource({
        features: markers,
      });

      new VectorLayer({
        map,
        source: vectorSource,
      });
    }
  }, [coordenadas]);

  return <div ref={mapContainerRef} style={{ height: altura || '400px' }} />; 
  
};

export default Mapa;