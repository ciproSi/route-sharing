import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListAllRoutes from '../ListAllRoutes/ListAllRoutes';
import DisplayMapWithPoints from '../DisplayMapWithPoints/DisplayMapWithpoints';
import SearchBox from '../SearchBox/SearchBox';

const Search = () => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [waitingForSearchInput, setWaitingForSearchInput] = useState(true);

    const fetchData = async (queryData) => {
        setWaitingForSearchInput(false);

        // constructing query URL for API - logic of search itself is done serverside
        let queryURL = '';
        
        // we assume that the function is getting coordinates if the queryData is array
        if (Array.isArray(queryData)) {
            queryURL = '/api/routes?lon=' + queryData[0] + '&lat=' + queryData[1] + '&all=false';
        } else {
            queryURL = '/api/routes?lon=&lat=&all=true';
        }
        
        const response = await axios.get(queryURL);
        
        console.log(response)
        if (response.status === 200) {
            setRoutes(response.data.routes);
            setLoading(false);
        }
    }

    if (waitingForSearchInput) {
        return (
            <>
                <h3>Search for dogroute anywhere in the world</h3>
                <SearchBox handleSearchInput={ fetchData }/>
                <button onClick={() => {fetchData('all')}}>Show all routes</button>
            </>
            
        )
    } else if (loading) {
        return (
            <h3>Loading...</h3>
        )
    } else {
        return (
            <div className="search-container">
                <div className="routes-list">
                    <SearchBox handleSearchInput={ fetchData }/>
                    <button onClick={() => {fetchData('all')}}>Show all routes</button>
                    <ListAllRoutes routes={ routes } />
                </div>
                <div className="map-container">
                    <DisplayMapWithPoints routes={ routes } zoom={ 5 } />
                </div>
            </div>
        )
    }
    
}

export default Search;