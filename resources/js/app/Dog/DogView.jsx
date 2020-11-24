import React, {useState, useEffect, useContext} from 'react';
import ReactDOM from 'react-dom';
import {UserContext} from '../App/App.jsx';

export default function DogView () {
    const [dogs, setDogs] = useState(null);
    const user = useContext(UserContext);

    const id = user.id;

    const url = `http://www.trek4dog.test/api/dog/${id}`;

    

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

      if (dogs !== null) {
          console.log(dogs)
     return(
         //'Dogs' // zjistit proč nejde map()
         <ul>
            { dogs.dogs.map(dog => (

                <li key={ dog.id }>

                    <p>{ dog.name }</p>
                    <p>{dog.breed}</p>
                    <img  src={ '/storage/app/public/users-images/' + dog.image } alt="image of dog"/>
                    <hr/>
                    
                </li> 
            ))}  
        </ul>   
    ) 
    } else {  
        return ('Loading...')
      }  


}