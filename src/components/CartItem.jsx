import { currencyFormatter } from "../util/formatting";

export function CartItem({
  name,
  quantity,
  price,
  onIncrease,
  onDecrease,
  image,
}) {
  return (
    <li className="cart-item">
      <div className="cart-item-wrapper">
        <p className="cart-item-image">
          <img src={`http://localhost:3000/${image}`} alt={name} />
        </p>
        <p className="cart-details-holder">
          <p className="cart-name">{name}</p>
          <p className="cart-quantity">{quantity}</p>
          <p className="cart-price">{currencyFormatter.format(price)}</p>
        </p>
      </div>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
