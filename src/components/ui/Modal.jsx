import { useEffect } from "react";

/**
 * Modal component
 * @param {boolean} isOpen - Whether modal is open
 * @param {function} onClose - Close handler
 * @param {string} title - Modal title
 * @param {React.ReactNode} children - Modal content
 */
export const Modal = ({ isOpen, onClose, title, children }) => {
  // Escape key close logic
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div
        className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 z-10"
        role="dialog"
        aria-modal="true"
      >
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div>{children}</div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};
