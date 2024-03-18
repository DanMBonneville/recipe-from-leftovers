import { MultiValue } from 'react-select';
import { IngredientTypes } from './types';

export const updateObject = (oldObject: object, updatedProperties: object) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const convertStringArrToIngredientTypesArr = (props: string[]) => {
  var optionArr: IngredientTypes[] = [];
  props.map((opt) => {
    return optionArr.push({
      label: opt,
      value: opt,
    });
  });
  return optionArr;
};

export const convertMultiValueIngredientsToIngredientTypesArr = (
  newIngredients: MultiValue<IngredientTypes>
) => {
  const convertedIngredients: IngredientTypes[] = [];
  newIngredients.forEach((ingredient: IngredientTypes) => {
    convertedIngredients.push({
      label: ingredient.label,
      value: ingredient.value,
    });
  });
  return convertedIngredients;
};

export const convertMultipValueIngredientsToStringArr = (
  ingredients: MultiValue<IngredientTypes>
) => {
  const ingredientArr: string[] = [];
  ingredients.forEach((ingredient) => ingredientArr.push(ingredient.value));
  return ingredientArr.join();
};
