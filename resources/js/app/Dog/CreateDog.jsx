import React, {useState} from 'react';


export default function CreateDog (props) {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const user_id = props.user_id;

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    
    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('form submitting', {name, breed, user_id});


        const data = {
            name,
            breed
        };

        const url = '/api/user/' + user_id + '/dog';
         
        fetch(url, {
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
        })
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
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
