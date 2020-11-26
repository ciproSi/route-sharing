import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import DisplayMapWithRoute from '../DisplayMapWithRoute/DisplayMapWithRoute';
import NewRouteDetails from '../NewRouteDetails/NewRouteDetails';
import { UserContext } from '../App/App.jsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    header: {
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    routeName: {
        color: theme.palette.text.primary,
    },
    data: {
        marginRight: theme.spacing(3),
        color: theme.palette.text.primary,
        fontFamily: theme.typography.h1.fontFamily,
    }
   
}));

const GPXUploadForm = () => {
    const classes = useStyles();
    const user = useContext(UserContext);

    const [routeName, setRouteName] = useState('');
    const [GPXFile, setGPXFile] = useState([]);
    const [GPXUploaded, setGPXUploaded] = useState(false);
    const [routeData, setRouteData] = useState({});

    const handleChange = (e) => {
        setRouteName(e.target.value);
    }
    
    const handleFileChange = (e) => {
        setGPXFile(e.target.files[0]);
    }


    const handleSubmit = async (e) => {
        
        e.preventDefault();

        let fd = new FormData();
        fd.append("GPXFile", GPXFile, GPXFile.name);
        fd.append('routeName', routeName);
        fd.append('userID', user.id);
        
        // send the data to API
        const response = await axios.post('/new-route', fd);
        
        if (response.status === 200) {
            
            //fetch the just saved data from DB (it was parsed meantime by back-end)
            await fetchRoute(response.data.route_id);

            //this will cause the next step of new route addition to render
            setGPXUploaded(true);
        }

        // TO DO: handle back-end errors
        
    }

    const fetchRoute = async (routeID) => {
        const response = await axios.get('/api/route/' + routeID);

        setRouteData({
            'name': response.data.route.name,
            'length': response.data.route.length,
            'elevation': response.data.route.elevation_gain,
            'url': response.data.route.url,
            'id': response.data.route.id,
            'lat': response.data.route.lat,
            'lon': response.data.route.lon
        });
        
    }

    if (user === null) {
        return ('not logged in');
    }
    
    
    if (GPXUploaded === false) {
        // first step of route addition - show only input for gpx upload and route name
        return (

            <Container maxWidth="xs">
                <Typography variant="h3"
                    className={classes.header}
                >
                    You are helping the others by creating new route. Thank you!
                </Typography>
                <form onSubmit={ handleSubmit }>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="routeName"
                    label="Route name"
                    name="routeName"
                    autoComplete="routeName"
                    autoFocus
                    onChange={ handleChange }
                  />
                  <div className="form-group">
                    <label htmlFor="gpxfile">Choose GPX file of route</label>
                    <input type="file" name="gpxfile" onChange={ handleFileChange }/>
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={ handleSubmit }
                  >
                    Next step
                  </Button>
            </form>
            </Container>
    
        )
    } else {
        
        // GPX already uploaded? = show route info + map + fillable fields for adding more details
        // deconstruct fetch data
        const { name, length, elevation, url, lat, lon } = routeData;
        
        // prepare variables for DisplayMapWithRoute component
        const routeURL = '/storage/gpx/' + url,
              centerCoordinates = [lon, lat],
              zoom = 12;

        return (
            <div className="new-route-form">
                <div className="route-details-container">
                    <Typography
                        variant="h3"
                        className={classes.routeName}
                    >
                        { name }    
                    </Typography>
                    <div className="route-addition-data">
                        <Typography
                            variant="h6"
                            className={classes.data}
                        >
                            Length: { length / 1000 } km     
                        </Typography>
                        <Typography
                            variant="h6"
                            className={classes.data}
                        >
                            |    
                        </Typography>
                        <Typography
                            variant="h6"
                            className={classes.data}
                        >
                            Total elevation: { elevation } m    
                        </Typography>
                    </div>
                    
                    <NewRouteDetails data={routeData}/>
                
                </div>
                <div className="map-container">
                    
                    <DisplayMapWithRoute zoom={zoom} url={routeURL} centerCoordinates={centerCoordinates} />
                
                </div>                
            </div>

        )
    }

    
}

export default GPXUploadForm;