const Button = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;