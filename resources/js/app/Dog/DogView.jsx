import React, {useState, useEffect, useContext} from 'react';
import ReactDOM from 'react-dom';
import {UserContext} from '../App/App.jsx';

export default function DogView (props) {
    
    const { dogs } = props;


    if (dogs !== null) {
          console.log(dogs)
     return(
         <ul>
            { dogs.dogs.map(dog => (

                <li key={ dog.id }>

                    <p>{ dog.name }</p>
                    <p>{ dog.breed }</p>
                    <img  src={ '/storage/users-images/' + dog.image } alt="image of dog"/>
                    <hr/>
                    
                </li> 
            ))}  
        </ul>   
    ) 
    } else {  
        return ('Loading...')
      }  


}