import { MealItem } from "./MealItem";
import useHttp from "../hooks/useHttp";

const resquestConfig = {};

export function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", resquestConfig, []);
  
  if(isLoading){
    return <p className="center">Loading meals...</p>;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
