import React, {useState, useContext, useEffect,} from 'react';
import {UserContext} from '../App/App.jsx';
import axios from 'axios';

export default function ProfilePicture () {
    const [picture, setPicture] = useState('');
    const user = useContext(UserContext);

    const id = user.id;

    const url = `/api/user/${id}/pic`;

    const loadData = async () => {
        if (user) {
            const response = await fetch(url);
            const data = await response.json();

            setPicture(data); 

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

    if ( picture !== null ) {
        return(
                <>
                    <img  src={ '/storage/users-images/' + user.image } alt="user image"/>
                    <form onSubmit={handleSubmit}>
                        <div className="formElement">
                        <label htmlFor="user-pic">Choose dog picture</label>
                        <input type="file" name="user-pic" onChange={ handleFileChange } />
                        </div>

                        <button type="submit">Change your profile picture</button>
                    </form>
                </>
        )} else {
            <>
                <img  src={ '/storage/users-images/Portrait_placeholder.png' } alt="user image"/>
                <form onSubmit={handleSubmit}>
                    <div className="formElement">
                    <label htmlFor="user-pic">Choose Your picture</label>
                    <input type="file" name="user-pic" onChange={ handleFileChange } />
                    </div>

                    <button type="submit">Add your profile picture</button>
                </form>
            </>
        }}
}
