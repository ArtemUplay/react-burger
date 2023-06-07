import PropTypes from 'prop-types';
import { IIBurgerConstructorIngredient } from '../burger-constructor/burger-constructor.types';

export const ingredientsPropTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  fat: PropTypes.number,
  proteins: PropTypes.number,
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  _id: PropTypes.string,
  type: PropTypes.string,
  __v: PropTypes.number,
};

export const checkResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Возникла ошибка ${response.status}`);
};

export const collectIngredientsInArray = (
  burgerConstructorIngredients: Array<IIBurgerConstructorIngredient>
) => {
  const ingredients = [];

  const bunItem = burgerConstructorIngredients.find(
    (item) => item.type === 'bun'
  );
  if (bunItem) {
    ingredients.push(bunItem._id);
    ingredients.push(
      ...burgerConstructorIngredients
        .filter((item) => item.type !== 'bun')
        .map((item) => item._id)
    );
    ingredients.push(bunItem._id);
  }

  return ingredients;
};

export const removeBearer = (accessToken: string) => {
  return accessToken.slice(7);
};
