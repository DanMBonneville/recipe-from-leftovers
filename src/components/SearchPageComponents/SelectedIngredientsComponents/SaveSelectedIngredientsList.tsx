import { Button } from '@mui/material';
import React from 'react';
import { SaveSelectedIngredientsListProps } from '../../../common/types';

const SaveIngredientListButton = (props: SaveSelectedIngredientsListProps) => {
  const { saveDefaultFridge, restoreDefaultFridge } = props;
  return (
    <div className="default-ingredient-options">
      <Button
        data-testid="save-default-ingredient-list"
        className="save-default-ingredient-list"
        size="medium"
        variant="contained"
        onClick={() => saveDefaultFridge()}
      >
        Save as your Default Fridge
      </Button>
      <Button
        data-testid="restore-default-ingredient-list"
        className="restore-default-ingredient-list"
        size="medium"
        variant="contained"
        onClick={() => restoreDefaultFridge()}
      >
        Restore Default Fridge
      </Button>
    </div>
  );
};

export default SaveIngredientListButton;
