import React, { useState, useEffect, useContext } from 'react';
import CreateDog from '../Dog/CreateDog.jsx';
import DogView from '../Dog/DogView.jsx';
import ProfilePicture from '../Register/ProfilePicture.jsx';
import { UserContext } from '../App/App.jsx';

export default function Profile (props) 
{
    const user = useContext(UserContext);
    
    const [dogs, setDogs] = useState(null);

    const loadData = async () => {
        if (user) {
            const id = user.id;
            const url = `/api/dog/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setDogs(data); 
        }
    }

    useEffect(() => {
        loadData();
    }, [user]) 

    if (user === null) {
        return ('Loading...')
    } else {
        console.log(dogs);

        return (

            <div>
                
                <p>{ user.name }</p>
                <p>{ user.surname }</p> 
                <DogView dogs= { dogs }/>
                <CreateDog setDogs = { setDogs } dogs = { dogs } />
                <ProfilePicture /> 
            </div>   
        )
    }
}