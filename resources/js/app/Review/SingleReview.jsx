import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ReviewView from './ReviewView';

const useStyles = makeStyles((theme) => ({
    divider: {
        maxWidth: 600,
    },
    inline: {
        display: 'inline',
    },
    author: {
        fontSize: theme.spacing(1.8),
    }
    
  }));


  export default function SingleReview (props) {
    const classes = useStyles();

    const { review } = props;

    let avatar;
    
    if (review.user.photo !== null) {
        avatar = (
            <Avatar alt="Profile picture" src={ '/storage/users-images/' + review.user.photo } />
        )    
    } else {
        console.log(review.user.name.charAt(0))
        // avatar place holder is user's initials
        const userNameFirstLetter = review.user.name.charAt(0);
        const userSurnameFirstLetter = review.user.surname.charAt(0);
        avatar = (
            <Avatar className={ classes.large }>{ userNameFirstLetter } { userSurnameFirstLetter }</Avatar>
        )
    }


    return(
        <>
             
            <div className="single-review">
                <div className="single-review__avatar">
                    { avatar }
                </div>
                <div className="review-content">
                    <div className="review-content__main">
                        <div className="review-content__main__item">
                            <Typography variant="h5" className={ classes.reviewMain }>
                                Rating: { review.rating }
                            </Typography>
                        </div>
                        <div className="review-content__main__item">
                            <Typography variant="h5" className={ classes.reviewMain }>
                                Difficulty: { review.difficulty } 
                            </Typography>
                        </div>
                    </div>
                    <div className="review-content__author">
                        <Typography className={ classes.author }>
                            By: { review.user.name } { review.user.surname }
                        </Typography>
                    </div>
                    <div className="review-content__text">
                        <Typography>
                            { review.text }
                        </Typography>
                    </div>

                </div>
                 

             </div>
             <Divider className={ classes.divider } />
             
        </>
    )

  }
