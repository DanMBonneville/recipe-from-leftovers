import { MultiValue } from 'react-select';
import { OptionType } from '../components/MultiSelectBar';

export const convertStringArrToOptionTypeArr = (props: string[]) => {
  var optionArr: OptionType[] = [];
  props.map((opt) => {
    return optionArr.push({
      label: opt,
      value: opt,
    });
  });
  return optionArr;
};

export const convertMultiValueIngredientsToOptionTypeIngredients = (
  newIngredients: MultiValue<OptionType>
) => {
  const convertedIngredients: OptionType[] = [];
  newIngredients.forEach((ingredient: OptionType) => {
    convertedIngredients.push({
      label: ingredient.label,
      value: ingredient.value,
    });
  });
  return convertedIngredients;
};
