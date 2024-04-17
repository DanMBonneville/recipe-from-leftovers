import Icon from '@mui/material/Icon';
import React from 'react';
import {
  IngredientOptionType,
  SelectedIngredientListProps,
} from '../../../common/types';

const SelectedIngredientList = (props: SelectedIngredientListProps) => {
  const { selectedIngredients, removeIngredient } = props;

  let ingredientsArray: JSX.Element[] = [];
  if (selectedIngredients) {
    selectedIngredients.forEach(
      (ingredient: IngredientOptionType, index: number) => {
        const separator =
          index === selectedIngredients.length - 1 ? <></> : <hr />;
        ingredientsArray.push(
          <li
            key={ingredient.label}
            onClick={() => removeIngredient(ingredient)}
          >
            {ingredient.label + ' '}
            <Icon className={'remove-ingredient-icon'}>clear</Icon>
            {separator}
          </li>
        );
      }
    );
  }

  return <div className={'selected-ingredient-list'}>{ingredientsArray}</div>;
};

export default SelectedIngredientList;
