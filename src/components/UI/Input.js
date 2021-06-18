import React from 'react';

import classes from './Input.module.css';

//React.forWardRef bao fc, thêm tham số ref
const Input = React.forwardRef( (props ,ref) => {
    return(
        <div className={classes.input}>
            {/* 
            - <label> có htmlFor trùng với id của <input> để khi click vào label thì sẽ focus vào thẻ input
              có id trung 
            - dùng ES6 để thêm được các atribute vào thẻ input 
            */}
            <label htmlFor={props.inputObject.id}>{props.label}</label>
            <input ref={ref} {...props.inputObject}/>
        </div>
    )
})
export default Input;