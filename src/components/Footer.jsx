function Footer() {
  return (
    <footer className="bg-black text-white text-center py-4">
      <div className="flex justify-center gap-6 mb-2">
        <a href="/" className="footer-link">Home</a>
        <a href="#contact" className="footer-link">Contact</a>
      </div>

      <div className="flex justify-center gap-6 mb-2">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
      </div>

      <p className="text-xs">© 2026 Herbal Batch Traceability System</p>
    </footer>
  );
}

export default Footer;
