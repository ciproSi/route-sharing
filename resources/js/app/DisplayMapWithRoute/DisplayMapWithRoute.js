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

const DisplayMapWithRoute = (props) => {
    

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

        const style = {
            'MultiLineString': new Style({
                stroke: new Stroke({
                color: '#FF0000',
                width: 3,
                }),
            }),
        };

        const vector = new VectorLayer({
            source: new VectorSource({
                attributions: attributions,
                url: url,
                format: new GPX(),
            }),
            style: function (feature) {
                return style[feature.getGeometry().getType()];
            },
        });

        const mapObject = new Map({
            target: 'map',
            layers: [raster, vector],
             view: new View({
                center: fromLonLat(centerCoordinates),
                zoom: zoom,
            }),
        });
    }, [])


    return (
     <div id="map" className="map"></div>
    )
}

export default DisplayMapWithRoute;
