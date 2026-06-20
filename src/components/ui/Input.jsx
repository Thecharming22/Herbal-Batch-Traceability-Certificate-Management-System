/**
 * Input component
 * @param {string} label - Label text
 * @param {string} placeholder - Placeholder text
 * @param {string} type - Input type (text, number, etc.)
 * @param {string} value - Current value
 * @param {function} onChange - Change handler
 * @param {string} error - Error message to display
 */
export const Input = ({ label, placeholder, type='text', value, onChange, error }) => (
  <div className="flex flex-col mb-3">
    <label className="text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded px-3 py-2 focus:outline-green-600 ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);
