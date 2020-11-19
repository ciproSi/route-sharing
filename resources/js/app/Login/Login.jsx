import React, {useState, useEffect} from 'react';
import ApiClient from '../ApiClient';

export default function Login({ fetchUser }) {

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

   const response = await ApiClient.post('/login', {
      body: JSON.stringify(values)
  });

  if (response.status === 200) {
      // we are logged in!
      fetchUser(); // tell App to fetch the user again
  } else {
      // display an error message?
  }
}


   return(
      <div>
         <h1>Login</h1>
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
      </div> 
   );
}