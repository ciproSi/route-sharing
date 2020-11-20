import React, { useState } from 'react'

const Checkbox = (props) => {
    
    // commented part only needed when living as standalone component
    // const [checkboxes, setCheckboxes] = useState([
    //     {id: 1, name: 'canicross', checked: false},
    //     {id: 2, name: 'bikejoring', checked: false},
    //     {id: 3, name: 'dogtrekking', checked: false}
    // ]);
    
    // const handleChange = (e) => {
        
    //     const checkBoxIndex = checkboxes.findIndex((elm => elm.name == e.target.name));
        
    //     checkboxes[checkBoxIndex].checked = !checkboxes[checkBoxIndex].checked

    //     setCheckboxes([...checkboxes]);
    // }
    // const { checkboxes, handleChange } = props;
    return (
        <div className="checkbox-group">
            {
                props.checkboxes.map((checkbox) => (
                    <div key={ checkbox.id } className="form-group">
                            <label htmlFor={ checkbox.name }>

                            <input id={ checkbox.name } type="checkbox" name={ checkbox.name } checked={ checkbox.checked } onChange={ props.handleChange } />
                            { checkbox.name } 
                            </label>   
                    </div>
                ))
            }
        </div>
        

    )
}

export default Checkbox;