import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DisplayMapWithRoute from '../DisplayMapWithRoute/DisplayMapWithRoute';
import CreateReview from '../Review/CreateReview';

const RouteDetail = () => {
    // get the id from url to fetch specific route and its relations
    const { id } = useParams();
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayImagesOnMap, setDisplayImagesOnMap] = useState(false);

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
                    <div className="route-data__name">{ data.route.name } <span className="route-data__author">(author: { data.route.user.name } { data.route.user.surname })</span></div>
                        <div className="route-data">
                            <div className="route-data__item">Total elevation: { data.route.elevation_gain } m</div>
                            <div className="route-data__item">Distance: { data.route.length / 1000 } km</div>
                            <div className="route-data__item">Difficulty: { data.route.difficulty } / 5</div>
                            <div className="route-data__item">Ratings: TO DO %</div>
                        </div>
                        <div className="route-description">
                            <div className="route-description__header"><h4>Description:</h4></div>
                            <div className="route-description__content">{ data.route.description }</div>
                        </div>
                        <div className="suitable-for">
                            <div className="suitable-for__header"><h4>Suitable for</h4></div>
                                {
                                    data.route.activities.map((activity, index) => (
                                        <div key= { index } className="suitale-for__item">
                                            { activity.name }
                                        </div>
                                    ))
                                }
                        </div>
                        <div className="route-images">
                            <div className="route-images__header"><h4>Route images:</h4></div>
                            <div className="div-link" onClick={ () => {setDisplayImagesOnMap(!displayImagesOnMap)} }>
                                {
                                displayImagesOnMap ? ('Hide images from map') : ('Show images on the map')
                                }
                                
                                
                            </div>
                            {
                                data.route.images.map((image, index) => (
                                    <img key={ index } src={ '/storage/users-images/' + image.img_url } alt="Route image"/>
                                )) 
                                
                            }
                            
                        </div>
                        
                        <CreateReview route_id={ data.route.id } />

                    </div>

                    <div className="map-container">
                        <DisplayMapWithRoute 
                            zoom='13' url={'/storage/gpx/' + data.route.url}
                            centerCoordinates={[data.route.lon, data.route.lat]}
                            images ={ data.route.images}
                            displayImagesOnMap = { displayImagesOnMap }
                        />
                    </div>
                    </>
                )
        }
      </div>
      )  
}

export default RouteDetail;