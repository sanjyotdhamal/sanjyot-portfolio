import { useEffect, useRef, useState } from "react";
import SectionParallax from "@/components/SectionParallax"; // ← add this line
// import { useEffect, useRef, useState } from "react";

// ── Scroll visibility hook ────────────────────────────────────────────────────
const useInView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({
  icon,
  value,
  label,
  color,
  bgColor,
  borderColor,
  visible,
  delay,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  visible: boolean;
  delay: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateX(6px)" : "translateX(0px)"
          : "translateX(30px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.3s ease`,
        background: "var(--background)",
        border: `0.5px solid ${hovered ? borderColor : "var(--border, rgba(0,0,0,0.1))"}`,
        borderRadius: "14px",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        position: "relative",
        overflow: "hidden",
        boxShadow: hovered ? `0 6px 20px ${color}18` : "none",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: "3px",
        background: color,
        borderRadius: "3px 0 0 3px",
        transform: hovered ? "scaleY(1)" : "scaleY(0.4)",
        transformOrigin: "center",
        transition: "transform 0.3s ease",
      }} />

      {/* Icon */}
      <div style={{
        width: "44px", height: "44px", borderRadius: "12px",
        background: bgColor,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        transform: hovered ? "rotate(-6deg) scale(1.08)" : "scale(1)",
        transition: "transform 0.3s ease",
      }}>
        {icon}
      </div>

      {/* Text */}
      <div>
        <div style={{
          fontSize: "22px", fontWeight: 700,
          fontFamily: "'Playfair Display', serif",
          color: color, lineHeight: 1,
        }}>
          {value}
        </div>
        <div style={{
          fontSize: "11px", color: "var(--muted-foreground, #888)",
          marginTop: "3px", lineHeight: 1.4,
        }}>
          {label}
        </div>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const About = () => {
  const { ref: textRef, inView: textVisible } = useInView();
  const { ref: statsRef, inView: statsVisible } = useInView();

  const stats = [
    {
      color: "#185FA5", bgColor: "#E6F1FB", borderColor: "#B5D4F4",
      value: <>B.Tech <span style={{ fontSize: "13px", fontFamily: "inherit", fontWeight: 400 }}>CSE</span></>,
      label: "MIT ADT University, Pune · 2023–Present",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" strokeLinecap="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      ),
    },
    {
      color: "#534AB7", bgColor: "#EEEDFE", borderColor: "#CECBF6",
      value: <>44<span style={{ fontSize: "14px" }}>th</span></>,
      label: "SIH 2025 · out of 200 software teams",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.8" strokeLinecap="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
          <path d="M4 22h16"/>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
        </svg>
      ),
    },
    {
      color: "#0F6E56", bgColor: "#E1F5EE", borderColor: "#9FE1CB",
      value: <>11<span style={{ fontSize: "14px" }}>th</span></>,
      label: "Agriculture & Rural Development domain",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="1.8" strokeLinecap="round">
          <path d="M3 3v18h18"/>
          <path d="m19 9-5 5-4-4-3 3"/>
        </svg>
      ),
    },
    {
      color: "#854F0B", bgColor: "#FAEEDA", borderColor: "#FAC775",
      value: "National",
      label: "All India University Rowing Championship",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#854F0B" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="18" cy="5" r="3"/>
          <path d="M10.3 17.7 3 21l3-7.5"/>
          <path d="M13 15 3.3 5.3C2.5 4.5 2.5 3.2 3.3 2.5s2-.8 2.7 0L15 12"/>
          <path d="m13 15 2.6 2.6c.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0L10.3 17.7"/>
        </svg>
      ),
    },
    {
      color: "#993556", bgColor: "#FBEAF0", borderColor: "#F4C0D1",
      value: <>6<span style={{ fontSize: "14px" }}>+</span></>,
      label: "Industry certifications · IBM, Google, Coursera",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#993556" strokeWidth="1.8" strokeLinecap="round">
          <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"/>
          <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8"/>
          <path d="M15 2v5h5"/>
          <path d="M11 13h4"/><path d="M11 10h1"/><path d="M11 16h4"/>
        </svg>
      ),
    },
  ];

  const tags = [
    { label: "AI & ML",      bg: "#E6F1FB", color: "#185FA5", border: "#B5D4F4" },
    { label: "Blockchain",   bg: "#EEEDFE", color: "#534AB7", border: "#CECBF6" },
    { label: "Data Science", bg: "#E1F5EE", color: "#0F6E56", border: "#9FE1CB" },
    { label: "IoT",          bg: "#FAEEDA", color: "#854F0B", border: "#FAC775" },
     { label: "Web Development",bg: "#fadada", color: "#850b0b", border: "#ff8c88" },
    { label: "Rowing",       bg: "#FBEAF0", color: "#993556", border: "#F4C0D1" },
  ];

  return (
    <section id="about" className="section-padding bg-secondary/30" style={{ position: "relative" }}>
  <SectionParallax color1="59,130,246" color2="139,92,246" />
      <div className="section-container relative z-10">
        <p className="section-title">About Me</p>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* ── Left — text ── */}
          <div ref={textRef}>
            <h2
              className="text-foreground mb-0"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 38px)",
                fontWeight: 700,
                lineHeight: 1.15,
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              Passionate about building intelligent solution{" "}
        
            </h2>

            {/* Gradient divider */}
            <div style={{
              width: "48px", height: "3px",
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
              borderRadius: "2px",
              margin: "1.5rem 0 2rem",
              opacity: textVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.2s",
            }} />

            {[
              <>Currently pursuing <strong>B.Tech in Computer Science Engineering</strong> at MIT ADT University, Pune — with a deep interest in Artificial Intelligence, Machine Learning, and Data Analysis.</>,
              <>I believe in hands-on learning and have gained practical experience through <strong>internships, projects, hackathons</strong>, and industry-recognized certifications. My approach combines theoretical understanding with real-world application.</>,
              <>Beyond academics, I represented MIT ADT University at the <strong>All India University level in rowing</strong> — an experience that taught me discipline, consistency, and teamwork which I apply in everything I do.</>,
            ].map((text, i) => (
              <p
                key={i}
                className="text-muted-foreground leading-relaxed mb-4"
                style={{
                  fontSize: "15px",
                  opacity: textVisible ? 1 : 0,
                  transform: textVisible ? "translateX(0)" : "translateX(-24px)",
                  transition: `opacity 0.6s ease ${0.15 + i * 0.12}s, transform 0.6s ease ${0.15 + i * 0.12}s`,
                }}
              >
                {text}
              </p>
            ))}

            {/* Hackathon highlight box */}
            <div
              style={{
                background: "rgba(59,130,246,0.06)",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                borderLeft: "3px solid #3b82f6",
                marginTop: "1.5rem",
                opacity: textVisible ? 1 : 0,
                transition: "opacity 0.6s ease 0.55s",
              }}
            >
              <p className="text-muted-foreground" style={{ fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
                <span style={{ color: "#3b82f6", fontWeight: 600 }}>Smart India Hackathon 2025</span> — Ranked{" "}
                <span style={{ color: "#3b82f6", fontWeight: 600 }}>44th out of 200</span> software teams and{" "}
                <span style={{ color: "#3b82f6", fontWeight: 600 }}>11th in Agriculture & Rural Development</span> domain.
              </p>
            </div>

            {/* Tags */}
            <div
              className="flex flex-wrap gap-2 mt-5"
              style={{
                opacity: textVisible ? 1 : 0,
                transition: "opacity 0.6s ease 0.65s",
              }}
            >
              {tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "12px", padding: "5px 12px",
                    borderRadius: "20px", fontWeight: 500,
                    background: tag.bg, color: tag.color,
                    border: `0.5px solid ${tag.border}`,
                  }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right — stat cards ── */}
          <div ref={statsRef} className="flex flex-col gap-3">
            {stats.map((stat, i) => (
              <StatCard
                key={i}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                color={stat.color}
                bgColor={stat.bgColor}
                borderColor={stat.borderColor}
                visible={statsVisible}
                delay={i * 120}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
      `}</style>
    </section>
  );
};

export default About;