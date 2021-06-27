import { useState,useEffect } from 'react';

import Card from '../UI/Card';
import MealsItem from './SubMeals/MealsItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {

    const [fetchMeals,setFetchMeals] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(null);
 
    useEffect(() => {

      const fetchDataMeals = async () => {

        const responsive = await fetch("https://jiji-order-food-default-rtdb.firebaseio.com/meals.json");
        const data = await responsive.json();
  
        const dataMeals = [];
        for (const key in data) {
            dataMeals.push({
                id : key,
                name : data[key].name,
                description : data[key].description,
                price : data[key].price,
                srcImg : data[key].srcImg,
          })
        }

        setFetchMeals(dataMeals);
        setIsLoading(false);
      }

      fetchDataMeals()
      .catch((error) => {
        setIsError(error.message);
        setIsLoading(false);
      });

    },[])

    if(isLoading){
      return <h2 className={classes.mealsLoading}>Đợi tí....</h2>
    }
    if(isError){
      return <h2 className={classes.mealsError}>{isError}</h2>
    }


    const mealsList = fetchMeals.map(
          meal => 
              <MealsItem 
                  key={meal.id}
                  id={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                  srcImg={meal.srcImg}
              />
      )

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    )
}
export default AvailableMeals;