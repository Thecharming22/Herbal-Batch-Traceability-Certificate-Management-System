// src/components/ui/Loader.jsx
export default function Loader() {
  return (
    <div className="flex items-center justify-center mt-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
      <span className="ml-2 text-green-600">Loading...</span>
    </div>
  );
}
