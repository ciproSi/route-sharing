import React, {useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';

import Logout from '../Logout/Logout.jsx';


export default function Header({ user, fetchUser }) {
    console.log({user});
   return( 
    <header>
        <nav>
            <Link to='/'>Home</Link>
            {
                    user !== null ? (
                        <>
                        <Link to="/profile">{ user.name }</Link>
                        <Logout fetchUser={ fetchUser } />
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>

                            <Link to="/register">Register</Link>
                        </>
                    )
                }
        </nav>
    </header>
   );
}