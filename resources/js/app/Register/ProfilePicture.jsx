import React, {useState, useContext, useEffect,} from 'react';
import {UserContext} from '../App/App.jsx';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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
    medium: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
  }));


export default function ProfilePicture (props) {
    const classes = useStyles();
    const [userImage, setUserImage] = useState([]);
    const user = useContext(UserContext);
    
    const { userPhoto, setProfilePicture } = props;
    
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

        if (response.status === 200) {
            setProfilePicture(response.data.file_name);
            setAddPicture(false);
        }
    };

    // determine if we have profile picture or if we need to show avatar place holder
    let avatar;
    if (userPhoto !== null) {
        avatar = (
            <Avatar alt="Profile picture" className={ classes.large } src={ '/storage/users-images/' + userPhoto } />
        )    
    } else {
        // avatar place holder is user's initials
        const userNameFirstLetter = user.name.charAt(0);
        const userSurnameFirstLetter = user.surname.charAt(0);
        avatar = (
            <Avatar className={ classes.medium }>{ userNameFirstLetter } { userSurnameFirstLetter }</Avatar>
        )
    }

    if (user === null) {
        return ('Loading...')
    } else {
        return (
            <>
                {/* return avatar conditionally rendered above */}
                { avatar }

                <Button color="primary" onClick={ () => {setAddPicture(!addPicture)} }>
                    Change profile picture
                </Button>
                { 
                    addPicture ? (
                        <form onSubmit={ handleSubmit }>
                            <div className="formElement">
                                <label htmlFor="user-pic">Choose your picture</label>
                                <input type="file" name="user-pic" onChange={ handleFileChange } />
                            </div>

                            <button type="submit">Change your profile picture</button>


                        </form>
                    ) : ('')
                }
            </>
    )
    }
}
