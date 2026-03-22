import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("#about");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [btnHovered, setBtnHovered] = useState(false);
  const [themeHovered, setThemeHovered] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const { theme, toggleTheme } = useTheme();

  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const navLinks = [
    { href: "#about",      label: "About"      },
    { href: "#education",  label: "Education"  },
    { href: "#skills",     label: "Skills"     },
    { href: "#experience", label: "Experience" },
    { href: "#projects",   label: "Projects"   },
    { href: "#contact",    label: "Contact"    },
  ];

  const updateIndicator = (href: string) => {
    const el = linkRefs.current[href];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  };

  useEffect(() => {
    setTimeout(() => updateIndicator(activeLink), 150);
  }, []);

  useEffect(() => {
    updateIndicator(hoveredLink || activeLink);
  }, [hoveredLink, activeLink]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const sections = ["#contact", "#projects", "#experience", "#skills", "#education", "#about"];
      for (const id of sections) {
        const el = document.querySelector(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) { setActiveLink(id); break; }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Wrapper that transitions from full-width to centered pill */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          padding: scrolled ? "12px 24px" : "0",
          transition: "padding 0.4s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: "none",
        }}
      >
        <header
          style={{
            width: scrolled ? "fit-content" : "100%",
            maxWidth: scrolled ? "700px" : "100%",
            background: scrolled
              ? "var(--background)"
              : "transparent",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
            border: scrolled ? "1px solid var(--border, rgba(0,0,0,0.1))" : "none",
            borderRadius: scrolled ? "99px" : "0",
            boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
            padding: scrolled ? "8px 20px" : "0",
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            pointerEvents: "auto",
          }}
        >
          <nav
            style={{
              maxWidth: scrolled ? "none" : "1200px",
              margin: scrolled ? "0" : "0 auto",
              padding: scrolled ? "0" : "0 2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: scrolled ? "center" : "space-between",
                height: scrolled ? "44px" : "72px",
                gap: scrolled ? "0" : "0",
                transition: "height 0.4s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {/* Nav links */}
              <div style={{ position: "relative" }}>
                <ul
                  className="hidden md:flex items-center"
                  style={{ gap: scrolled ? "4px" : "32px", transition: "gap 0.4s ease" }}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {navLinks.map((link) => {
                    const isActive = activeLink === link.href;
                    const isHovered = hoveredLink === link.href;
                    return (
                      <li key={link.href} style={{ listStyle: "none" }}>
                        <a
                          ref={(el) => { linkRefs.current[link.href] = el; }}
                          href={link.href}
                          onMouseEnter={() => setHoveredLink(link.href)}
                          onClick={() => setActiveLink(link.href)}
                          style={{
                            fontSize: scrolled ? "13px" : "14px",
                            display: "inline-block",
                            textDecoration: "none",
                            fontWeight: isActive || isHovered ? 500 : 400,
                            color: isActive || isHovered ? "var(--foreground)" : undefined,
                            transform: isHovered && !scrolled ? "translateY(-1px)" : "translateY(0)",
                            transition: "color 0.2s ease, transform 0.2s ease, font-size 0.4s ease",
                            paddingBottom: "4px",
                            // Pill style when scrolled
                            padding: scrolled
                              ? `5px 12px`
                              : `0 0 4px 0`,
                            borderRadius: scrolled ? "99px" : "0",
                            background: scrolled && (isActive || isHovered)
                              ? "var(--secondary, rgba(0,0,0,0.06))"
                              : "transparent",
                          }}
                          className="text-sm text-muted-foreground"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}

                  {/* Sliding underline — only when NOT scrolled */}
                  {!scrolled && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: `${indicator.left}px`,
                        width: `${indicator.width}px`,
                        height: "2px",
                        background: "var(--primary)",
                        borderRadius: "2px",
                        transition: "left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </ul>
              </div>

              {/* Right side — only show when NOT scrolled */}
              {!scrolled && (
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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

                  {/* Theme toggle */}
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
                    }}
                  >
                    {theme === "dark" ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="5"/>
                        <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        style={{ color: themeHovered ? "#6366f1" : "var(--muted-foreground)" }}>
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                      </svg>
                    )}
                  </button>
                </div>
              )}

              {/* Theme toggle inside pill when scrolled */}
              {scrolled && (
                <button
                  onClick={toggleTheme}
                  onMouseEnter={() => setThemeHovered(true)}
                  onMouseLeave={() => setThemeHovered(false)}
                  aria-label="Toggle theme"
                  style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: "transparent",
                    border: "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    marginLeft: "8px",
                    transform: themeHovered ? "rotate(20deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  {theme === "dark" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="5"/>
                      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      style={{ color: "var(--muted-foreground)" }}>
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                  )}
                </button>
              )}
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Header;