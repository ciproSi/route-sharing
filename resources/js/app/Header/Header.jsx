import React, {useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Logout/Logout.jsx';
import { UserContext } from '../App/App.jsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    button: {
        fontSize: theme.spacing(2),
        marginRight: theme.spacing(3),
    },
    avatar: {
        width: theme.spacing(2.5),
        height: theme.spacing(2.5),
    }
  }));

const Header = (props) => {
    const user = useContext(UserContext);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [redirect, setRedirect] = useState();
    const open = Boolean(anchorEl);

    // showing the submenu when clicking on user avatar
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    // closing the submenu when clicking on user avatar
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = (e) => {
        setAnchorEl(null);
        
        // redirect based on item menu clicked
        if (e.target.innerHTML.includes('profile')) {
            setRedirect('/profile');
        } else if (e.target.innerHTML.includes('Create')) {
            setRedirect('/new-route');
        }
    }

    // logout user and redirect to home
    const handleLogout = async () => {
        setAnchorEl(null);
        const response = await axios.post('/logout');
            if (response.status === 204) {
                props.fetchUser();
                setRedirect('/');
            }

    }

    return( 
        <div className="header">
            <div className="header-logo">
                <Box width={100}
                     onClick={ () => { setRedirect ('/')} }
                > 
                    <img src="/storage/logo/Trek4dog_Logo_Green.svg" alt="trek4dog logo"/>
                </Box>
                
            </div>
            <div className="header-links">
                <div>
                <Button
                        onClick={ () => { setRedirect ('/')} }
                        color="secondary"
                        className={ classes.button }
                        variant="contained"
                    >
                        Find a route
                </Button>
                </div>
            {/* display login/user section depending on user login status */}
            {user ? (
                    // <div>
                    <div className="user-box">
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={ handleMenu }
                            color="inherit"
                        >
                            <Avatar alt="User profile picture" src={ '/storage/users-images/' + user.photo } />
                        </IconButton>
                        
                        <Typography onClick={ handleProfile }>
                            {user.name} {user.surname}
                        </Typography>
                    <Menu
                        id="menu-appbar"
                        anchorEl={ anchorEl }
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={ open }
                        onClose={ handleClose }
                    >
                        <MenuItem onClick={ handleProfile }>My profile</MenuItem>
                        <MenuItem onClick={ handleProfile }>Create new route</MenuItem>
                        <MenuItem onClick={ handleLogout }>Logout</MenuItem>
                    </Menu>
                    </div>
                    ) : (

                        <Button
                            onClick={ () => { setRedirect ('/login')} }
                            color="secondary"
                            className={ classes.button }
                        >
                            Login
                        </Button>
                    )}
                
            {/* you need to redirect as a last step to allow the header component to render first */}
            {redirect && ( <Redirect to={ redirect } /> )}

        </div>
        
   </div>
   );
}

export default Header;
