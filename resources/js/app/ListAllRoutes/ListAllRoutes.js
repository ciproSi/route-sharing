import React from 'react';
import {Link} from 'react-router-dom';

const ListAllRoutes = (props) => {
        return (
            <div className="route-list">
                {
                    props.routes.map((route, index) => (
                        
                        <div key={ index } className="route-list__name">
                            <Link to={'/route/' + route.id }> { route.name } </Link>
                        </div> 
                    ))

                }
            </div>
        )
}

export default ListAllRoutes;