import { MultiValue } from 'react-select';
import { OptionType } from '../components/MultiSelectBar';

export const updateObject = (oldObject: object, updatedProperties: object) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const createIngredientsString = (
  ingredients: MultiValue<OptionType>
) => {
  const ingredientArr: string[] = [];
  ingredients.forEach((ingredient) => ingredientArr.push(ingredient.value));
  return ingredientArr.join();
};
