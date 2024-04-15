import { SingleValue } from 'react-select';
import {
  INVALID_EMAIL,
  INVALID_EMAIL_MSG,
  INVALID_LOGIN_CREDENTIALS,
  INVALID_LOGIN_CREDENTIALS_MSG,
  MISSING_PASSWORD,
  MISSING_PASSWORD_MSG,
} from './constants';
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

export const createLoginErrorMessage = (errorMessage: string) => {
  switch (errorMessage) {
    case INVALID_EMAIL:
      return INVALID_EMAIL_MSG;
    case INVALID_LOGIN_CREDENTIALS:
      return INVALID_LOGIN_CREDENTIALS_MSG;
    case MISSING_PASSWORD:
      return MISSING_PASSWORD_MSG;
    default:
      return `Unhandled error: ${errorMessage}`;
  }
};

export const createErrorClassObject = (errorMessage: string) => {
  let emailClass = '';
  let passwordClass = '';

  switch (errorMessage) {
    case INVALID_EMAIL:
      emailClass = 'email-input-error';
      break;
    case INVALID_LOGIN_CREDENTIALS:
      emailClass = 'email-input-error';
      passwordClass = 'password-input-error';
      break;
    case MISSING_PASSWORD:
      passwordClass = 'password-input-error';
      break;
    default:
  }
  return { emailClass, passwordClass };
};

export const createSugnUpMessage = (errorMessage: string) => {
  switch (errorMessage) {
    case 'INVALID_EMAIL':
      return 'Please enter a valid email address.';
    default:
      return `Unhandled error: ${errorMessage}`;
  }
};
