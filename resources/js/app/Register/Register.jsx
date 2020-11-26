import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
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

export default function Register(props) {
    const classes = useStyles();

    const [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const [redirect, setRedirect] = useState(null);


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

        if (response.status === 201) {
            // if the registration was successful, fetch the user in the topmost component
            props.fetchUser();
            setRedirect('/profile');
        }

    }

    if (redirect) {
        return (
            <Redirect to={ redirect } />
        )
    }

   return(
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Box width={200}>
            <img src="/storage/logo/Trek4dog_Logo_Green.svg" alt="trek4dog logo"/>
            </Box>
        <Typography component="h1" variant="h5">
            Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="First Name"
                autoFocus
                onChange={ handleChange }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="surname"
                label="Last Name"
                name="surname"
                autoComplete="surname"
                onChange={ handleChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={ handleChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={ handleChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_confirmation"
                label="Password"
                type="password"
                id="password_confirmation"
                autoComplete="password_confirmation"
                onChange={ handleChange }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ handleSubmit }
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
                <Button
                    onClick={ () => { setRedirect ('/login')} }
                    color="primary"
                >
                    Already have an account? Log in
                </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
   );
}