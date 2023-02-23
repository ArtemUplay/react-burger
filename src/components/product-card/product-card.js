import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const ProductCard = ({ _id, name, price, image }) => {
  return (
    <li key={_id}>
      <img src={image} alt={name} />
      <div>
        <span>{price}</span>
        <CurrencyIcon />
      </div>
      <h3>{name}</h3>
    </li>
  );
}

export default ProductCard;