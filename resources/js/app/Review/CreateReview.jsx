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
