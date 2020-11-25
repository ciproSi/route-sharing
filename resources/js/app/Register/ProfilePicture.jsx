import React, {useState, useContext, useEffect,} from 'react';
import {UserContext} from '../App/App.jsx';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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


export default function ProfilePicture () {
    const classes = useStyles();
    const [userImage, setUserImage] = useState([]);
    const user = useContext(UserContext);
    const userPhoto = user.photo
    const [addPicture, setAddPicture] = useState(false);

    const id = user.id;

    const handleFileChange = (event) => {
        setUserImage(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let picture = new FormData();

        picture.append('userImage', userImage, userImage.name );

        const response = await axios.post('/api/user/' + id + '/pic', picture);
    };
    console.log(userPhoto);

if (user === null) {
    return ('Loading...')
} else {
    //return ('Hee')

    if ( userPhoto !== null ) {
        return(
                <>
                    <Avatar alt="Profile picture" className={ classes.large } src={ '/storage/users-images/' + user.photo } />
                    {/* <img  src={ '/storage/users-images/' + user.photo } alt="user image"/> */}
                    <div onClick={() => {setAddPicture(true)}}>Change profile picture</div>
                    { addPicture ? (
                    <form onSubmit={handleSubmit}>
                        <div className="formElement">
                        <label htmlFor="user-pic">Choose your picture</label>
                        <input type="file" name="user-pic" onChange={ handleFileChange } />
                        </div>

                        <button type="submit">Change your profile picture</button>
                    </form>
                    ) : ('')
                    }
                </>
        )} else {
            return(
            <>
                <Avatar alt="Profile picture" className={ classes.large } src={ '/storage/users-images/' + user.photo } />
                {/* <img  src={ '/storage/users-images/Portrait_placeholder.png' } alt="user image"/> */}
                <div onClick={() => {setAddPicture(true)}}>Add profile picture</div>
                { addPicture ? (
                <form onSubmit={handleSubmit}>
                    <div className="formElement">
                    <label htmlFor="user-pic">Choose Your picture</label>
                    <input type="file" name="user-pic" onChange={ handleFileChange } />
                    </div>

                    <button type="submit">Add your profile picture</button>
                </form>
                    ) : ('')
                }                
            </>
            )
        }}
}
