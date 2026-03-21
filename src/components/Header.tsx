import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [btnHovered, setBtnHovered] = useState(false);
  const [themeHovered, setThemeHovered] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about",      label: "About"      },
    { href: "#education",  label: "Education"  },
    { href: "#skills",     label: "Skills"     },
    { href: "#experience", label: "Experience" },
    { href: "#projects",   label: "Projects"   },
    { href: "#contact",    label: "Contact"    },
  ];

  return (
    <header
      style={{ top: 0 }}
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Nav links — left/center */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isHovered = hoveredLink === link.href;
              return (
                <li key={link.href} style={{ position: "relative" }}>
                  <a
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      fontSize: "14px", display: "inline-block",
                      transform: isHovered ? "translateY(-2px)" : "translateY(0px)",
                      transition: "transform 0.2s ease, color 0.2s ease",
                      color: isHovered ? "var(--foreground)" : undefined,
                      textDecoration: "none",
                    }}
                    className="text-sm text-muted-foreground"
                  >
                    {link.label}
                  </a>
                  {/* Animated underline */}
                  <span style={{
                    position: "absolute", bottom: "-4px", left: "50%",
                    transform: isHovered ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
                    transformOrigin: "center",
                    width: "100%", height: "2px",
                    background: "var(--primary)",
                    borderRadius: "2px",
                    transition: "transform 0.25s ease",
                    display: "block",
                  }} />
                </li>
              );
            })}
          </ul>

          {/* Right side — Get in Touch + dark mode toggle */}
          <div className="flex items-center gap-3 ml-auto">

            {/* Get in Touch */}
            <a
              href="#contact"
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                fontSize: "14px", fontWeight: 500,
                padding: "7px 18px", borderRadius: "8px",
                border: `1.5px solid ${btnHovered ? "var(--primary)" : "var(--border, rgba(0,0,0,0.15))"}`,
                background: btnHovered ? "var(--primary)" : "transparent",
                color: btnHovered ? "white" : "var(--primary)",
                transform: btnHovered ? "translateY(-2px)" : "translateY(0px)",
                boxShadow: btnHovered ? "0 4px 12px rgba(0,0,0,0.12)" : "none",
                transition: "all 0.25s ease",
                textDecoration: "none",
              }}
              className="hidden md:inline-flex items-center"
            >
              Get in Touch
            </a>

            {/* Dark / Light toggle */}
            <button
              onClick={toggleTheme}
              onMouseEnter={() => setThemeHovered(true)}
              onMouseLeave={() => setThemeHovered(false)}
              aria-label="Toggle theme"
              style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: themeHovered
                  ? theme === "dark" ? "rgba(250,204,21,0.15)" : "rgba(99,102,241,0.1)"
                  : "var(--secondary, rgba(0,0,0,0.04))",
                border: `1px solid ${themeHovered
                  ? theme === "dark" ? "rgba(250,204,21,0.4)" : "rgba(99,102,241,0.3)"
                  : "var(--border, rgba(0,0,0,0.1))"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                transform: themeHovered ? "translateY(-2px) rotate(15deg)" : "translateY(0) rotate(0deg)",
                transition: "all 0.3s ease",
                boxShadow: themeHovered ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
              }}
            >
              {theme === "dark" ? (
                // Sun icon — shown in dark mode
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                // Moon icon — shown in light mode
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  style={{ color: themeHovered ? "#6366f1" : "var(--muted-foreground)" }}
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;