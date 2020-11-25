import React, {useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../App/App.jsx';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function Login({ fetchUser }) {
    const user = useContext(UserContext);
    
    const classes = useStyles();
    
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

    if (user == null ) {
        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                  <Box width={200}> 
                    <img src="/storage/logo/Trek4dog_Logo_Green.svg" alt="trek4dog logo"/>
                  </Box>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={ handleChange }
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={ handleChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={ handleSubmit }
                  >
                    Sign In
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                        <Button
                            onClick={ () => { setRedirect ('/register')} }
                            color="primary"
                        >
                            Don't have an account? Sign Up
                        </Button>
                        
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          );
    } else {
        setRedirect('/profile');
    }
    
}