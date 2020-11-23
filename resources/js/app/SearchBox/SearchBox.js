import React, { useState } from 'react';
import axios from 'axios';

const SearchBox = (props) => {
    const [searchValue, setSearchvalue] = useState('');
    const [searchErrors, setSearchErrors] = useState(null);

    const handleChange = (e) => {
        setSearchvalue(e.target.value);
    }
    
    
    // for getting lon and lat coordinates we are using API OpenCageData
    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestURL = 
        'https://api.opencagedata.com/geocode/v1/json?q=' + searchValue + '&key=e4aac0f506894db1aeef5b3b870cd9e4'
        
        const response = await axios.get(requestURL);
        console.log(response);

        // we are using first result from response which seems to be always the most valid - needs to be observed in future
        if (response.status === 200) {
            if (response.data.results.length > 0) {
                const centerCoordinates = [response.data.results[0].geometry.lng, response.data.results[0].geometry.lat]
                setSearchErrors(null);
                
                // we are passing centercoordinates to parent component which use them for fetching data from our API
                props.handleSearchInput(centerCoordinates);
            } else {
                setSearchErrors('Nothing found, try to be more specific. We are looking for routes in radius of 50km...');
            }

        }
    }
    return (
        <div>
            <form action="" onSubmit={ handleSubmit }>
                <input type="text" onChange={ handleChange }/>
                <button>Search</button>
            </form>
            {
                searchErrors ? (
                <div className="search-errors">
                    {searchErrors}            
                </div>
                ) : (
                    <div className="search-errors">
                </div>
                )
            }
            
        </div>

    )

}

export default SearchBox;
