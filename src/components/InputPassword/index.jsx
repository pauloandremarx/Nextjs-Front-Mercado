import React, {useState} from 'react'




const InputPassword = ({name, placeholder, handleOnchange, value}) => {

    const [isHidePass, setHidePass] = useState(true);

    const toggleClass = () => {
        setHidePass(!isHidePass);
      };

     var hide = isHidePass ? 'uk-hidden' : 'uk-block'

      var block = isHidePass ? 'uk-block': 'uk-hidden'
    return (

        <div className="uk-margin uk-width-1-1">
            <div className="uk-inline uk-width-1-1 ">
                 <label>{placeholder}</label>
                <input onChange={handleOnchange} className="form-control" name={name} type={isHidePass ? 'password': 'text'} value={value}  placeholder={placeholder} />
            </div>
        </div>

    )
}

export default InputPassword