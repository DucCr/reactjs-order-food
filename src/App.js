import { useState } from 'react';

import Meals from './components/Meals/Meals';
import Header from './components/Layout/Header';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import './index.css';
const App = () => {

  const [cartIsShow,setCartIsShow] = useState(false); 

    const showCartHandler = () => {
      setCartIsShow(true);
    }
    const hideCartHandler = () => {
      setCartIsShow(false);
    }

  return (
    <CartProvider>
      {cartIsShow && <Cart closeButtonCart={hideCartHandler}/>}
      <Header openButtonCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
