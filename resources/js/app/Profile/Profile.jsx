import React, {useState, useEffect, useContext} from 'react';

import CreateDog from '../Dog/CreateDog.jsx';

import {UserContext} from '../App/App.jsx';
import DogView from '../Dog/DogView.jsx';

export default function Profile(props) 
{

    const user = useContext(UserContext)
    //const user_id =  props.user.id && props.user.id;
    console.log(user);
    

   // return 'Hello';
    //console.log(props.user.id);
    if (user === null) {
        return ('Loading...')
    } else {
    return (

        <div>
             <p>{ user.name }</p>
            <p>{ user.surname }</p> 
            <DogView />
            <CreateDog /> 

        </div>   
    )}
}