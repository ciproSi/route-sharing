import React, {useState, useContext} from 'react';
import {UserContext} from '../App/App.jsx';
import axios from 'axios';


export default function CreateReview (props) {
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
        const user_name = user.name;
        const user_surname = user.surname;
        let review = new FormData();

        review.append('user_id', user_id);
        review.append('difficulty', difficulty);
        review.append('rating', rating);
        review.append('text', text);
        review.append('user_name', user_name);
        review.append('user_surname', user_surname);

        const response = await axios.post('/route/' + route_id + '/review', review);
    }

    if (response.status === 200) {
        const { reviews } = props;
        reviews.reviews.push({
            'user_name': response.data.user_name,
            'rating': response.data.rating,
            'difficulty': response.data.difficulty,
            'user_id': response.data.user_id,
            'rating': response.data.rating,
    });



    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="formElement">
                    <label htmlFor="difficulty">
                        Difficulty
                        <input type="text" name="difficulty" value={difficulty} onChange={ handleDifficultyChange } />
                    </label>
                </div>

                <div className="formElement">
                    <label htmlFor="rating">
                        Rating
                        <input type="text" name="rating" value={rating} onChange={ handleRatingChange } />
                    </label>
                </div>

                <div className="formElement">
                    <label htmlFor="text">
                        Review
                        <textarea name="text" id="review" cols="30" rows="10" value={text} onChange={ handleTextChange }></textarea>
                    </label>
                </div>

                <button type="submit">Submit</button>
            </form>
            </>
        )


    }