import React, { useEffect, useState } from 'react';
import RouteBox from '../RouteBox/RouteBox';
import axios from 'axios';

// import { UserContext } from '../App/App.jsx';

const UserOwnedRoutes = (props) => {
    
    const [data, setData] = useState({'loading': true, 'routes': ''});
    // const [loading, setLoading] = useState(true);
    const { userID } = props;

    // const user = useContext(UserContext);
    const fetchUserRoutes = async (userID) => {
        const response = await axios.get('/api/routes?usr=' + userID);

        if (response.status === 200) {
            setData({
                'loading': false,
                'routes': response.data.routes
            });
            // setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserRoutes(userID);
    }, []);

    if (data.loading) {
        return (
            <div className="loader">Loading...</div>
        )
    } else {
        return (
            <div className="routes-list-cards">
                {
                    data.routes.map((route, index) => (
                        // <div> { route.name } </div>
                        <RouteBox key={ index } route={ route } />

                    ))
                }
            </div>
        )
    }
    
}

export default UserOwnedRoutes;