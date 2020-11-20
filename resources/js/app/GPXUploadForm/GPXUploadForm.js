import React, { useState, useEffect } from 'react'
import axios from 'axios';
import DisplayMapWithRoute from '../DisplayMapWithRoute/DisplayMapWithRoute';
import NewRouteDetails from '../NewRouteDetails/NewRouteDetails';

const GPXUploadForm = () => {
    const [routeName, setRouteName] = useState('');
    const [GPXFile, setGPXFile] = useState([]);
    const [GPXUploaded, setGPXUploaded] = useState(false);
    const [routeData, setRouteData] = useState({});

    const handleChange = (e) => {
        setRouteName(e.target.value);
    }
    
    const handleFileChange = (e) => {
        setGPXFile(e.target.files[0]);
    }


    const handleSubmit = async (e) => {
        
        e.preventDefault();

        let fd = new FormData();
        fd.append("GPXFile", GPXFile, GPXFile.name);
        fd.append('routeName', routeName);
        
        // send the data to API
        const response = await axios.post('/new-route', fd);
        
        if (response.status === 200) {
            
            //fetch the just saved data from DB (it was parsed meantime by back-end)
            await fetchRoute(response.data.route_id);

            //this will cause the next step of new route addition to render
            setGPXUploaded(true);
        }

        // TO DO: handle back-end errors
        
    }

    const fetchRoute = async (routeID) => {
        const response = await axios.get('/route/' + routeID);
        console.log(response);
        
        console.log(response.data.route.elevation_gain);
        

        setRouteData({
            'name': response.data.route.name,
            'length': response.data.route.length,
            'elevation': response.data.route.elevation_gain,
            'url': response.data.route.url,
            'id': response.data.route.id
        });
        
    }

    if (GPXUploaded === false) {
        
        // first step of route addition - show only input for gpx upload and route name
        return (

            <div className="new-route-form" >
                <form action="/new-route" onSubmit={ handleSubmit }>
                    <div className="form-group">
                        <label htmlFor="routeName">Route name:</label>
                        <input type="text" name="routeName" onChange={ handleChange } value={ routeName } />
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="gpxfile">Choose GPX file with route</label>
                        <input type="file" name="gpxfile" onChange={ handleFileChange }/>
                    </div>
                    <button>Next step</button>
                </form>
            </div>
    
        )
    } else {
        
        // GPX already uploaded? = show route info + map + fillable fields for adding more details
        const { name, length, elevation, url } = routeData;
        const routeURL = '/storage/gpx/' + url,
        centerCoordinates = [15.192371159791946, 50.75322702527046],
        zoom = 15;

        return (
            <div className="new-route-form">
                <div className="route-details-container">
                    <div className="route__name">{ name }</div>
                    <div className="route-details-container__length">{ length / 1000 } km</div>
                    <div className="route-details-container__elev">{ elevation } m</div>
                    
                    <NewRouteDetails data={routeData}/>
                
                </div>
                <div className="map-container">
                    
                    <DisplayMapWithRoute zoom={zoom} url={routeURL} centerCoordinates={centerCoordinates} />
                
                </div>                
            </div>

        )
    }

    
}

export default GPXUploadForm;