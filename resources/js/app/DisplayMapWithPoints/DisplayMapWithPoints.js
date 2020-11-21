import React, { useEffect } from 'react'
import 'ol/ol.css';
import GPX from 'ol/format/GPX';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import {Circle as CircleStyle, Fill, Stroke, Style, Icon} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj';
import Attribution from 'ol/control/Attribution';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

const DisplayMapWithPoints = (props) => {
    

    useEffect(() => {
        
        const { zoom, url, centerCoordinates } = props;

        const attributions =
            '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
            '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

        const raster = new TileLayer({
            source: new XYZ({
                attributions: attributions,
                url: 'https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=zqQIfCZhtqUzH8SuoWR1',
                // maxZoom: 20,
            }),
        });

        const mapObject = new Map({
            target: 'map',
            layers: [raster],
             view: new View({
                center: fromLonLat(centerCoordinates),
                zoom: zoom,
            }),
        });

        // point addidition
            const iconFeature = new Feature({
                geometry: new Point(fromLonLat(centerCoordinates)),
                name: 'Null Island',
                population: 4000,
                rainfall: 500,
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

    }, [])


    return (
     <div id="map" className="map"></div>
    )
}

export default DisplayMapWithPoints;
