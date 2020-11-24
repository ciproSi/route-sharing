import React from 'react'

const RouteBox = (props) => {

    const { route } = props;

    return (
        <div className="route-box">
            <div className="route-name"><h3>{ route.name }</h3></div>
            <div className="route-data">
                <div className="route-data__item">{ route.length / 1000 } km</div>
                <div className="route-data__item">{ route.elevation_gain } m</div>
                <div className="route-data__item">{ route.difficulty } / 5</div>
            </div>
            <div className="suitale-for">
                {
                    route.activities.map((activity, index) => (
                        <div key= { index } className="suitale-for__item">
                            { activity.name }
                        </div>
                    ))
                }
            </div>
            <div className="route-images">
                {
                    route.images.map((image, index) => (
                        <img key={ index } src={ '/storage/users-images/' + image.img_url } alt="Route image"/>
                    )) 
                }
            </div>
        </div>
    )
}
export default RouteBox;