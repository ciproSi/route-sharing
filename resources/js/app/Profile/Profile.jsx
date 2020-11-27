import React, { useState, useEffect, useContext } from 'react';
import CreateDog from '../Dog/CreateDog.jsx';
import DogView from '../Dog/DogView.jsx';
import ProfilePicture from '../Register/ProfilePicture.jsx';
import UserOwnedRoutes from '../UserOwnedRoutes/UserOwnedRoutes';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { UserContext } from '../App/App.jsx';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cont: {
        maxWidth: 250,
        minWidth: 250,
        margin: 10,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    dogFrom: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

export default function Profile (props) 
{
    
    const user = useContext(UserContext);
    const [addNewDog, setAddNewDog] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [dogs, setDogs] = useState(null);
    const [activeTab, setActiveTab] = useState();
    const classes = useStyles();

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

    useEffect(() => {
        props.fetchUser();
    }, [profilePicture])

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
            <div className={classes.dogForm}>
                {/* show all dogs here */}
                <Button variant="contained" color="primary" onClick={ () => {setAddNewDog(!addNewDog)} }>
                    Add new best friend
                </Button>
                <DogView dogs= { dogs }/>
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
                <Container maxWidth="xs" className={classes.cont}>
                    <Typography gutterBottom variant="h3" component="h2">
                        { user.name } { user.surname }
                    </Typography>
                    <ProfilePicture userPhoto={ profilePicture } setProfilePicture={ setProfilePicture }/> 
                </Container>            
                
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