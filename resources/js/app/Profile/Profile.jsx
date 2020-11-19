import React, {useState, useEffect, useContext} from 'react';

import CreateDog from '../Dog/CreateDog.jsx';

export default function Profile(props) 
{
    const user_id =  props.user.id && props.user.id;
    console.log(user_id);
    

   // return 'Hello';
    //console.log(props.user.id);
    return (

        <div>
             <p>{ props.user.name }</p>
            <p>{ props.user.surname }</p> 
            <CreateDog user_id={user_id}/>

        </div>   
    )
}