import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import Checkbox from '../Checkbox/Checkbox'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    // width of the difficulty slider
    root: {
      width: 300,
    },
    description:{
        maxWidth: 600,
    },
    formControl: {
        margin: theme.spacing(0.5),
        minWidth: 120,
    },
    divider: {
        marginTop: theme.spacing(0.8),
        marginBottom: theme.spacing(0.8),
        maxWidth: 600,
    },
    submit: {
        marginTop: theme.spacing(1),
    }
  }));
  
// needed for difficulty slider
function valuetext(value) {
    return value;
}

const NewRouteDetails = (props) => {
    const classes = useStyles();
    const [redirect, setRedirect] = useState(null);
    const [activities, setActivities] = useState([]);
    const [routeImages, setRouteImages] = useState([]);
    const [routeDetails, setRouteDetails] = useState({
        difficulty: 1,
        description: '',
        visibility: 1,
        activities: []
    });

    // get all available activities (routes are suitable for different activities) from API
    const fetchActivities = async () => {
        const response = await axios.get('/api/activities');
        
        // add property checked:false to array of activities objects
        response.data.activities.forEach(activity => {
            activity.checked = false;
        });
        
        setActivities(response.data.activities);
    }

    // fetch activities only once
    useEffect(() => {
        fetchActivities();
    }, []);

    const handleCheckBoxChange = (e) => {
        const checkBoxIndex = activities.findIndex((elm => elm.name == e.target.name));
        activities[checkBoxIndex].checked = !activities[checkBoxIndex].checked;
        setActivities([...activities]);
    }

    const handleFileChange = (e) => {
        setRouteImages(e.target.files);
    }

    // set the route difficutly to state while preserving the others values
    const handleDifficultyChange = (event, newValue) => {
        console.log(newValue);
        setRouteDetails(prevValues => {
            return ({...prevValues,
                     'difficulty': newValue
            })
        });
    }
    
    const handleChange = (e) => {
        const allowedNames = ['difficulty', 'description', 'visibility'],
              name = e.target.name,
              value = e.target.value;
        
        if (-1 !== allowedNames.indexOf(name)) {
            setRouteDetails(prevValues => {
                return ({...prevValues,
                         [name]: value
                })
            });
        }
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        // add ids (those ids are activity id from db) of checked activities to to routeDetails
        // it also prevents to add one id multiple time, if there is validation error and the form is submitted more time
        activities.forEach(activity => {
            if (activity.checked && routeDetails.activities.includes(activity.id) == false) {
                
                routeDetails.activities.push(activity.id);
            }
        })
        
        // prepera data to be sent
        let fd = new FormData();
        
        // append all images
        for (let i = 0; i < routeImages.length; i++) {
            const routeImagesName = 'routeImages[' + i + ']';
            fd.append(routeImagesName, routeImages[i], routeImages[i].name);
        }
        
        
        fd.append('difficulty', routeDetails.difficulty);
        fd.append('description', routeDetails.description);
        fd.append('visibility', routeDetails.visibility);
        fd.append('activities', JSON.stringify(routeDetails.activities));

        const response = await axios.post('/route/' + props.data.id, fd);
        
        if (response.status === 200) {
            setRedirect('/');
        }

    }

    if (redirect) {
        return (
            <Redirect to={redirect} />
        )
    } else {
        return ( 

            <div className="form">
                <form  onSubmit={ handleSubmit } >
                
                    <Typography id="discrete-slider" gutterBottom>
                        How would you rate diffulty? ({ routeDetails.difficulty } / 5)
                    </Typography>
                    <div>
                        <Slider
                            className={ classes.root }
                            defaultValue={1}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={5}
                            name="difficulty"
                            value={ routeDetails.difficulty }
                            onChange= { handleDifficultyChange }
                        />

                        

                    </div>
                    
                    <TextField
                        id="description"
                        name="description"
                        label="Route description"
                        multiline
                        fullWidth
                        className={ classes.description }
                        rows={8}
                        variant="outlined"
                        onChange={ handleChange }
                    />
                    
                    <Divider className={ classes.divider }/>

                    <Typography gutterBottom>
                        Choose all activities this route is suitable for
                    </Typography>
                    <Checkbox checkboxes={ activities} handleChange={ handleCheckBoxChange }/>
                    <Divider className={ classes.divider }/>

                    <Typography gutterBottom>
                        Route visibility
                    </Typography>

                    <FormControl variant="outlined" className={ classes.formControl }>
                        <Select
                            labelId="visibility-select-label"
                            id="visibility"
                            name="visibility"
                            value={ routeDetails.visibility }
                            onChange={ handleChange }
                        >
                            <MenuItem value={1}>Public</MenuItem>
                            <MenuItem value={0}>Private</MenuItem>
                        </Select>
                    </FormControl>

                    <div className="form-group">
                    <Typography gutterBottom>
                    Choose route pictures
                    </Typography>
                            {/* <label htmlFor="route_images">Choose route picture</label> */}
                            <input type="file" name="route_images" onChange={ handleFileChange } multiple/>
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={ classes.submit }
                        onClick={ handleSubmit }
                    >
                    Save the route
                  </Button>
                    
                </form>
            </div>
        )
    }
}

export default NewRouteDetails;