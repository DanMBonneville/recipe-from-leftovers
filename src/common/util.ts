import { SingleValue } from 'react-select';
import { IngredientOptionType } from './types';

export const updateObject = (oldObject: object, updatedProperties: object) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const alphabatizeIngredientOptions = (
  options: IngredientOptionType[]
) => {
  return [...options].sort((a, b) => a.label.localeCompare(b.label));
};

export const convertStringArrToIngredientOptionTypeArr = (props: string[]) => {
  var optionArr: IngredientOptionType[] = [];
  props.map((opt) => {
    return optionArr.push({
      label: opt.charAt(0).toUpperCase() + opt.slice(1).toLowerCase(),
      value: opt,
    });
  });
  return optionArr;
};

export const convertSingleValueIngredientToIngredientOption = (
  newIngredient: SingleValue<IngredientOptionType>
) => {
  const convertedIngredients: IngredientOptionType = {
    label: newIngredient ? newIngredient.label : '',
    value: newIngredient ? newIngredient.value : '',
  };
  return convertedIngredients;
};

export const convertIngredientOptionArrToStringArr = (
  ingredients: IngredientOptionType[]
) => {
  const ingredientArr: string[] = [];
  ingredients.forEach((ingredient) => ingredientArr.push(ingredient.value));
  return ingredientArr.join();
};
