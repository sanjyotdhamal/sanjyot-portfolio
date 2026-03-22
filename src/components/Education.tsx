import SectionParallax from "@/components/SectionParallax";
import { useEffect, useRef, useState } from "react";
import { GraduationCap } from "lucide-react";

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

const educationData = [
  {
    institution: "MIT ADT University, Pune",
    degree: "Bachelor of Technology in Computer Engineering",
    period: "Aug 2023 – Present",
    color: "#3b82f6",
    coursework: [
      "Machine Learning",
      "Artificial Intelligence",
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Data Analytics Fundamentals",
    ],
  },
  {
    institution: "Sinhgad College of Arts, Commerce and Science, Pune",
    degree: "Higher Secondary Certificate (HSC)",
    period: "July 2021 – May 2023",
    color: "#8b5cf6",
    coursework: [],
  },
];

// ── Education card ────────────────────────────────────────────────────────────
const EduCard = ({
  edu,
  index,
  isLast,
  visible,
}: {
  edu: (typeof educationData)[0];
  index: number;
  isLast: boolean;
  visible: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex gap-0">
      {/* Timeline column */}
      <div className="flex flex-col items-center mr-6" style={{ minWidth: "40px" }}>
        {/* Dot */}
        <div
          style={{
            width: "40px", height: "40px",
            borderRadius: "50%",
            background: hovered ? edu.color : `${edu.color}18`,
            border: `2px solid ${edu.color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.3s ease",
            boxShadow: hovered ? `0 0 16px ${edu.color}50` : "none",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0)",
            transitionDelay: `${index * 0.2}s`,
          }}
        >
          <GraduationCap
            style={{
              width: "18px", height: "18px",
              color: hovered ? "white" : edu.color,
              transition: "color 0.3s ease",
            }}
          />
        </div>

        {/* Vertical line */}
        {!isLast && (
          <div
            style={{
              flex: 1,
              width: "2px",
              marginTop: "6px",
              background: `linear-gradient(to bottom, ${edu.color}60, ${educationData[index + 1]?.color}30)`,
              minHeight: "40px",
              opacity: visible ? 1 : 0,
              transition: `opacity 0.8s ease ${index * 0.2 + 0.3}s`,
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="card-subtle flex-1 mb-8"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0px)" : "translateX(30px)",
          transition: `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s, box-shadow 0.3s ease, border-color 0.3s ease`,
          borderLeft: `3px solid ${hovered ? edu.color : edu.color + "40"}`,
          boxShadow: hovered ? `0 8px 24px ${edu.color}18` : "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "-30px", right: "-30px",
          width: "150px", height: "150px", borderRadius: "50%",
          background: `radial-gradient(circle, ${edu.color}08 0%, transparent 70%)`,
          pointerEvents: "none",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-foreground">
            {edu.institution}
          </h3>
          <span
            className="text-xs font-medium px-3 py-1 rounded-full flex-shrink-0"
            style={{
              background: `${edu.color}12`,
              color: edu.color,
              border: `1px solid ${edu.color}30`,
            }}
          >
            {edu.period}
          </span>
        </div>

        <p className="text-muted-foreground mb-4">{edu.degree}</p>

        {edu.coursework.length > 0 && (
          <div>
            <p className="text-sm font-medium text-foreground mb-2">
              Relevant Coursework:
            </p>
            <div className="flex flex-wrap gap-2">
              {edu.coursework.map((course, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: hovered ? `${edu.color}12` : "var(--secondary)",
                    color: hovered ? edu.color : "var(--muted-foreground)",
                    border: `1px solid ${hovered ? edu.color + "30" : "transparent"}`,
                    transition: `all 0.2s ease ${i * 0.04}s`,
                  }}
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Education = () => {
  const { ref, inView } = useInView();

  return (
    <section id="education" className="section-padding" style={{ position: "relative" }}>
      <SectionParallax color1="59,130,246" color2="16,185,129" />
      <div className="section-container relative z-10">
        <p className="section-title">Education</p>
        <h2 className="text-2xl md:text-3xl text-foreground mb-12 section-heading">
  Academic Background
</h2>

        <div ref={ref}>
          {educationData.map((edu, index) => (
            <EduCard
              key={index}
              edu={edu}
              index={index}
              isLast={index === educationData.length - 1}
              visible={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;