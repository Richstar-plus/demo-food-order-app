export function Button({ children, textOnly, className, ...props }) {
  const classClasses = textOnly
    ? `text-button ${className}`
    : `button ${className}`;

  return (
    <button className={classClasses} {...props}>
      {children}
    </button>
  );
}
