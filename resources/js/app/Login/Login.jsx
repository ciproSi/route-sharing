import React, {useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../App/App.jsx';
import axios from 'axios';

export default function Login({ fetchUser }) {
    const user = useContext(UserContext);
    
    const [redirect, setRedirect] = useState(null);
    const [values, setValues] = useState({
      email: '',
      password: '',
    }); 

    const handleChange = (event) => {
        const allowed_names = ['email', 'password'],
            name = event.target.name,
            value = event.target.value

        if (-1 !== allowed_names.indexOf(name)) {
            setValues(prev_values => {
                return({
                    ...prev_values,
                    [name]:value    
                });
            });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.post('/login', values);

        if (response.status === 200) {
            // we are logged in!
            fetchUser(); // tell App to fetch the user again
            setRedirect('/profile');
        } else {
            // display an error message?
        }
    }

    if (redirect) {
        return (
            <Redirect to={ redirect } />
        )
    }
    return(
        <div>
            <h1>Login</h1>
            {
                user == null ? (
                    <form action="/login" method="post" className="login-form" onSubmit={ handleSubmit }>
                        <div className="form_group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email"  value={ values.email } onChange={ handleChange }/>
                        </div>

                        <div className="form_group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={ values.password } onChange={ handleChange } />
                        </div>
                        <button>Log in</button>
                    </form>
                
                // protection from showing the login form to logged in users
                ) : (
                    <h3>You are already logged in.</h3>
                )
            }
            
            
        </div> 
    );
}