import React, {useState, useEffect, createContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Home from '../Home/Home.jsx';
import Header from '../Header/Header.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import Profile from '../Profile/Profile.jsx';
import ApiClient from '../ApiClient.js';
import axios from 'axios';
import GPXUploadForm from '../GPXUploadForm/GPXUploadForm'; 

export default function App() {

    const [user, setUser] = useState(null);
    
    const UserContext = createContext(user);

    const fetchUser = async () => {
        const response = await ApiClient.get('/api/user');
        const response_data = await response.json();

        if (response_data.id !== undefined) { // if response contains id (user's id)
            setUser(response_data); // set the user in the state
        } else {
            setUser(null); // unset the user in the state
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        < UserContext.Provider value={ user }>
            <Router>

                <UserContext.Consumer>
                    {
                        value => (
                            <Header user={ value } fetchUser={ fetchUser }/>

                        )
                    }
                </UserContext.Consumer>

                <main>
                    <Switch>
                        <Route exact path="/" children={<Home/>}/>
                        <Route path="/login" children={<Login fetchUser={ fetchUser } />}/>
                        <Route path="/register" children={<Register/>}/>
                        <Route path="/profile" children={<Profile user={ user }/>}/>
                        <Route path="/new-route" children={ <GPXUploadForm /> } />
                    </Switch>
                </main>
            </Router>
        </UserContext.Provider>
    )
}