import React from 'react';
import {Link} from 'react-router-dom';
import RouteBox from '../RouteBox/RouteBox';

const ListAllRoutes = (props) => {
        return (
            <div className="route-list">
                {
                    props.routes.map((route, index) => (

                        <RouteBox key={ index } route={ route } />
                        

                    ))

                }
            </div>
        )
}

export default ListAllRoutes;