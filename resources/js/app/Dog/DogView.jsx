import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// import ReactDOM from 'react-dom';
// import {UserContext} from '../App/App.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
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
                    <div key={ dog.id } className="dog-container">
                        <div className="dog-image-box">
                            <Avatar alt="Dog picture" className={ classes.large } src={ '/storage/users-images/' + dog.image } />
                        </div>
                        <div className="dog-data">
                            <div className="dog-data__name"><p>{ dog.name }</p></div>
                            <div className="dog-data__breed">{ dog.breed }</div>
                        </div>
                    </div>

                ))
            }  
            
        </div>   
    ) 
    } else {  
        return ('No dogs')
      }  


}