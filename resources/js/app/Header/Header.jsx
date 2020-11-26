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

const useStyles = makeStyles((theme) => ({
    button: {
        fontSize: theme.spacing(2.5),
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

    const handleProfile = () => {
        setAnchorEl(null);
        setRedirect('/profile');
    }

    const handleLogout = async () => {
        setAnchorEl(null);
        const response = await axios.post('/logout');
            if (response.status === 204) {
                props.fetchUser();
                setRedirect('/');
            }

        // setRedirect('/logout');
    }

    return( 
        <div className="header">
            <div className="header-links">
                <Button
                    onClick={ () => { setRedirect ('/')} }
                    color="secondary"
                    className={ classes.button }
                >
                    Find a route
                </Button>
            </div>
            <div className="header-profile">
            {user ? (
                    <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={ handleMenu }
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
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
                        <MenuItem onClick={ handleProfile }>My routes</MenuItem>
                        <MenuItem onClick={ handleProfile }>My dogs</MenuItem>
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
                
            {redirect && ( <Redirect to={ redirect } /> )}

        </div>
        
   </div>
   );
}

export default Header;




    // <header>
    //     <nav>
    //         <Link to='/'>Home</Link>
    //         {
    //                 user !== null ? (
    //                     <>
    //                     <Link to="/profile">{ user.name }</Link>
    //                     <Link to="/new-route">New route</Link>
    //                     <Logout fetchUser={ props.fetchUser } />
    //                     </>
    //                 ) : (
    //                     <>
    //                         <Link to="/login">Login</Link>

    //                         <Link to="/register">Register</Link>
    //                     </>
    //                 )
    //             }
    //     </nav>
    // </header>
