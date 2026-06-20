/**
 * Button component
 * @param {('primary'|'secondary'|'outline')} variant - Visual style of the button
 * @param {('sm'|'md'|'lg')} size - Size of the button
 * @param {boolean} disabled - Disable state
 * @param {function} onClick - Click handler
 * @param {React.ReactNode} children - Button label
 */
export const Button = ({ variant='primary', size='md', disabled=false, onClick, children }) => {
  const base = 'rounded font-medium transition';
  const variants = {
    primary: 'bg-green-600 text-white hover:bg-green-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border border-green-600 text-green-600 hover:bg-green-50'
  };
  const sizes = { sm:'px-3 py-1 text-sm', md:'px-4 py-2', lg:'px-6 py-3 text-lg' };
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
