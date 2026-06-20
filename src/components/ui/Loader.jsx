/**
 * Loader spinner
 * @param {string} size - Size of loader (sm, md, lg)
 */
export const Loader = ({ size='md' }) => {
  const sizes = { sm:'h-4 w-4', md:'h-8 w-8', lg:'h-12 w-12' };
  return (
    <div className="flex justify-center items-center py-6">
      <div className={`animate-spin rounded-full border-t-2 border-green-600 ${sizes[size]}`}></div>
    </div>
  );
};
