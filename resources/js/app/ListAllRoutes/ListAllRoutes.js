import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const ListAllRoutes = () => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchData = async () => {
        const response = await axios.get('/api/routes');
        
        console.log(response)
        if (response.status === 200) {
            setRoutes(response.data.routes);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    if (loading) {
        return (
            <h3>Loading</h3>
        )

    } else {

        return (
            <div className="route-list">
                {
                    routes.map((route, index) => (
                        
                        <div key={ index } className="route-list__name">
                            <Link to={'/route/' + route.id }> { route.name } </Link>
                        </div> 
                    ))

                }
            </div>
        )
    }
}

export default ListAllRoutes;