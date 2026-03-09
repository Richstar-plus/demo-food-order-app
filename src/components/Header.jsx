import logoImg from '../assets/logo.jpg';

export function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="ReactFood Logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  )
}