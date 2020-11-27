import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Autorenew } from '@material-ui/icons';
// import ReactDOM from 'react-dom';
// import {UserContext} from '../App/App.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        minWidth: 345,
        margin: 10,
      },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },

}));

export default function DogView (props) {
    
    const classes = useStyles();
    
    const { dogs } = props;

    if (dogs !== null) {
          console.log(dogs)
     return(
         <div className="dogs-list">
            {
                dogs.dogs.map(dog => (

                    <Card key={ dog.id } variant="outlined" className={classes.root}>
                        
                            <Avatar alt="Dog picture" className={ classes.large } src={ '/storage/users-images/' + dog.image } />
                        
                        <CardContent>
                        <Typography variant="h5" component="h2">
                            { dog.name }
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            { dog.breed }
                        </Typography>
                        </CardContent>
                    </Card>

                ))
            }  
            
        </div>   
    ) 
    } else {  
        return ('No dogs')
      }  


}