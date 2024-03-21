import {
  IngredientOptionType,
  SelectedIngredientListProps,
} from '../common/types';

const SelectedIngredientList = (props: SelectedIngredientListProps) => {
  const { selectedIngredients, removeIngredient } = props;

  let ingredientsArray: JSX.Element[] = [];
  selectedIngredients.forEach(
    (ingredient: IngredientOptionType, index: number) => {
      const separator =
        index === selectedIngredients.length - 1 ? <></> : <hr />;
      ingredientsArray.push(
        <li onClick={() => removeIngredient(ingredient)}>
          {' '}
          {ingredient.label}
          {separator}
        </li>
      );
    }
  );

  return <div className={'selected-ingredient-list'}>{ingredientsArray}</div>;
};

export default SelectedIngredientList;
