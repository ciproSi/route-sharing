import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SingleReview from '../Review/SingleReview.jsx';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }));

export default function ReviewView (props) {
    const classes = useStyles();
    const { reviews } = props;



    if (reviews !== null) {
        return(
            <List className={classes.root}>
                    {
                        reviews.map(review => (
                            <SingleReview key={review.id} review= { review }/>
                        ))
                    }
            </ List>
        )
    } else {
        return('No reviews yet.')
    }
}