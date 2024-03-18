import { createIngredientsString, updateObject } from '../../shared/util';

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

describe('Function createIngredients String behaves as expected', () => {
  const ingredients = [
    {
      label: 'Carrot',
      value: 'carrot',
    },
    {
      label: 'Apple',
      value: 'apple',
    },
  ];

  it('createIngredients creates an empty string with no ingredients passed in', () => {
    expect(createIngredientsString([])).toBe('');
  });

  it('createIngredients creates a comma separated list of values', () => {
    expect(createIngredientsString(ingredients)).toBe('carrot,apple');
  });
});
