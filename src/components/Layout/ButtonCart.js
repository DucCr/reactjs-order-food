import { useContext,useEffect,useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './ButtonCart.module.css';

const ButtonCart = (props) => {

    const ctxCart = useContext(CartContext);
    const totalMeals = ctxCart.items.reduce((accumulator,item) => {
        return accumulator + item.amount;
    },0)

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const { items } = ctxCart;

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);
        //cleanup chạy khi mà component unmount
        return () => {
            clearTimeout(timer);
        };
    }, [items]);
    return(
        <button onClick={props.openButtonCart} className={btnClasses}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{totalMeals}</span>
        </button>
    )
}

export default ButtonCart;