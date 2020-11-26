import React from 'react';

export default function ReviewView (props) {
    const { reviews } = props;

    if (reviews !== null) {
        return(
            <div className="reviews-list">
                {
                    reviews.map(review => (
                        <div key={ review.id } className="review-container">
                            <div className="review-name">{ review.user.name /* ? review.user.name : review_name */ }</div>
                            <div className="review-surname">{ review.user.surname /* ? review.user.surname : review_surname */ }</div>
                            <div className="review-rating">Rating: { review.rating }</div>
                            <div className="review-difficulty">Difficulty: { review.difficulty }</div>
                            <div className="review-text">Text: { review.text }</div>
                            <hr/>
                        </div>
                    ))
                }
            </div>
        )
    } else {
        return('No reviews yet.')
    }
}