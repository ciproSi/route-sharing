import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));


const SearchBox = (props) => {
    const classes = useStyles();
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
        <Container component="main" maxWidth="xs">
            <form onSubmit={ handleSubmit }>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="search"
                    label="Search for any place"
                    name="search"
                    autoComplete="searchValue"
                    autoFocus
                    onChange={ handleChange }
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={ handleSubmit }
                  >
                    Search
                  </Button>
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
        </Container>

    )

}

export default SearchBox;
