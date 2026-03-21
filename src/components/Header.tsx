import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<string>("#about");
  const [btnHovered, setBtnHovered] = useState(false);
  const [themeHovered, setThemeHovered] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Refs for each nav link to measure position
  const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const navContainerRef = useRef<HTMLUListElement>(null);

  // Sliding indicator state
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update indicator position when hovered link changes
  useEffect(() => {
    const key = hoveredLink || activeLink;
    const el = navRefs.current[key];
    const container = navContainerRef.current;
    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setIndicator({
        left: elRect.left - containerRect.left,
        width: elRect.width,
        opacity: 1,
      });
    }
  }, [hoveredLink, activeLink]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["#about", "#education", "#skills", "#experience", "#projects", "#contact"];
      for (const id of [...sections].reverse()) {
        const el = document.querySelector(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveLink(id);
            break;
          }
        }
      }
    };
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

          {/* Nav links with sliding indicator */}
          <div className="hidden md:block relative">
            <ul
              ref={navContainerRef}
              className="flex items-center gap-8"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((link) => {
                const isActive = activeLink === link.href;
                const isHovered = hoveredLink === link.href;
                return (
                  <li key={link.href}>
                    <a
                      ref={(el) => { navRefs.current[link.href] = el; }}
                      href={link.href}
                      onMouseEnter={() => setHoveredLink(link.href)}
                      onClick={() => setActiveLink(link.href)}
                      style={{
                        fontSize: "14px",
                        display: "inline-block",
                        transform: isHovered ? "translateY(-1px)" : "translateY(0px)",
                        transition: "transform 0.2s ease, color 0.2s ease",
                        color: isActive || isHovered ? "var(--foreground)" : undefined,
                        textDecoration: "none",
                        fontWeight: isActive ? 500 : 400,
                        paddingBottom: "4px",
                      }}
                      className="text-sm text-muted-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Sliding magic underline */}
            <div
              style={{
                position: "absolute",
                bottom: "-4px",
                left: `${indicator.left}px`,
                width: `${indicator.width}px`,
                height: "2px",
                background: "var(--primary)",
                borderRadius: "2px",
                opacity: indicator.opacity,
                transition: "left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
                pointerEvents: "none",
              }}
            />
          </div>

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