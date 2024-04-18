import { SingleValue } from 'react-select';
import {
  SIGNUP_EMAIL_ALREADY_EXISTS_ERROR_CODE,
  SIGNUP_INVALID_PASSWORD_CODE,
  SINGUP_INVALID_EMAIL_CODE,
  lOGIN_INVALID_EMAIL,
  lOGIN_INVALID_EMAIL_MSG,
  lOGIN_INVALID_LOGIN_CREDENTIALS,
  lOGIN_INVALID_LOGIN_CREDENTIALS_MSG,
  lOGIN_MISSING_PASSWORD,
  lOGIN_MISSING_PASSWORD_MSG,
} from './constants';
import { IngredientOptionType } from './types';

export const updateObject = (oldObject: object, updatedProperties: object) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const convertListToObject = (arr: Array<IngredientOptionType>) => {
  const object: { [key: string]: IngredientOptionType } = {};
  arr.forEach((item, index) => {
    object[String(index)] = item;
  });
  return object;
};

export const alphabatizeIngredientOptions = (
  options: IngredientOptionType[]
) => {
  return [...options].sort((a, b) => a.label.localeCompare(b.label));
};

export const filterIngredientsFromIngredientList = (
  ingredients: IngredientOptionType[],
  ingredientList: IngredientOptionType[]
) => {
  if (!ingredients || 0 === ingredients.length) {
    return ingredientList;
  }
  return ingredientList.filter((ingredientOpion: IngredientOptionType) => {
    let shouldKeep = true;
    if (ingredients && 0 < ingredients.length) {
      ingredients.forEach((ingredient) => {
        if (ingredientOpion.label === ingredient.label) {
          shouldKeep = false;
        }
      });
    }
    return shouldKeep;
  });
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
    case lOGIN_INVALID_EMAIL:
      return lOGIN_INVALID_EMAIL_MSG;
    case lOGIN_INVALID_LOGIN_CREDENTIALS:
      return lOGIN_INVALID_LOGIN_CREDENTIALS_MSG;
    case lOGIN_MISSING_PASSWORD:
      return lOGIN_MISSING_PASSWORD_MSG;
    default:
      return `Unhandled error: ${errorMessage}`;
  }
};

export const createLoginErrorClassObject = (errorMessage: string) => {
  let emailClass = '';
  let passwordClass = '';

  switch (errorMessage) {
    case lOGIN_INVALID_EMAIL:
      emailClass = 'email-input-error';
      break;
    case lOGIN_INVALID_LOGIN_CREDENTIALS:
      emailClass = 'email-input-error';
      passwordClass = 'password-input-error';
      break;
    case lOGIN_MISSING_PASSWORD:
      passwordClass = 'password-input-error';
      break;
    default:
  }
  return { emailClass, passwordClass };
};

export const createSignUpErrorClassObject = (errorMessage: string) => {
  let emailClass = '';
  let passwordClass = '';

  switch (errorMessage) {
    case SINGUP_INVALID_EMAIL_CODE:
    case SIGNUP_EMAIL_ALREADY_EXISTS_ERROR_CODE:
      emailClass = 'email-input-error';
      break;
    case SIGNUP_INVALID_PASSWORD_CODE:
      passwordClass = 'password-input-error';
      break;
    default:
  }
  return { emailClass, passwordClass };
};
