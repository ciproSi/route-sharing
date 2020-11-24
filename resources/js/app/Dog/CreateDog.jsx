import React, {useState, useContext} from 'react';
import {UserContext} from '../App/App.jsx';
import axios from 'axios';


export default function CreateDog (props) {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [dogImage, setDogImage] = useState([]);
    const user = useContext(UserContext);

    const user_id = user.id;
    //const user_id = props.user_id;

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    
    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    }

    const handleFileChange = (event) => {
        setDogImage(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('form submitting', {name, breed});

        let dog = new FormData();
        
        // append one image


        dog.append('dogImage', dogImage, dogImage.name );
        

        dog.append('name', name);
        dog.append('breed', breed);

/*         const data = {
            name,
            breed
        }; */

        //const url = '/api/user/' + user_id + '/dog';

        const response = await axios.post('/api/user/' + user_id + '/dog', dog);


         
/*         fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: data
        }).then(() => {
            console.log('success')
            setName('');
            setBreed('');
        })*/
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="formElement">
                    <label htmlFor="name">
                        Name
                        <input type="text" name="name" value={name} onChange={ handleNameChange } />
                    </label>
                </div>
                <div className="formElement">
                    <label htmlFor="breed">
                        Breed
                        <input type="text" name="breed" value={breed} onChange={ handleBreedChange } />
                    </label>
                </div>
                <div className="formElement">
                            <label htmlFor="dog-pic">Choose dog picture</label>
                            <input type="file" name="dog-pic" onChange={ handleFileChange } />
                </div>

                <button type="submit">Submit</button>
            </form>
        </>
    )
    
}
