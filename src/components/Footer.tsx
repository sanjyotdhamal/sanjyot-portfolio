import { useState, useEffect } from "react";
import { Mail, Linkedin, Github, ArrowUp } from "lucide-react";

const Footer = () => {
  const [showTop, setShowTop] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about",    label: "About"    },
    { href: "#projects", label: "Projects" },
    { href: "#contact",  label: "Contact"  },
  ];

  const socials = [
    { icon: Mail,     href: "mailto:sanjyotdhamal31@gmail.com",                    label: "Email",    color: "#3b82f6" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sanjyot-dhamal-2b6205289", label: "LinkedIn", color: "#8b5cf6" },
    { icon: Github,   href: "https://github.com/sanjyotdhamal",                    label: "GitHub",   color: "#10b981" },
  ];

  return (
    <footer className="border-t border-border relative">
      {/* Top gradient line */}
      <div style={{
        height: "2px",
        background: "linear-gradient(to right, #3b82f6, #8b5cf6, #10b981, #f59e0b)",
        position: "absolute", top: 0, left: 0, right: 0,
      }} />

      <div className="section-container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left — branding */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <p
              className="text-lg font-semibold"
              style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.5px" }}
            >
              Samarth Kale
            </p>
            <p className="text-xs text-muted-foreground">
              AI & ML Enthusiast · Computer Engineer
            </p>
          </div>

          {/* Center — nav links */}
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isHovered = hoveredLink === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{
                    fontSize: "13px",
                    display: "inline-block",
                    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                    color: isHovered ? "var(--foreground)" : undefined,
                    transition: "transform 0.2s ease, color 0.2s ease",
                    position: "relative",
                  }}
                  className="text-muted-foreground"
                >
                  {link.label}
                  {/* underline */}
                  <span style={{
                    position: "absolute", bottom: "-3px", left: "50%",
                    transform: isHovered ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
                    transformOrigin: "center",
                    width: "100%", height: "1.5px",
                    background: "var(--primary)",
                    borderRadius: "2px",
                    transition: "transform 0.25s ease",
                    display: "block",
                  }} />
                </a>
              );
            })}
          </nav>

          {/* Right — social icons */}
          <div className="flex items-center gap-3">
            {socials.map((s, i) => {
              const Icon = s.icon;
              const [h, setH] = useState(false);
              return (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  onMouseEnter={() => setH(true)}
                  onMouseLeave={() => setH(false)}
                  style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: h ? `${s.color}15` : "var(--secondary)",
                    border: `1px solid ${h ? s.color + "50" : "var(--border)"}`,
                    transform: h ? "translateY(-3px) scale(1.08)" : "translateY(0) scale(1)",
                    boxShadow: h ? `0 6px 16px ${s.color}25` : "none",
                    transition: "all 0.25s ease",
                  }}
                >
                  <Icon style={{ width: "15px", height: "15px", color: h ? s.color : "var(--muted-foreground)" }} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          className="mt-8 pt-6 text-center"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Samarth Kale. All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        style={{
          position: "fixed", bottom: "24px", right: "24px",
          width: "40px", height: "40px", borderRadius: "50%",
          background: "var(--primary)",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0) scale(1)" : "translateY(16px) scale(0.8)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          zIndex: 99,
          pointerEvents: showTop ? "auto" : "none",
        }}
      >
        <ArrowUp style={{ width: "16px", height: "16px", color: "white" }} />
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap');
      `}</style>
    </footer>
  );
};

export default Footer;