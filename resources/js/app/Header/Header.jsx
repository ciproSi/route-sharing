import React, {useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Logout/Logout.jsx';
import { UserContext } from '../App/App.jsx';

const Header = (props) => {
    const user = useContext(UserContext);

    return( 
    <header>
        <nav>
            <Link to='/'>Home</Link>
            {
                    user !== null ? (
                        <>
                        <Link to="/profile">{ user.name }</Link>
                        <Link to="/new-route">New route</Link>
                        <Logout fetchUser={ props.fetchUser } />
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

export default Header;