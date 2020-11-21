import React, { useEffect, useState } from 'react'
import 'ol/ol.css';
import GPX from 'ol/format/GPX';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import {Circle as CircleStyle, Fill, Stroke, Style, Icon} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj';
// import Attribution from 'ol/control/Attribution';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';
import { Link } from 'react-router-dom';

const DisplayMapWithPoints = (props) => {
    const [selectedRoute, setSelectedRoute] = useState([]);

    useEffect(() => {
        
        const { routes, zoom } = props;

        const attributions =
            '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
            '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

        const raster = new TileLayer({
            source: new XYZ({
                attributions: attributions,
                url: 'https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=zqQIfCZhtqUzH8SuoWR1',
            }),
        });

        // TO DO: determine center coordinates somehow based on routes displayed
        const mapObject = new Map({
            target: 'map',
            layers: [raster],
             view: new View({
                center: fromLonLat([13, 49]),
                zoom: zoom,
            }),
        });

        // for every route, we display one icon in the place of its start point
            routes.forEach((route) => {
                const iconFeature = new Feature({
                    geometry: new Point(fromLonLat([route.lon, route.lat])),
                    name: route.name,
                    length: route.length,
                    elev: route.elevation_gain,
                    id: route.id,
                });
                
                const iconStyle = new Style({
                    image: new Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: '/storage/icons/route-icon.png',
                    }),
                });
    
                iconFeature.setStyle(iconStyle);
    
                const vectorSource = new VectorSource({
                    features: [iconFeature],
                  });
                  
                const vectorLayer = new VectorLayer({
                source: vectorSource,
                });
    
                mapObject.addLayer(vectorLayer);
            });
            
            mapObject.on('click', function (event) {
                const feature = mapObject.forEachFeatureAtPixel(event.pixel, function (feature) {
                  return feature;
                });
                if (feature) {
                  const coordinates = feature.getGeometry().getCoordinates();
                  
                  console.log(feature.values_.name, coordinates);

                  const element = document.getElementById('popup');
                //   element.innerHTML = `${feature.values_.name}`;

                  setSelectedRoute([feature.values_.name, feature.values_.elev, feature.values_.id]);
                  
                  const popup = new Overlay({
                    element: element,
                    autoPan: true,
                    autoPanAnimation: {
                        duration: 250,
                    },
                  });

                  popup.setPosition(coordinates);
                  mapObject.addOverlay(popup);

                } else {
                  console.log('hovno');
                }
              });
        
        
    }, []);


    return (
     <div id="map" className="map">
         <div id="popup" className="popup">
         {
             selectedRoute !== [] && (
                    <>
                    <Link to={'/route/' + selectedRoute[2] }> { selectedRoute[0] } </Link>
                    <div className="route-elev">Route elev: { selectedRoute[1]} m</div> 
                    </>
              ) 
                 
             
         }
         </div>
     </div>
    )
}

export default DisplayMapWithPoints;
