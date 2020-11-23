import React, { useEffect, useState } from 'react'
import 'ol/ol.css';
import GPX from 'ol/format/GPX';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import {Circle as CircleStyle, Fill, Stroke, Style, Icon} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat, toLonLat} from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';
import { Link } from 'react-router-dom';

const DisplayMapWithPoints = (props) => {
    const { routes, zoom } = props;
    const [selectedRoute, setSelectedRoute] = useState({
        selected: false,
        elevation: null,
        length: null,
        name: '',
        id: null
    });
    
    const [mapObject, setMapObject] = useState(null);
    
    useEffect(() => {
        

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
        setMapObject(new Map({
            target: 'map',
            layers: [raster],
            view: new View({
                center: fromLonLat([13, 49]),
                zoom: zoom,
            }),
        }))

    }, []);

    useEffect(() => {

        // dont try to run this function when the mapObject is not set yet
        if (mapObject === null) { return }

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
        
        // we display route data when clicked on the route icon, if clicked anywhere else, we just console.log cooridnate lonlat
        mapObject.on('click', function (event) {
            const feature = mapObject.forEachFeatureAtPixel(event.pixel, function (feature) {
              return feature;
            });

            if (feature) {
                const coordinates = feature.getGeometry().getCoordinates();
              
                setSelectedRoute({
                    name: feature.values_.name,
                    elevation: feature.values_.elev,
                    id: feature.values_.id,
                    selected: true,
                    length: feature.values_.length
                });
            
                const element = document.getElementById('popup');
              
                const popup = new Overlay({
                    element: element,
                    autoPan: true,
                    autoPanAnimation: {
                        duration: 250,
                    },
                });

                popup.setPosition(coordinates);
                mapObject.addOverlay(popup);

                // add closer to the popup
                const closer = document.getElementById('closer');
                closer.onclick = function () {
                    popup.setPosition(undefined);
                    // closer.blur();
                    return false;
                };

            } else {
                console.log(toLonLat(event.coordinate));
            }
          });
    
    }, [routes, mapObject]);

    if (selectedRoute.selected == false) {
        return (
            <div className="map" id="map"></div>    
        )
    } else {
        return (
            <div id="map" className="map">
                <div id="popup" className="popup">
                    <div className="closer" id="closer">X</div>
                    <Link to={'/route/' + selectedRoute.id }> { selectedRoute.name } </Link>
                    <div className="route-info">Elevation: { selectedRoute.elevation } m</div>
                    <div className="route-info">Length: { selectedRoute.length / 1000 } km</div>
                </div>
            </div>
        )
    }
    
}

export default DisplayMapWithPoints;
