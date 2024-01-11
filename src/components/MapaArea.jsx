import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import Draw from 'ol/interaction/Draw';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import { fromLonLat, toLonLat } from 'ol/proj';  // Añade toLonLat aquí
import { radio } from '@nextui-org/react';


const MapaArea = ({ onCancel, onAccept, executeAccept,executeCancel }) => {
  const mapContainerRef = useRef(null);
  const sourceRef = useRef(null);
  const drawRef = useRef(null);
  useEffect(() => {
    if (executeCancel) {
      handleCancel();
    }
    else if (executeAccept) {
      handleAccept(); // Aquí necesitarás las coordenadas para pasarlas a handleAccept
    }
    else{

      const centerCoordinates = [
        parseFloat(-1.3),
        parseFloat(37.9),
      ];
    
      const view = new View({
        center: fromLonLat(centerCoordinates),
        zoom: 9,
      });
      sourceRef.current = new VectorSource();
      drawRef.current = new Draw({
          source: sourceRef.current,
          type: "Circle",
      });




        const map = new Map({
          target: mapContainerRef.current,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            new VectorLayer({
              source: sourceRef.current,
              style: new Style({
                  fill: new Fill({
                      color: 'rgba(0, 0, 0, 0.2)',
                  }),
                  stroke: new Stroke({
                      color: '#FF6200',
                      width: 2,
                  }),
                  image: new CircleStyle({
                      radius: 7,
                      fill: new Fill({
                          color: '#FF6200',
                      }),
                  }),
              }),
          }),
  
          ],
          view,
        });
        map.addInteraction(drawRef.current);



        console.log(drawRef.current)
          return () => {
              map.removeInteraction(drawRef.current);
          };
      
    }
  }, [executeAccept,executeCancel]);

  const handleAccept = () => {
    const features = sourceRef.current.getFeatures();
    
    if (features.length === 0) {
      alert('Por favor, dibuja un área en el mapa.');
      return;
    }
    const circleGeometry = features[0].getGeometry();
  const radius = circleGeometry.getRadius();
  const area = Math.PI * Math.pow(radius, 2);
  const centro = circleGeometry.getCenter();
  const centroEnGrados = toLonLat(centro, 'EPSG:3857');



  // Puedes pasar el área a la función onAccept si es necesario
  onAccept(centroEnGrados,radius);

  sourceRef.current.clear();
  };

const handleCancel = () => {
    sourceRef.current.clear();
    onCancel();
};



  return <div ref={mapContainerRef}  style={{ height: '400px' }} />; 
  
};

export default MapaArea;