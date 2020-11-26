import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SingleReview from '../Review/SingleReview.jsx';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
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
/*                             <Card variant="outlined" key={ review.id } className={classes.root}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">{ review.user.name } </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">{ review.user.surname  }</Typography>
                                    <Typography gutterBottom variant="h5" component="h2">Review: </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">{ review.text }</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">Rating: { review.rating }</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">Difficulty: { review.difficulty }</Typography>
                                </CardContent>
                            </Card> */
                        ))
                    }
            </ List>
        )
    } else {
        return('No reviews yet.')
    }
}