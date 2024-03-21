import { SingleValue } from 'react-select';
import { IngredientOptionType } from '../../common/types';
import {
  convertSingleValueIngredientToIngredientOption,
  convertStringArrToIngredientOptionTypeArr,
  updateObject,
} from '../../common/util';

describe('Function updateObject behaves as expected', () => {
  it('Empty object updated with empty object is empty', () => {
    expect(updateObject({}, {})).toStrictEqual({});
  });
  it('Object is updated with new values', () => {
    expect(updateObject({ k1: 'v1' }, { k1: 'v2' })).toStrictEqual({
      k1: 'v2',
    });
  });
  it('Object is updated with existing and new values', () => {
    expect(
      updateObject({ k1: 'v1', k2: 'v2' }, { k1: 'v3', k3: 'v1' })
    ).toStrictEqual({
      k1: 'v3',
      k2: 'v2',
      k3: 'v1',
    });
  });
});

describe('Function convertStringArrToIngredientOptionTypeArr behaves as expected', () => {
  const stringArrayInput = ['carrot', 'apple'];

  const expectedResult = [
    {
      label: 'Carrot',
      value: 'carrot',
    },
    {
      label: 'Apple',
      value: 'apple',
    },
  ];

  it('creates an empty string array', () => {
    expect(convertStringArrToIngredientOptionTypeArr([])).toStrictEqual([]);
  });

  it('createIngredients creates a comma separated list of values', () => {
    expect(
      convertStringArrToIngredientOptionTypeArr(stringArrayInput)
    ).toStrictEqual(expectedResult);
  });
});

describe('Function convertSingleValueIngredientToIngredientOption behaves as expected', () => {
  it('Function can handle a null value', () => {
    const emptyIngredientOption =
      convertSingleValueIngredientToIngredientOption(null);
    expect(emptyIngredientOption.label).toStrictEqual('');
    expect(emptyIngredientOption.value).toStrictEqual('');
  });

  it('Function converts value correctly', () => {
    const singleValueIngredient: SingleValue<IngredientOptionType> = {
      label: 'test label',
      value: 'test value',
    };

    const nonEmptyIngredientOption =
      convertSingleValueIngredientToIngredientOption(singleValueIngredient);
    expect(nonEmptyIngredientOption.label).toStrictEqual('test label');
    expect(nonEmptyIngredientOption.value).toStrictEqual('test value');
  });
});
