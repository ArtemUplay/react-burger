import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  burgerConstructorIngredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setConstructorBun: (state, action) => {
      const newBurgerConstructorIngredients = [
        ...state.burgerConstructorIngredients,
      ].filter((item) => item.type !== 'bun');
      newBurgerConstructorIngredients.unshift(action.payload.ingredient);

      state.burgerConstructorIngredients = newBurgerConstructorIngredients;
    },
    setConstructorIngredient: (state, action) => {
      const newBurgerConstructorIngredients = [
        ...state.burgerConstructorIngredients,
      ];
      newBurgerConstructorIngredients.splice(
        action.payload.indexArray,
        0,
        action.payload.ingredient
      );

      state.burgerConstructorIngredients = newBurgerConstructorIngredients;
    },
    deleteConstructorIngredient: (state, action) => {
      const newBurgerConstructorIngredients = [
        ...state.burgerConstructorIngredients,
      ].filter((item) => {
        return item.uniqueId !== action.payload.uniqueId;
      });

      state.burgerConstructorIngredients = newBurgerConstructorIngredients;
    },
  },
});

export const {
  setConstructorBun,
  setConstructorIngredient,
  deleteConstructorIngredient,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;

export const setIngredientToConstructor =
  (ingredientId, items, indexArray = 1) =>
  (dispatch) => {
    const uniqueId = uuidv4();
    const findedIngredient = items.find(
      (ingredient) => ingredient._id === ingredientId
    );

    if (findedIngredient) {
      const ingredient = { ...findedIngredient, uniqueId };

      if (ingredient.type === 'bun') {
        dispatch(setConstructorBun({ ingredient, indexArray }));
      } else {
        dispatch(setConstructorIngredient({ ingredient, indexArray }));
      }
    }
  };

export const deleteConstructorIngredientAsync = (uniqueId) => (dispatch) => {
  dispatch(deleteConstructorIngredient({ uniqueId }));
};
