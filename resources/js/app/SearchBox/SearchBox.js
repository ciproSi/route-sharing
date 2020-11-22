import React, { useState } from 'react';
import axios from 'axios';

const SearchBox = (props) => {
    const [searchValue, setSearchvalue] = useState('');

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
            const centerCoordinates = [response.data.results[0].geometry.lng, response.data.results[0].geometry.lat]
            props.setSearchCoordinates(centerCoordinates);
            console.log(centerCoordinates);

        }
    }

    return (
        <form action="" onSubmit={ handleSubmit }>
            <input type="text" onChange={ handleChange }/>
            <button>Search</button>
        </form>
    )

}

export default SearchBox;
