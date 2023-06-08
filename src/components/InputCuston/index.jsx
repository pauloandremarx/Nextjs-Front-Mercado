import React from 'react'

const InputCuston = ({type, name, placeholder, handleOnchange, icon, value, filter, defaultValue}) => {
    return (

        <div className="mb-3" >
            <div className="uk-inline uk-width-1-1" >
                <label>{placeholder}</label>
                <input  className="form-control"  name={name} id={name} type={type} placeholder={placeholder} data-js={filter}  onChange={handleOnchange} value={value} defaultValue={defaultValue} />
            </div>
        </div>

    )
}

export default InputCuston