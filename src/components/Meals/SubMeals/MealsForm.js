import { useRef } from 'react';

import Input from '../../UI/Input';
import classes from './MealsForm.module.css';

const MealsForm = (props) => {
    const refAmount = useRef('');
      
    // click ADD --> truyền con trỏ hàm submitHandler
    const onSubmitHandler = event => {
        event.preventDefault();
        const enteredAmout = refAmount.current.value;

        //chuyển string về number;
        const enteredAmoutNumber = +enteredAmout;
        props.submitHandler(enteredAmoutNumber);
    }
    
    return (
        <form onSubmit={onSubmitHandler} className={classes.form}>
            <Input  
                ref={refAmount}
                label = 'Amount'
                inputObject={{ 
                    id : props.id,
                    type : 'number',
                    min : '1',
                    max : '7',
                    step: '1',
                    defaultValue : '1',
                }}
            />
            <button>Add</button>        
        </form>
    )
}
export default MealsForm;