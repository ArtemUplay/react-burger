import PropTypes from 'prop-types';

const ingredientsPropTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  fat: PropTypes.number,
  proteins: PropTypes.number,
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  _id: PropTypes.string,
  type: PropTypes.string,
  __v: PropTypes.number
}

export default ingredientsPropTypes;