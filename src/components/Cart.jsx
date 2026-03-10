import { useContext } from "react";
import { Modal } from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import { Button } from "./UI/Button";
import { CartItem } from "./CartItem";

export function Cart() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);
  const cartTotal = cartContext.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function handleCloseCart() {
    userProgressContext.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressContext.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartContext.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartContext.addItemToCartHandler(item)}
            onDecrease={() => cartContext.removeItemFromCartHandler(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">Total: {currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartContext.items.length > 0 && (
          <Button onClick={userProgressContext.showCheckout}>
            Go to Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
}
