import { Fragment } from 'react';

import ButtonCart from './ButtonCart';
import classes from './Header.module.css';
import imgMeals from '../../assets/meals.jpg';

const Header = props => {

    return(
    <Fragment>
        <header className={classes.header}>
            <h1>JiJi-Meals</h1>
            <ButtonCart openButtonCart={props.openButtonCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={imgMeals} alt="meals" />
        </div>
    </Fragment>
    )
}
export default Header;