export function Input({
  label,
  id,
  inputClassName = "",
  wrapperClassName = "",
  ...props
}) {
  return (
    <p className={`control ${wrapperClassName}`.trim()}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required className={inputClassName} {...props} />
    </p>
  );
}
