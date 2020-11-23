import axios from 'axios';
import React, {useState, useEffect} from 'react';

export default function Register() {

    const [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const [errors, setErrors] = useState ({});

    const handleChange = (event) => {
        const allowed_names = ['name', 'surname', 'email', 'password', 'password_confirmation'],
            name = event.target.name,
            value = event.target.value

        if (-1 !== allowed_names.indexOf(name)) {
            setValues(prev_values => {
                return({...prev_values,
                    [name]:value    
                });
            });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.post('/register', values);
            
        console.log(response);
    }


   return( 
       <form action="/register" method="post" className="register-form" onSubmit={ handleSubmit }>
            <div className="form-group">

                <label htmlFor="name">Name</label>

                <input type="text" name="name" value={ values.name } onChange={ handleChange } />

{/*                 {
                    errors.name !== undefined ? (
                        <div className="field-errors">
                            {
                                errors.name.map(error => (
                                    <div className="field-errors__error">{ error }</div>
                                ))
                            }
                        </div>
                    ) : ''
                } */}

            </div>

            <div className="form_group">
               <label htmlFor="surname">Surname</label>
               <input type="text" name="surname" value={ values.surname } onChange={ handleChange }/>
           </div>

           <div className="form_group">
               <label htmlFor="email">Email</label>
               <input type="email" name="email" value={ values.email } onChange={ handleChange }/>
           </div>

           <div className="form_group">
               <label htmlFor="password">Password</label>
               <input type="password" name="password" value={ values.password } onChange={ handleChange }/>
           </div>

           <div className="form_group">
               <label htmlFor="password_confirmation">Password Confirmation</label>
               <input type="password" name="password_confirmation" value={ values.password_confirmation } onChange={ handleChange }/>
           </div>
           <div className="form_group">
               <button>Register</button>
           </div> 
       </form>
   );
}