import PropTypes from 'prop-types';

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

export const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Возникла ошибка ${response.status}`);
};

export const collectIngredientsInArray = (burgerConstructorIngredients) => {
  const ingredients = [];

  const bunItem = burgerConstructorIngredients.find(
    (item) => item.type === 'bun'
  );

  ingredients.push(bunItem._id);
  ingredients.push(
    ...burgerConstructorIngredients
      .filter((item) => item.type !== 'bun')
      .map((item) => item._id)
  );
  ingredients.push(bunItem._id);

  return ingredients;
};

export const removeBearer = (accessToken) => {
  return accessToken.slice(7);
};

// export function setCookie(name, value, props) {
//   props = props || {};
//   let exp = props.expires;
//   if (typeof exp == 'number' && exp) {
//     const d = new Date();
//     d.setTime(d.getTime() + exp * 1000);
//     exp = props.expires = d;
//   }
//   if (exp && exp.toUTCString) {
//     props.expires = exp.toUTCString();
//   }
//   value = encodeURIComponent(value);
//   let updatedCookie = name + '=' + value;
//   for (const propName in props) {
//     updatedCookie += '; ' + propName;
//     const propValue = props[propName];
//     if (propValue !== true) {
//       updatedCookie += '=' + propValue;
//     }
//   }
//   document.cookie = updatedCookie;
// }

// export function getCookie(name) {
//   let matches = document.cookie.match(
//     new RegExp(
//       '(?:^|; )' +
//         name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
//         '=([^;]*)'
//     )
//   );
//   return matches ? decodeURIComponent(matches[1]) : undefined;
// }

// export function deleteCookie(name) {
//   setCookie(name, null, { expires: -1 });
// }
