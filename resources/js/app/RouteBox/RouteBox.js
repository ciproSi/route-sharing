import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      minWidth: 345,
      margin: 10,
    },
    media: {
      height: 200,
    },
  });

const RouteBox = (props) => {
    const classes = useStyles();
    const { route } = props;
    const [redirect, setRedirect] = useState();

    let cardImage;
    if (route.images.length > 0) {
        cardImage = '/storage/users-images/' + route.images[0].img_url;
        console.log(cardImage);
    } else {
        cardImage = '/storage/logo/t4d_test_logo.png';
        console.log(cardImage);
    }

    if (redirect) {
        return (
            <Redirect to={ redirect }></Redirect>
        )
    }
    return (
        <Card variant="outlined" className={classes.root} onClick={ () => { setRedirect('/route/' + route.id) } }>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={ cardImage }
                    title="route main image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        { route.name }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        { route.description }
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={ () => { setRedirect('/route/' + route.id) } }>
                    Show more
                </Button>
            </CardActions>
    </Card>
        
        
        
    )
}
export default RouteBox;

{/* <div className="route-box">
            <div className="route-name">
                <Typography variant="h3">{ route.name }</Typography>
            </div>
            <div className="route-data">
                <div className="route-data__item">{ route.length / 1000 } km</div>
                <div className="route-data__item">{ route.elevation_gain } m</div>
                <div className="route-data__item">{ route.difficulty } / 5</div>
            </div>
            <div className="suitale-for">
                {
                    route.activities.map((activity, index) => (
                        <div key= { index } className="suitale-for__item">
                            { activity.name }
                        </div>
                    ))
                }
            </div>
            <div className="route-images">
                {
                    route.images.map((image, index) => (
                        <img key={ index } src={ '/storage/users-images/' + image.img_url } alt="Route image"/>
                    )) 
                }
            </div>
        </div>
        </>  */}