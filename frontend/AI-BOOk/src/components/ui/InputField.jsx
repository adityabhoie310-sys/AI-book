import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  className = '',
  name,
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
          {label} {required && <span className="text-purple-600">*</span>}
        </label>
      )}
      <div className="relative rounded-2xl shadow-xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          id={id || name}
          name={name}
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-2xl border ${
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500'
          } ${Icon ? 'pl-10' : 'pl-3.5'} ${
            isPassword ? 'pr-10' : 'pr-3.5'
          } py-2.5 text-sm transition duration-150 ease-in-out bg-white focus:outline-none focus:ring-2 focus:ring-opacity-50`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
