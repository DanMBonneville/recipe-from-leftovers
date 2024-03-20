import { MultiValue } from 'react-select';
import { IngredientOptionType } from './types';

export const updateObject = (oldObject: object, updatedProperties: object) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const convertStringArrToIngredientOptionTypeArr = (props: string[]) => {
  var optionArr: IngredientOptionType[] = [];
  props.map((opt) => {
    return optionArr.push({
      label: opt,
      value: opt,
    });
  });
  return optionArr;
};

export const convertMultiValueIngredientsToIngredientOptionTypeArr = (
  newIngredients: MultiValue<IngredientOptionType>
) => {
  const convertedIngredients: IngredientOptionType[] = [];
  newIngredients.forEach((ingredient: IngredientOptionType) => {
    convertedIngredients.push({
      label: ingredient.label,
      value: ingredient.value,
    });
  });
  return convertedIngredients;
};

export const convertMultipValueIngredientsToStringArr = (
  ingredients: MultiValue<IngredientOptionType>
) => {
  const ingredientArr: string[] = [];
  ingredients.forEach((ingredient) => ingredientArr.push(ingredient.value));
  return ingredientArr.join();
};
