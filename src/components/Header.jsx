import { Button } from "./UI/Button";
import logoImg from "../assets/logo.jpg";
import { useContext } from "react";
import CartContext from "../store/CartContext";

export function Header() {
  const cartContext = useContext(CartContext);

  const totalCartItems = cartContext.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="ReactFood Logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
