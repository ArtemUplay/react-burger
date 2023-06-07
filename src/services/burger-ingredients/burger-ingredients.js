import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkResponse } from '../../components/utils/utils';
import { URL } from '../../constants/constants';

const initialState = {
  ingredients: [],

  ingredientsRequest: false,
  ingredientsFailed: false,
};

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {
    getIngredientsRequest: (state) => {
      state.ingredientsRequest = true;
    },
    getIngredientsSuccess: (state, action) => {
      state.ingredientsRequest = false;
      state.ingredients = action.payload.ingredients;
    },
    getIngredientsFailed: (state) => {
      state.ingredientsRequest = false;
      state.ingredientsFailed = true;
    },
  },
});

export const {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
} = burgerIngredientsSlice.actions;

export const fetchIngredients = createAsyncThunk(
  'burger-ingredients/fetchIngredients',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(getIngredientsRequest());

      const response = await fetch(`${URL}/ingredients`);
      const data = await checkResponse(response);

      return { ingredients: data.data };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
