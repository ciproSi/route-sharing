import React, { useState, useEffect, useContext } from 'react';
import CreateDog from '../Dog/CreateDog.jsx';
import DogView from '../Dog/DogView.jsx';
import ProfilePicture from '../Register/ProfilePicture.jsx';
import UserOwnedRoutes from '../UserOwnedRoutes/UserOwnedRoutes';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { UserContext } from '../App/App.jsx';

export default function Profile (props) 
{
    
    const [addNewDog, setAddNewDog] = useState(false);
    const user = useContext(UserContext);
    const [profilePicture, setProfilePicture] = useState(null);
    const [dogs, setDogs] = useState(null);
    const [activeTab, setActiveTab] = useState();

    const loadData = async () => {
        if (user) {
            const id = user.id;
            const url = `/api/dog/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            setDogs(data);
            setProfilePicture(user.photo);
            setActiveTab('dogs'); 
        }
    }

    useEffect(() => {
        loadData();
    }, [user]) 

    const handleTab = (e) => {
        setActiveTab(e.target.innerHTML);
    }

    // conditional redenring for tabs
    let tabElm;
    let dogInput;
    console.log(dogs);
    if (activeTab == 'Your dogs') {
        
        if (addNewDog) {
            dogInput = (
                <div className="create-dog-form">
                        <CreateDog setDogs = { setDogs } dogs = { dogs } setAddNewDog={ setAddNewDog } /> 
                </div>
            )
        }
        tabElm = (
            <div className="profile-row">
                {/* show all dogs here */}
                <DogView dogs= { dogs }/>
                <Button variant="contained" color="primary" onClick={ () => {setAddNewDog(!addNewDog)} }>
                    Add new best friend
                </Button>
            </div>
        )
    } else if (activeTab == 'Your routes') {
        tabElm = (
            <UserOwnedRoutes userID = { user.id }/>
        )
    }

    if (user === null) {
        return ('Loading...')
    } else {

        return (
            
            <div>
                <p>{ user.name } { user.surname }</p>
                <ProfilePicture userPhoto={ profilePicture } setProfilePicture={ setProfilePicture }/> 
                
                
                <div className="tabs">
                    <ButtonGroup color="secondary" variant="text" aria-label="outlined primary button group">
                        <Button onClick={ handleTab }>Your routes</Button>
                        <Button onClick={ handleTab }>Your dogs</Button>
                        <Button onClick={ handleTab }>Bucket list</Button>
                    </ButtonGroup>
                </div>
            { tabElm }
            { dogInput }
                
                
            </div>   
        )
    }
}