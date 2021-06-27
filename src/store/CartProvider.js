import { useReducer } from "react";

import CartContext from "./cart-context";

// khai báo giá trị ban đầu của state
const defaultCartState = {
    items : [],
    totalAmount : 0
}
const cartReducer = (state,action) => {
    let updateItems = [...state.items];
    if(action.type === 'ADD_ITEM_CART'){
        let updateTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        let index = state.items.findIndex( element => element.id === action.item.id )
        
        //item có trong giỏ -> amount + sl
        if(index !== -1){
            //cập nhật lại amount
            const updateItem = {
                ...updateItems[index],
                amount : action.item.amount + updateItems[index].amount
            }
            updateItems[index] = updateItem;//ghi đề item 
        }
        
        //item chưa có trong giỏ -> thêm vào giỏ
        else{
            updateItems = state.items.concat(action.item);
        }
        return {
            items : updateItems,
            totalAmount : updateTotalAmount,
        }
    }

    if(action.type === 'REMOVE_ITEM_CART'){
        const index = state.items.findIndex( element => element.id === action.id);
        //lấy ra meal đang được trỏ 
        let updateItem = updateItems[index];
        if(updateItem.amount === 1){
            //xóa khỏi list cart
            updateItems = updateItems.filter(element => element.id !== action.id)
        }
        else{
            //số lượng - 1
            updateItem = {...updateItem,amount : updateItem.amount - 1}
            updateItems[index] = updateItem;
        }
        //giảm tổng tiền 
        let updateTotalAmount = state.totalAmount - updateItem.price;
        return {
            items : updateItems,
            totalAmount : updateTotalAmount,
        }    
    }

    if(action.type === 'CLEAN') {
        return defaultCartState;
    }
    
    return defaultCartState;
}

const CartProvider = (props) => {

    const [cartState,dispatchCart] = useReducer(cartReducer,defaultCartState);

    const addItemToCart = (item) => {
        dispatchCart({
            type : 'ADD_ITEM_CART',
            item : item,
        })
    }
    const removeItemToCart = (id) => {
        dispatchCart({
            type : 'REMOVE_ITEM_CART',
            id : id,
        })
    }
    const cleanCart = () => {
        dispatchCart({
            type : 'CLEAN',
        })
    }

    const cartContext = {
        items : cartState.items ,
        totalAmount : cartState.totalAmount ,
        addItem : addItemToCart,
        removeItem : removeItemToCart,
        cleanCart : cleanCart,
    }
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartProvider;