import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DisplayMapWithRoute from '../DisplayMapWithRoute/DisplayMapWithRoute';
import CreateReview from '../Review/CreateReview';
import ReviewView from '../Review/ReviewView';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { UserContext } from '../App/App.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 300,
    },
    divider: {
        marginTop: theme.spacing(0.8),
        marginBottom: theme.spacing(0.8),
        maxWidth: 600,
    },
    header: {
        color: theme.palette.text.primary,
    },
  }));

const RouteDetail = () => {
    const classes = useStyles();
    const user = useContext(UserContext);

    // get the id from url to fetch specific route and its relations
    const { id } = useParams();
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayImagesOnMap, setDisplayImagesOnMap] = useState(false);
    const [reviews, setReviews] = useState(null);
    // const [createReviewElm, setCreateReviewElm] = useState();
    const [addReview, setAddReview] = useState(false);
    
    const fetchData = async () => {
        const response = await axios.get('/api/route/' + id);

        if (response.status === 200) {
            setData(response.data);
            setReviews(response.data.route.reviews);
            setLoading(false);
        }

    }
  
    useEffect(() => {
        fetchData();
    }, []);

    let reviewForm;
    if (addReview) {
        reviewForm = (
            <CreateReview reviews={ reviews } setReviews={ setReviews } setAddReview={ setAddReview } route_id={ data.route.id } />
        )
    }

    return (
        <div className="route-detail-container">
        {
            loading ? 
                (
                    <h3>Loading</h3>
                ) : (
                    <>
                    
                    <div className="route-data-container">
                        <div className="route-data__name">
                            <Typography variant="h2">
                                { data.route.name }
                            </Typography>
                        </div>
                        <div className="route-data">
                            <Typography variant="h3">
                                Total elevation: { data.route.elevation_gain } m
                            </Typography>
                            <Typography variant="h3">
                                Distance: { data.route.length / 1000 } km
                            </Typography>
                            <Typography variant="h3">
                                Difficulty: { data.route.difficulty } / 5
                            </Typography>
                        </div>
                        <Typography>
                                (author: { data.route.user.name } { data.route.user.surname })
                        </Typography>

                        <div className="route-images">
                            {
                                data.route.images.map((image, index) => (
                                    <img key={ index } src={ '/storage/users-images/' + image.img_url } alt="Route image"/>     
                                )) 
                                
                            }
                        </div>
                        <Button
                            onClick={ () => {setDisplayImagesOnMap(!displayImagesOnMap)} }
                            color="primary"
                        >
                        {
                        displayImagesOnMap ? ('Hide images from map') : ('Show images on the map')
                        }
                        </Button>

                        <div className="route-description">
                            <Typography variant="h3" className={ classes.header} >
                                Route description:
                            </Typography>
                            <Typography>
                                { data.route.description }
                            </Typography>
                        </div>
                        <Divider className={ classes.divider }/>
                        <div className="suitable-for">
                            <Typography variant="h3" className={ classes.header} >
                                This route is suitable for those activities:
                            </Typography>
                                {
                                    data.route.activities.map((activity, index) => (
                                        <Typography key={ index }>
                                            { activity.name }
                                        </Typography>
                                    ))
                                }
                        </div>
                        <Divider className={ classes.divider }/>
                        <Typography variant="h3"
                            className={classes.header}
                        >
                            Reviews:
                        </Typography>
                        
                        {user &&
                        <Button
                            onClick={ () => {setAddReview(!addReview)} }
                            color="primary"
                        >
                            {
                            addReview ? ('Hide review form') : ('Add review')
                            }
                        </Button>
                        
                        }
                        {/* form for adding review (element constructed above return contionaly) */}
                        { reviewForm }
                        
                        {/* show all reviews */}
                        <ReviewView reviews={ reviews } />

                    </div>

                    <div className="map-container">
                        <DisplayMapWithRoute 
                            zoom='13' url={'/storage/gpx/' + data.route.url}
                            centerCoordinates={[data.route.lon, data.route.lat]}
                            images ={ data.route.images}
                            displayImagesOnMap = { displayImagesOnMap }
                        />
                    </div>
                    </>
                )
        }
      </div>
      )  
}

export default RouteDetail;