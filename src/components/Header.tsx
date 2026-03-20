import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo — spins slightly on hover */}
          <a
            href="#"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            style={{
              display: "inline-block",
              transform: logoHovered ? "scale(1.15) rotate(-4deg)" : "scale(1) rotate(0deg)",
              transition: "transform 0.3s ease, color 0.2s ease",
              color: logoHovered ? "var(--primary)" : undefined,
            }}
            className="text-lg font-semibold text-foreground"
          >
            SD
          </a>

          {/* Nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isHovered = hoveredLink === link.href;
              return (
                <li key={link.href} style={{ position: "relative" }}>
                  <a
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    onClick={() => setActiveLink(link.href)}
                    style={{
                      fontSize: "14px",
                      color: isHovered ? "var(--foreground)" : undefined,
                      transform: isHovered ? "translateY(-2px)" : "translateY(0px)",
                      display: "inline-block",
                      transition: "transform 0.2s ease, color 0.2s ease",
                    }}
                    className="text-sm text-muted-foreground transition-colors"
                  >
                    {link.label}
                  </a>

                  {/* Animated underline dot */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: "50%",
                      transform: isHovered ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
                      transformOrigin: "center",
                      width: "100%",
                      height: "2px",
                      background: "var(--primary)",
                      borderRadius: "2px",
                      transition: "transform 0.25s ease",
                      display: "block",
                    }}
                  />
                </li>
              );
            })}
          </ul>

          {/* Get in Touch button */}
          <a
            href="#contact"
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              fontSize: "14px",
              fontWeight: 500,
              padding: "6px 16px",
              borderRadius: "8px",
              border: `1.5px solid ${btnHovered ? "var(--primary)" : "transparent"}`,
              background: btnHovered ? "var(--primary)" : "transparent",
              color: btnHovered ? "white" : "var(--primary)",
              transform: btnHovered ? "translateY(-2px)" : "translateY(0px)",
              boxShadow: btnHovered ? "0 4px 12px rgba(0,0,0,0.12)" : "none",
              transition: "all 0.25s ease",
              display: "none",
            }}
            className="md:inline-flex items-center"
          >
            Get in Touch
          </a>

        </div>
      </nav>

      <style>{`
        @media (min-width: 768px) {
          a[href="#contact"].md\\:inline-flex {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;