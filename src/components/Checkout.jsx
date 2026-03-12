import { Modal } from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export function Checkout() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig,
  );

  const cartTotal = cartContext.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function handleCloseCheckout() {
    userProgressContext.hideCheckout();
  }

  function handleFinishShopping() {
    userProgressContext.hideCheckout();
    cartContext.clearCartHandler();
    clearData();
  }

  function handleSubmitOrder(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      }),
    );
  }

  let actions = (
    <>
    <div className="form-action-holder">
      <Button>Submit Order</Button>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
    </div>
    </>
  );

  if (isLoading) {
    actions = <span className="center">Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressContext.progress === "checkout"}
        onClose={handleFinishShopping}
      >
        <h2>Order submitted successfully!</h2>
        <p>Thank you for your order.</p>
        <p className="modal-actions">
          <Button onClick={handleFinishShopping}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressContext.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleSubmitOrder} className="checkout-form">
        <div className="form-control-header">
          <h2>Checkout</h2>
          <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        </div>

        <div className="form-input-container">
          <div className="main-input"></div>
          <Input label="Full Name" type="text" id="name"  inputClassName="main-input" />
          <Input label="Email Address" type="email" id="email" />
          <Input label="Street" type="text" id="street" />
          <div className="control-row">
            <Input label="Postal Code" type="text" id="postal-code" />
            <Input label="City" type="text" id="city" />
          </div>
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
