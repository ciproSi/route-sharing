import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListAllRoutes from '../ListAllRoutes/ListAllRoutes';

const Search = () => {
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
            <h3>Loading...</h3>
        )
    } else {
        return (
            <>
                <ListAllRoutes routes={ routes } />
            </>
        )
    }
    
}

export default Search;