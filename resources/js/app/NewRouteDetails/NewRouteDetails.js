import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import Checkbox from '../Checkbox/Checkbox'

const NewRouteDetails = (props) => {
    const [redirect, setRedirect] = useState(null);
    const [activities, setActivities] = useState([]);
    const [routeImages, setRouteImages] = useState([]);
    const [routeDetails, setRouteDetails] = useState({
        difficulty: '',
        description: '',
        visibility: 'public',
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
                <form action="/new-route" onSubmit={ handleSubmit } >
                    
                    <div className="form-group">
                        <label htmlFor="difficulty">Difficulty (1-5)</label>
                        <input type="text" name="difficulty" onChange={ handleChange }/>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" rows="8" cols="60" onChange={ handleChange } />
                    </div>
                    
                    <h3>Suitable for</h3>
                    {/* adds one checkbox for every activity */}
                    <Checkbox checkboxes={ activities} handleChange={ handleCheckBoxChange }/>

                    <div className="form-group">
                        <label htmlFor="visibility">Route visibility:</label>
                            <select id="visibility" name="visibility" onChange={ handleChange }>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                    </div>

                    <div className="form-group">
                            <label htmlFor="route_image">Choose route picture</label>
                            <input type="file" name="route_images" onChange={ handleFileChange } multiple/>
                    </div>

                    <button>Save new route</button>
                </form>
            </div>
        )
    }
}

export default NewRouteDetails;