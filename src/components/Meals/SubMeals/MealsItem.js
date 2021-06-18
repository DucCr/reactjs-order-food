import { useContext } from 'react';
import CartContext from '../../../store/cart-context';

import MealsForm from './MealsForm';
import classes from './MealsItem.module.css';

const MealsItem = props => {
    //làm tròn 2 số thập phân
    const price = props.price.toFixed(2);

    /*
    gọi useContext 
    gọi onAddToCart khi click Add --> gọi addToCartHandler(item) qua useContext
    --> gọi dispatchCart --> state update , component re-render
    */
    const ctxCart = useContext(CartContext);
    const onAddToCart = (amount) => {
        ctxCart.addItem({
            id : props.id,
            name : props.name,
            amount : amount,
            price : props.price
        }) 
    }
    
    return(
        <li className={classes['meal-form']}>
            <div className={classes.meal}>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>${price}</div>
            </div>
            <div className={classes.meal}>
                <MealsForm submitHandler={onAddToCart} id={props.id} />
            </div>
        </li>
    )
}
export default MealsItem;