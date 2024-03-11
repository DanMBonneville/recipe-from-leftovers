import { combineReducers } from '@reduxjs/toolkit';
import { updateObject } from '../../shared/util';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  recipes: {},
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SEARCH_FOR_RECEIPES_START:
      return searchForRecipeStart(state, action);
    case actionTypes.SEARCH_FOR_RECEIPES_SUCESS:
      return searchForRecipeSuccess(state, action);
    case actionTypes.SEARCH_FOR_RECEIPES_FAIL:
      return searchForRecipeFail(state, action);
  }
};

const searchForRecipeStart = (state: object, action: any) => {
  return updateObject(state, {});
};

const searchForRecipeSuccess = (state: object, action: any) => {
  return updateObject(state, {
    recipes: action.recipes,
  });
};

const searchForRecipeFail = (state: object, action: any) => {};

export default combineReducers(reducer);
