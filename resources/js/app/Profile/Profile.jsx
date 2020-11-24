import React, { useState, useEffect, useContext } from 'react';
import CreateDog from '../Dog/CreateDog.jsx';
import DogView from '../Dog/DogView.jsx';
import UserOwnedRoutes from '../UserOwnedRoutes/UserOwnedRoutes';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { UserContext } from '../App/App.jsx';

export default function Profile (props) 
{
    const [addNewDog, setAddNewDog] = useState(false);
    const user = useContext(UserContext);
    
    const [dogs, setDogs] = useState(null);
    const [activeTab, setActiveTab] = useState();

    const loadData = async () => {
        if (user) {
            const id = user.id;
            const url = `/api/dog/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setDogs(data);
            setActiveTab('dogs'); 
        }
    }

    useEffect(() => {
        loadData();
    }, [user]) 

    const handleTab = (e) => {
        console.log(e.target.id);
        setActiveTab(e.target.id);
    }

    // conditional redenring for tabs
    let tabElm;
    let dogInput;
    if (activeTab == 'dogs') {
        
        if (addNewDog) {
            dogInput = (
                <div className="create-dog-form">
                        <CreateDog setDogs = { setDogs } dogs = { dogs } setAddNewDog={ setAddNewDog } /> 
                </div>
            )
        }
        tabElm = (
            <div className="profile-row">
                <DogView dogs= { dogs }/>
                <AddCircleIcon  style={{ fontSize: 60 }} onClick={ ()=>{setAddNewDog(!addNewDog)} }/>
            </div>
        )
    } else if (activeTab == 'routes') {
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
                <div className="tabs">
                    <div className="tab" id="routes" onClick={ handleTab }>Your routes</div>
                    <div className="tab" id="dogs" onClick={ handleTab }>Your dogs</div>
                    <div className="tab" id="bucket">Bucket list</div>

                </div>
            { tabElm }
            { dogInput }
                
            </div>   
        )
    }
}