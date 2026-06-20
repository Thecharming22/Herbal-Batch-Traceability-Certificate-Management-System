import { useState, useEffect } from "react";
import { Button, Input, Modal, Toast, showToast, Loader } from "../components/ui";

export default function DemoPage() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
   <div className="p-6 bg-white dark:bg-black min-h-screen text-gray-900 dark:text-white">
      <Toast />
      <h1 className="text-xl font-bold mb-4">UI Components Demo</h1>

      {/* Dark/Light Toggle */}
      <Button variant="primary" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle {theme === "dark" ? "Light" : "Dark"} Mode
      </Button>

      {/* Primary Button */}
      <div className="mt-4">
        <Button variant="primary" onClick={() => showToast("Primary button clicked!")}>
          Primary
        </Button>
      </div>

      {/* Input */}
      <div className="mt-4">
        <Input
          label="Name"
          placeholder="Enter your name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={!value ? "Name is required" : ""}
        />
      </div>

      {/* Loader */}
      <div className="mt-4">
        {loading ? <Loader size="lg" /> : <Button onClick={() => setLoading(true)}>Show Loader</Button>}
      </div>

      {/* Modal */}
      <div className="mt-4">
        <Button variant="outline" onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Demo Modal">
          <p>This is modal content.</p>
        </Modal>
      </div>
    </div>
  );
}
