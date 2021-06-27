import { useContext } from 'react';
import Swal from 'sweetalert2';


import InputForm from './custom-hook/InputForm';
import classes from './OrderForm.module.css';
import CartContext from '../../store/cart-context';

const OrderForm = (props) => {
    const ctxCart = useContext(CartContext);

    //validate input your name
    const validateName = (name) => {
        let regex = /^[a-zA-Z0-9]{3,15}$/;
        let str = name;
        if(regex.test(str)){
            return true;
        }
        else{
            return false;
        }
    }

    const {
        value : enteredName,
        isValid : enteredNameIsValid,
        isError : nameIsError,
        onBlur : nameBlurHandler,
        onChange : nameChangeHandler,
        reset : nameReset,
    } = InputForm(validateName);

    

    //validate input email
    const validateEmail = (email) => {
        let regex = /^([_\-.0-9a-zA-Z]+)@([_\-.0-9a-zA-Z]+).([a-zA-Z]){2,7}$/;
        let str = email;
        if(regex.test(str)){
            return true;
        }
        else{
            return false;
        }
    }

    const {
        value : enteredEmail,
        isValid : enteredEmailIsValid,
        isError : emailIsError,
        onBlur : emailBlurHandler,
        onChange : emailChangeHandler,
        reset : emailReset,
    } = InputForm(validateEmail);

    //validate input address
    const validateAddress = (address) => {
        let regex = /^[a-zA-Z0-9]{7,30}$/;
        let str = address;
        if(regex.test(str)){
            return true;
        }
        else{
            return false;
        }
    }

    const {
        value : enteredAddress,
        isValid : enteredAddressIsValid,
        isError : addressIsError,
        onBlur : addressBlurHandler,
        onChange : addressChangeHandler,
        reset : addressReset,
    } = InputForm(validateAddress);

    //validate input phone number
    const validatePhone = (number) => {
        let regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        let str = number;
        if(regex.test(str)){
            return true;
        }
        else{
            return false;
        }
    }

    const {
        value : enteredPhone,
        isValid : enteredPhoneIsValid,
        isError : phoneIsError,
        onBlur : phoneBlurHandler,
        onChange : phoneChangeHandler,
        reset : phoneReset,
    } = InputForm(validatePhone);

    let formIsValid = true;
    if(enteredNameIsValid &&
       enteredEmailIsValid &&
       enteredAddressIsValid &&
       enteredPhoneIsValid ){
        formIsValid = false;
    }

    //gửi data user lên db
    const dataOrderHandler = async (dataUser) => {
        await fetch('https://jiji-order-food-default-rtdb.firebaseio.com/orders.json' , {
            method : 'POST',
            body : JSON.stringify({
                user : dataUser,
                orderedItem : {
                    items : ctxCart.items,
                    totalPrice : ctxCart.totalAmount,
                }
            })
        })
    };

    //xử lý khi submit
    const onSubmitHandler = (event) => {

        event.preventDefault();

        if(formIsValid){
            return;
        }

        nameReset();
        emailReset();
        addressReset();
        phoneReset();
        
        dataOrderHandler({
            name : enteredName,
            email : enteredEmail,
            address : enteredAddress,
            phone : enteredPhone,
        });

        ctxCart.cleanCart();
        success();
        props.onClick();
    }

    //sweet alert
    const success = () => {
        Swal.fire({
            icon: 'success',
            title: 'Successfully sent the order!',
            text: 'See you again!',
            footer: false,
          })
          
    }

    return (
            <form onSubmit={onSubmitHandler}>
                <div className={classes['form-group']}>
                    <label>Your Name</label>
                    <input 
                        type="text" 
                        value={enteredName}
                        onBlur={nameBlurHandler}
                        onChange={nameChangeHandler}
                    />
                    {nameIsError && 
                    <small className={classes['text-error']}>Your name is invalid! (3-15 characters) </small>}
                </div>
                <div className={classes['form-group']}>
                    <label>E-mail</label>
                    <input 
                        type="email" 
                        value={enteredEmail}
                        onBlur={emailBlurHandler}
                        onChange={emailChangeHandler}
                    />
                    {emailIsError && 
                    <small className={classes['text-error']}>E-mail is invalid! </small>}
                </div>
                <div className={classes['form-group']}>
                    <label>Address</label>
                    <input 
                        type="text" 
                        value={enteredAddress}
                        onBlur={addressBlurHandler}
                        onChange={addressChangeHandler}
                    />
                    {addressIsError && 
                    <small className={classes['text-error']}>Address is invalid! (7-30 characters)</small>}
                </div>
                <div className={classes['form-group']}>
                    <label>Phone Number</label>
                    <input 
                        type="text" 
                        value={enteredPhone}
                        onBlur={phoneBlurHandler}
                        onChange={phoneChangeHandler}
                    />
                    {phoneIsError && 
                    <small className={classes['text-error']}>Please enter the correct phone number ! </small>}
                </div>
                <div>
                    <button className={classes['form-action']} disabled={formIsValid}>Confirm</button>
                    <button className={classes['form-action']} onClick={props.onClick}>Cancel</button>
                </div>
            </form>
    )
}
export default OrderForm;