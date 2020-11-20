import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RouteDetail = () => {
    // get the id from url to fetch specific route and its relations
    const { id } = useParams();
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const response = await axios.get('/route/' + id);

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
                    <div className="route-name">{ data.route.name }</div>
                )
        }
      </div>
      )  
}

export default RouteDetail;