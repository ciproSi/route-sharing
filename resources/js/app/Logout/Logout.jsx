import React, { useState, useEffect } from 'react';
import ApiClient from '../ApiClient';

export default function Logout({ fetchUser }) {

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await ApiClient.post('/logout');

        fetchUser(); // tell App to fetch the user again (and find out that he is logged-out)
    }

    return (
        <a href="#" onClick={ handleSubmit }>Logout</a>
    )

}