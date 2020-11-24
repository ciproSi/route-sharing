import React, {useState, useEffect, useContext} from 'react';

import CreateDog from '../Dog/CreateDog.jsx';

import {UserContext} from '../App/App.jsx';
import DogView from '../Dog/DogView.jsx';

export default function Profile(props) 
{


    const user = useContext(UserContext);
    const [dogs, setDogs] = useState(null);
    
    const id = user.id;

    const url = `/api/dog/${id}`;

    const loadData = async () => {
        if (user) {
            const response = await fetch(url);
            const data = await response.json();

            setDogs(data); 

        } else {
            return 'loading...';
        }
    }

    useEffect(() => {
        loadData();
        
    }, []) 

    if (user === null) {
        return ('Loading...')
    } else {
    return (

        <div>
             <p>{ user.name }</p>
            <p>{ user.surname }</p> 
            <DogView dogs= { dogs }/>
            <CreateDog setDogs = { setDogs } dogs={ dogs } /> 

        </div>   
    )}
}