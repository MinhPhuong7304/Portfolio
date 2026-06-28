import React, { useState, useEffect } from 'react';
import { Globe, Download, Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar({ currentLang, setLang, text, mode, theme, setTheme, cvUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(currentLang === 'vi' ? 'en' : 'vi');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isHomePage = window.location.pathname === '/';

  const navItems = [
    { label: text.about, href: isHomePage ? '#about' : '/#about' },
    { label: text.skills, href: isHomePage ? '#skills' : '/#skills' },
    { label: text.projects, href: isHomePage ? '#projects' : '/#projects' },
    { label: text.contact, href: isHomePage ? '#contact' : '/#contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="nav-logo">PORTFOLIO
          <span className="dot">.</span>
          <span className="logo-badge">{mode === 'frontend' ? 'DEV' : 'QA'}</span>
        </a>

        {/* Desktop Menu */}
        <div className="nav-menu-desktop">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}

          <button onClick={toggleLang} className="btn-lang" aria-label="Toggle language">
            <Globe size={16} />
            <span>{currentLang === 'vi' ? 'EN' : 'VI'}</span>
          </button>

          <button onClick={toggleTheme} className="btn-theme" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a 
            href={cvUrl || "/cv-tranminhphuong.pdf"} 
            download={cvUrl && !cvUrl.startsWith('data:') ? cvUrl.split('/').pop() : (mode === 'frontend' ? "CV_Frontend_TranMinhPhuong.pdf" : "CV_Tester_TranMinhPhuong.pdf")}
            className="nav-cv-btn"
          >
            <Download size={15} />
            <span>{text.downloadCv}</span>
          </a>
        </div>

        {/* Mobile menu actions */}
        <div className="nav-mobile-actions">
          <button onClick={toggleLang} className="btn-lang" aria-label="Toggle language">
            <Globe size={16} />
            <span>{currentLang === 'vi' ? 'EN' : 'VI'}</span>
          </button>

          <button onClick={toggleTheme} className="btn-theme" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`nav-menu-mobile ${isOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a
          href={cvUrl || "/cv-tranminhphuong.pdf"} 
          download={cvUrl && !cvUrl.startsWith('data:') ? cvUrl.split('/').pop() : (mode === 'frontend' ? "CV_Frontend_TranMinhPhuong.pdf" : "CV_Tester_TranMinhPhuong.pdf")}
          className="nav-cv-btn mobile-cv-btn"
          onClick={() => setIsOpen(false)}
        >
          <Download size={15} />
          <span>{text.downloadCv}</span>
        </a>
      </div>
    </nav>
  );
}
