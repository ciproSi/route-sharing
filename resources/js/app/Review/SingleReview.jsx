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
        // marginTop: theme.spacing(0.8),
        // marginBottom: theme.spacing(0.8),
        maxWidth: 600,
    },
    inline: {
        display: 'inline',
      },
    
  }));


  export default function SingleReview (props) {
    const classes = useStyles();

    const { review } = props;

    let avatar;
    
    if (review.user.photo !== null) {
        console.log(review.user)
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
             <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    { avatar }
                </ListItemAvatar>
                <ListItemText 
                    primary={ "Rating: " + review.rating }
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                        >
                           {'by: '+ review.user.name + " " + review.user.surname + ': ' + review.text}
                        </Typography>
                            {/* <Typography>
                            {review.text}
                            </Typography> */}
                        </React.Fragment>
                    }
                />
                <ListItemText
                primary={ 'Difficulty: ' + review.difficulty }
                
                />
            </ListItem>  
            <Divider className={ classes.divider } component="li" />
        </>
    )




  }