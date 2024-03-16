import { ingredientType } from '../components/MultiSelectBar';
import { MultiValue } from 'react-select';

export const updateObject = (oldObject: object, updatedProperties: object) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const createIngredientsString = (
  ingedients: MultiValue<ingredientType>
) => {
  return ingedients
    .map((ingredient: ingredientType) => ingredient.value)
    .join();
};