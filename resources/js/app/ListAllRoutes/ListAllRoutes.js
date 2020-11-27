import React from 'react';
import {Link} from 'react-router-dom';
import RouteBox from '../RouteBox/RouteBox';
import Container from '@material-ui/core/Container';

const ListAllRoutes = (props) => {
        return (
            <Container component="main" maxWidth="xs">
            <div className="route-list">
                {
                    props.routes.map((route, index) => (

                        <RouteBox key={ index } route={ route } />
                        
                    ))

                }
            </div>
            </Container>
        )
}

export default ListAllRoutes;