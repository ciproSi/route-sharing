import React, {useState, useEffect, useContext} from 'react';
import ReactDOM from 'react-dom';
import {UserContext} from '../App/App.jsx';

export default function DogView (props) {
    
    const { dogs } = props;


    if (dogs !== null) {
          console.log(dogs)
     return(
         <div className="dogs-list">
            {
                dogs.dogs.map(dog => (
                    <div key={ dog.id } className="dog-container">
                        <div className="dog-image-box">
                            <img className="dog-image" src={ '/storage/users-images/' + dog.image } alt="image of dog"/>
                        </div>
                        <div className="dog-data">
                            <div className="dog-data__name"><p>{ dog.name }</p></div>
                            <div className="dog-data__breed">{ dog.breed }</div>
                        </div>
                    </div>

                ))
            }  
        </div>   
    ) 
    } else {  
        return ('Loading...')
      }  


}