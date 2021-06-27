import React from 'react';

//tạo 1 context để lưu trữ state và export
const CartContext = React.createContext({
    // items : [],
    // totalAmount : 0,
    // addItem : (item) => {},
    // removeItem : (id) => {},
});

export default CartContext;