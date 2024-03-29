import {
  IngredientDescriptionType,
  IngredientListProps,
} from '../common/types';

const IngredientCard = (props: IngredientListProps) => {
  const { ingredients, isMissingIngredientList } = props;

  const ingredientListClass = isMissingIngredientList
    ? 'missed-ingredients'
    : 'used-ingredients';

  const titleOfList = isMissingIngredientList
    ? 'What you need'
    : 'What you have';

  let ingredientsArray: JSX.Element[] = [];
  ingredients.forEach(
    (ingredient: IngredientDescriptionType, index: number) => {
      const separator = index === ingredients.length - 1 ? <></> : <hr />;
      ingredientsArray.push(
        <li key={ingredient.id}>
          {' '}
          {ingredient.original}
          {separator}
        </li>
      );
    }
  );

  return (
    <div className={ingredientListClass}>
      <div className={'title-of-list'}>{titleOfList}</div>
      {ingredientsArray}
    </div>
  );
};

export default IngredientCard;
