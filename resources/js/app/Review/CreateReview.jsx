import React, {useState, useContext} from 'react';
import {UserContext} from '../App/App.jsx';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    description:{
        maxWidth: 600,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
      },
  }));

export default function CreateReview (props) {
    const classes = useStyles();
    const [difficulty, setDifficulty] = useState('');
    const [rating, setRating] = useState('');
    const [text, setText] = useState('');

    const user = useContext(UserContext);

  
    const { route_id } = props;

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value);
    }

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    }

    const handleTextChange = (event) => {
        setText(event.target.value);
    }

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        
        const user_id = user.id;
        let review = new FormData();

        review.append('user_id', user_id);
        review.append('difficulty', difficulty);
        review.append('rating', rating);
        review.append('text', text);

        const response = await axios.post('/route/' + route_id + '/review', review);
    

    if (response.status === 200) {
        const { reviews } = props;
        let newReviews = [...reviews];

        newReviews.push({
            'id': "a",
            'difficulty': response.data.diff,
            'rating': response.data.rating,
            'text': response.data.text,
            'user': {'name': user.name,
                     'surname': user.surname,
                    'photo': user.photo}
        });
        // close the add review form
        props.setAddReview(false);

        // send the new review so it can display directly without refetching
        props.setReviews([...newReviews]);
    }
}



    return (
        <>
            <Container maxWidth="xs">
                <form onSubmit={ handleSubmit }>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="difficulty"
                    label="Difficulty"
                    name="difficulty"
                    autoComplete="difficulty"
                    onChange={ handleDifficultyChange }
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="rating"
                    label="Rating (1-5)"
                    name="rating"
                    autoComplete="rating"
                    onChange={ handleRatingChange }
                  />
                  <TextField
                        id="review"
                        name="review"
                        label="Your review"
                        multiline
                        fullWidth
                        className={ classes.description }
                        rows={8}
                        variant="outlined"
                        onChange={ handleTextChange }
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={ classes.submit }
                        onClick={ handleSubmit }
                    >
                    Save your review
                  </Button>
            </form>
            </Container>
            </>
        )


    }
