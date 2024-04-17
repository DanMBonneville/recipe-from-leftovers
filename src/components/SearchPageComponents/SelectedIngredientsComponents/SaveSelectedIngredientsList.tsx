import { Button } from '@mui/material';
import React from 'react';
import { SaveSelectedIngredientsListProps } from '../../../common/types';

const SaveIngredientListButton = (props: SaveSelectedIngredientsListProps) => {
  const { saveDefaultFridge, restoreDefaultFridge } = props;
  return (
    <div className="default-ingredient-options">
      <Button
        data-testid="save-default-ingredient-list"
        size="medium"
        variant="contained"
        color="secondary"
        onClick={() => saveDefaultFridge()}
      >
        Save Selection
      </Button>
      <Button
        data-testid="restore-default-ingredient-list"
        size="medium"
        variant="contained"
        color="secondary"
        onClick={() => restoreDefaultFridge()}
      >
        Restore Selection
      </Button>
    </div>
  );
};

export default SaveIngredientListButton;
