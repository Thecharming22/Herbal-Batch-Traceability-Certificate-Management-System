function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-gray-900 dark:text-white text-center py-4 transition-colors duration-300">
      
      {/* Top Links */}
      <div className="flex justify-center gap-6 mb-2">
        <a href="/" className="footer-link hover:text-green-600 dark:hover:text-green-400">Home</a>
        <a href="#contact" className="footer-link hover:text-green-600 dark:hover:text-green-400">Contact</a>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-6 mb-2">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="footer-link hover:text-green-600 dark:hover:text-green-400"
        >
          GitHub
        </a>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="footer-link hover:text-green-600 dark:hover:text-green-400"
        >
          LinkedIn
        </a>
      </div>

      {/* Copyright */}
      <p className="text-xs text-gray-700 dark:text-gray-400">
        © 2026 Herbal Batch Traceability System
      </p>
    </footer>
  );
}

export default Footer;
