import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListAllRoutes from '../ListAllRoutes/ListAllRoutes';
import DisplayMapWithPoints from '../DisplayMapWithPoints/DisplayMapWithpoints';
import SearchBox from '../SearchBox/SearchBox';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        textAlign: 'center',
    }
  }));

const Search = () => {
    const classes = useStyles();
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [waitingForSearchInput, setWaitingForSearchInput] = useState(true);

    const fetchData = async (queryData) => {
        setWaitingForSearchInput(false);

        // constructing query URL for API - logic of search itself is done serverside
        let queryURL = '';
        
        // we assume that the function is getting coordinates if the queryData is array
        if (Array.isArray(queryData)) {
            queryURL = '/api/routes?lon=' + queryData[0] + '&lat=' + queryData[1];
        } else {
            queryURL = '/api/routes?all=true';
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
            <div className="landing-page">
                <div><img src="/storage/logo/Trek4dog_Logo_Green.svg" alt="trek4dog logo" width="200"/></div>
                <Container maxWidth="sm">
                        
                        <Typography variant="h2" className={ classes.header }>
                            Find the best route for your best friend
                        </Typography>
                    
                    <SearchBox handleSearchInput={ fetchData }/>
                    <Button
                        type="submit"
                        color="primary"
                        fullWidth
                        onClick={() => {fetchData('all')}}
                    >
                        Show all routes
                    </Button>
                </Container>
            </div>
            
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
                    <Button
                    type="submit"
                    color="primary"
                    fullWidth
                    onClick={() => {fetchData('all')}}
                    >
                        Show all routes
                    </Button>
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