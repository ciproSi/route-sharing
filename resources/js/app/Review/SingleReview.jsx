import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ReviewView from './ReviewView';

const useStyles = makeStyles({
    inline: {
        display: 'inline',
      },
  });

  export default function SingleReview (props) {
    const classes = useStyles();

    const { review } = props;

    console.log(review);


    let avatar;
    if (review.user.photo !== null) {
        avatar = (
            <Avatar alt="Profile picture" className={ classes.large } src={ '/storage/users-images/' + review.user.photo } />
        )    
    } else {
        // avatar place holder is user's initials
        const userNameFirstLetter = review.user.name.charAt(0);
        const userSurnameFirstLetter = review.user.surname.charAt(0);
        avatar = (
            <Avatar className={ classes.medium }>{ userNameFirstLetter } { userSurnameFirstLetter }</Avatar>
        )
    }


    return(
        <>
             <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    { avatar }
                </ListItemAvatar>
                <ListItemText
                primary={"Rating: " + review.rating + "; Difficulty: " + review.difficulty}
                secondary={
                    <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        {review.user.name + " " + review.user.surname + ": "}
                    </Typography>
                        {review.text}
                    </React.Fragment>
                }
                />
            </ListItem>  
            <Divider variant="inset" component="li" />
        </>
    )




  }