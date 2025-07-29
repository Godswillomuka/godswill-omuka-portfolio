import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Code } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  const isActiveLink = (href) => location.pathname === href;

  return (
    <motion.header
      className={`header ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="header-content">
          <motion.div
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2}}
          >
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <Code size={24} color="#64ffda"/>  
            <span style={{ color: "#64ffda" }}>Welcome to my portfolio</span>
            </Link>
          </motion.div>

          <nav className="nav">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.href}
                  className={`nav-link ${isActiveLink(link.href) ? "active" : ""}`}
                  style={{
                    color: isActiveLink(link.href) ? "#64ffda" : "#94a3b8",
                    background: isActiveLink(link.href)
                      ? "rgba(100, 255, 218, 0.15)"
                      : "transparent",
                    boxShadow: isActiveLink(link.href)
                      ? "0 0 20px rgba(100, 255, 218, 0.3)"
                      : "none",
                      borderRadius: "50px",
                  }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <motion.nav
          className={`mobile-nav ${isMenuOpen ? "open" : ""}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.2 }}
        >
          {navLinks.map((link) => (
            <motion.div key={link.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to={link.href}
                className={`nav-link ${isActiveLink(link.href) ? "active" : ""}`}
                style={{
                  color: isActiveLink(link.href) ? "#64ffda" : "#94a3b8",
                  background: isActiveLink(link.href)
                    ? "rgba(100, 255, 218, 0.15)"
                    : "transparent",
                }}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </div>
    </motion.header>
  );
}

export default Header;
