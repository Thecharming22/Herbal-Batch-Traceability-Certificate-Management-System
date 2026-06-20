/**
 * Toast notification using react-hot-toast
 * @param {string} message - Message to display
 * @param {('success'|'error'|'info')} type - Type of toast
 */
import toast, { Toaster } from 'react-hot-toast';

export const Toast = () => <Toaster position="top-right" />;
export const showToast = (message, type='success') => {
  if(type==='error') toast.error(message);
  else if(type==='info') toast(message);
  else toast.success(message);
};
