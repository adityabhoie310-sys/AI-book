const TextareaField = ({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  error,
  required = false,
  className = '',
  name,
  id,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
          {label} {required && <span className="text-purple-600">*</span>}
        </label>
      )}
      <textarea
        id={id || name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-gray-200 text-gray-900 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out placeholder-gray-400"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default TextareaField;
