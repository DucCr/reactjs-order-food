import { useReducer } from "react";

const initInput = {
    value : '',
    isTouch : false,
}

const inputReducer = (state,action) => {

    if(action.type === 'CHANGE'){
        return({
            value : action.item,
            isTouch : false,
        })
    }
    if(action.type === 'BLUR'){
        return({
            value : state.value,
            isTouch : action.item,
        })
    }
    if(action.type === 'RESET'){
        return initInput;
    }

    return initInput;
}

const InputForm = (validate) => {
    
    const [inputState,dispatchInputState ] = useReducer(inputReducer,initInput)

    const isValid = validate(inputState.value);

    const isError = !isValid && inputState.isTouch;

    const inputChangeHandler = event => {
        dispatchInputState({
            type : 'CHANGE',
            item : event.target.value,
        })
    }
    const inputBlurHandler = () => {
        dispatchInputState({
            type : 'BLUR',
            item : true,
        })
    }
    const reset = () => {
        dispatchInputState({
            type : 'RESET',
        })
    }

    return {
        value : inputState.value,
        isValid,
        isError,
        onBlur : inputBlurHandler,
        onChange : inputChangeHandler,
        reset, 
    }
}   
export default InputForm;