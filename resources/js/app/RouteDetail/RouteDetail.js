import React from 'react'
import { useParams } from 'react-router-dom';

const RouteDetail = () => {
    const { id } = useParams();
    console.log(id);
    
    return (
        <div>Ahoj</div>

    )
}

export default RouteDetail;