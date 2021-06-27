import {Fragment, useContext, useState } from 'react';

import CartItem from './CartItem';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import OrderForm from '../Order/OrderForm';

const Cart = props => {

    const [orderClick,setOrderClick] = useState(false);

    const ctxCart = useContext(CartContext);
    const totalAmounts = ctxCart.totalAmount.toFixed(2);

    const onAddHandler = (item) => {
        //để khi click amount + 1
        ctxCart.addItem({...item,amount : 1});
    }
    const onRemoveHandler = (id) => {
        ctxCart.removeItem(id);
    }

    const orderClickHandler = () => {
        setOrderClick(true);
    }

    const cartItems = 
    <ul className={classes['cart-items']}>{ctxCart.items.map(item => {
        return (
            <CartItem 
                    key={item.id} 
                    name={item.name} 
                    amount={item.amount} 
                    price={item.price} 
                    srcImg={item.srcImg}
                    onAdd={onAddHandler.bind(null,item)}
                    onRemove={onRemoveHandler.bind(null,item.id)}
                />
        )
        }
)}
</ul>
                      
    const isOrder = ctxCart.items.length > 0;

    const showCartItem = 
    <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span className={classes['span-total']}>Total Amount</span>
                <span className={classes['span-price']}>${totalAmounts}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.closeButtonCart} className={classes['button--alt']}>Close</button>
                {isOrder && <button className={classes.button} onClick={orderClickHandler}>Order</button>}
            </div>
    </Fragment>

    
    return(
        <Modal closeButtonCart={props.closeButtonCart}>
            {!orderClick && showCartItem}
            {orderClick && <OrderForm onClick={props.closeButtonCart}/>}
        </Modal>
    )
}

export default Cart;