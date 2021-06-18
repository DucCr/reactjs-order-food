import { useContext } from 'react';

import CartItem from './CartItem';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';

const Cart = props => {
    const ctxCart = useContext(CartContext);
    const totalAmounts = ctxCart.totalAmount.toFixed(2);
    const onAddHandler = (item) => {
        //để khi click amount + 1
        ctxCart.addItem({...item,amount : 1});
    }
    const onRemoveHandler = (id) => {
        ctxCart.removeItem(id);
    }
    const cartItems = <ul className={classes['cart-items']}>{ctxCart.items.map(item => {
                                return (<CartItem 
                                            key={item.id} 
                                            name={item.name} 
                                            amount={item.amount} 
                                            price={item.price} 
                                            onAdd={onAddHandler.bind(null,item)}
                                            onRemove={onRemoveHandler.bind(null,item.id)}
                                        />)
                                }
                        )}
                      </ul>
                      
    const isOrder = ctxCart.items.length > 1;
    
    return(
        <Modal closeButtonCart={props.closeButtonCart}>
            {cartItems}
            <div className={classes.total}>
                <span className={classes['span-total']}>Total Amount</span>
                <span className={classes['span-price']}>${totalAmounts}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.closeButtonCart} className={classes['button--alt']}>Close</button>
                {isOrder && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;