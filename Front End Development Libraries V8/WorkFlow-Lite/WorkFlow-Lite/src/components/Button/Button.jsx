export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
