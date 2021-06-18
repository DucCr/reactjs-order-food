
import Card from '../UI/Card';
import MealsItem from './SubMeals/MealsItem';
import classes from './AvailableMeals.module.css'

const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
    {
      id: 'm5',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 42.1239,
    },
    {
      id: 'm6',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 34.2345,
    },
    {
      id: 'm7',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 10.999,
    },
    {
      id: 'm8',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 15.99,
    },
  ];

const AvailableMeals = () => {

    const mealsList = DUMMY_MEALS.map(
        meal => 
            <MealsItem 
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
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