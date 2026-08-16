const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] cursor-pointer';

  const variants = {
    primary:
      'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 focus:ring-purple-500',
    secondary:
      'bg-gray-900 text-white hover:bg-gray-800 shadow-sm focus:ring-gray-900',
    outline:
      'border border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50/50 hover:text-purple-700 focus:ring-purple-500 bg-white shadow-xs',
    ghost:
      'text-gray-700 hover:bg-purple-50 hover:text-purple-700 focus:ring-purple-500',
    danger:
      'bg-red-600 text-white hover:bg-red-700 shadow-sm focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs gap-1.5 font-medium',
    md: 'px-5 py-2.5 text-sm gap-2 font-medium',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-semibold',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
      {!isLoading && Icon && iconPosition === 'right' ? (
        <Icon className="w-4 h-4 ml-1" />
      ) : null}
    </button>
  );
};

export default Button;
