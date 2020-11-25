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
import RouteDetail from '../RouteDetail/RouteDetail.js';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../Theme/first-theme';



export const UserContext = createContext({user: null});

export default function App() {

    const [user, setUser] = useState(null);
    
    

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

    //if

    return (
        < UserContext.Provider value={ user }>
            <ThemeProvider theme={ theme }>
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
                        <Route path="/profile" children={<Profile />}/>
                        <Route path="/new-route" children={ <GPXUploadForm /> } />
                        <Route path="/route/:id" children={<RouteDetail /> } />
                    </Switch>
                </main>

            </Router>
            </ThemeProvider>
        </UserContext.Provider>
    )
}