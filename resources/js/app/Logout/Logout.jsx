import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function Logout( props ) {
    const [redirect, setRedirect] =useState();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.post('/logout');
            if (response.status === 204) {
                props.fetchUser();
                setRedirect('/');
            }
    }

    if (redirect) {
        return (
            <Redirect to={ redirect } />
        )
    } else {
        return (
            <a href="#" onClick={ handleSubmit }>Logout</a>
        )
    }

}