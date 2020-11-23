import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DisplayMapWithRoute from '../DisplayMapWithRoute/DisplayMapWithRoute';

const RouteDetail = () => {
    // get the id from url to fetch specific route and its relations
    const { id } = useParams();
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const response = await axios.get('/api/route/' + id);

        if (response.status === 200) {
            setData(response.data);
            setLoading(false);
        }

    }
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="route-detail-container">
        {
            loading ? 
                (
                    <h3>Loading</h3>
                ) : (
                    <>
                    
                    <div className="route-data-container">
                        <div className="route-data__name">{ data.route.name }</div>
                        <div className="route-data">
                            <div className="route-data__item">Total elevation: { data.route.elevation_gain } m</div>
                            <div className="route-data__item">Distance: { data.route.length / 1000 } km</div>
                            <div className="route-data__item">Difficulty: { data.route.difficulty } / 5</div>
                            <div className="route-data__item">Ratings: TO DO %</div>
                        </div>
                        <div className="route-images">
                            {
                                data.route.images.map((image, index) => (
                                    <img key={ index } src={ '/storage/users-images/' + image.img_url } alt="Route image"/>
                                )) 
                                
                            }
                            
                        </div>
                    </div>

                    <div className="map-container">
                        <DisplayMapWithRoute zoom='13' url={'/storage/gpx/' + data.route.url} centerCoordinates={[data.route.lon, data.route.lat]} />
                    </div>
                    </>
                )
        }
      </div>
      )  
}

export default RouteDetail;