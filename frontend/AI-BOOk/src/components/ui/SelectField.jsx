const SelectField = ({
  label,
  options = [],
  value,
  onChange,
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
          {label} {required && <span className="text-orange-500">*</span>}
        </label>
      )}
      <select
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-gray-200 text-gray-900 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out"
      >
        {options.map((option, idx) => {
          const val = typeof option === 'object' ? option.value : option;
          const lbl = typeof option === 'object' ? option.label : option;
          return (
            <option key={idx} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default SelectField;
