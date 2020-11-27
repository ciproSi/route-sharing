import React, {useState, useContext} from 'react';
import {UserContext} from '../App/App.jsx';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    header: {
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    routeName: {
        color: theme.palette.text.primary,
    },
    data: {
        marginRight: theme.spacing(3),
        color: theme.palette.text.primary,
        fontFamily: theme.typography.h1.fontFamily,
    }
   
}));

export default function CreateDog (props) {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [dogImage, setDogImage] = useState([]);
    const [redirect, setRedirect] = useState();
    const classes = useStyles();

    const user = useContext(UserContext);

    const user_id = user.id;

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    
    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    }

    const handleFileChange = (event) => {
        setDogImage(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        console.log('form submitting', {name, breed});

        let dog = new FormData();
        
        // append one image


        dog.append('dogImage', dogImage, dogImage.name );
        

        dog.append('name', name);
        dog.append('breed', breed);

        const response = await axios.post('/api/user/' + user_id + '/dog', dog);

        if (response.status === 200) {
            
            // we get the newly saved dog from response so we can directly set him to state and doesn't need to refetch
            const { dogs } = props;
            dogs.dogs.push({
                    'name': response.data.name,
                    'breed': response.data.breed,
                    'image': response.data.file_name,
                    'id': response.data.dog_id
            });
            // set state in parent component which when false hide the form for dog addition
            props.setAddNewDog(false);
            
            props.setDogs({...dogs}); 

        }


         
    }

     
        return (
            <Container maxWidth="xs">
                                <Typography variant="h3"
                    className={classes.header}
                >
                    Create new dog.
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Dog name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={ handleNameChange }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="breed"
                        label="Breed"
                        name="breed"
                        autoComplete="breed"
                        autoFocus
                        onChange={ handleBreedChange }
                    />
                    <div className="formElement">
                        <label htmlFor="dog-pic">Choose dog picture</label>
                        <input type="file" name="dog-pic" onChange={ handleFileChange } />
                    </div>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={ handleSubmit }
                  >
                    Submit
                  </Button>
                </form>
            </Container>
/*             <>
                <form onSubmit={handleSubmit}>
                    <div className="formElement">
                        <label htmlFor="name">
                            Name
                            <input type="text" name="name" value={name} onChange={ handleNameChange } />
                        </label>
                    </div>
                    <div className="formElement">
                        <label htmlFor="breed">
                            Breed
                            <input type="text" name="breed" value={breed} onChange={ handleBreedChange } />
                        </label>
                    </div>
                    <div className="formElement">
                                <label htmlFor="dog-pic">Choose dog picture</label>
                                <input type="file" name="dog-pic" onChange={ handleFileChange } />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </> */
        )
        
}
