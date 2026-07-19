import SectionParallax from "@/components/SectionParallax";
import { useEffect, useRef, useState } from "react";
import { Briefcase } from "lucide-react";

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

const Experience = () => {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);

  const color = "#3b82f6";

  const experiences = [
    {
      title: "ServiceNow System Administrator Intern",
      duration: "May 2026 – June 2026",
      company: "ServiceNow University | SmartBridge (AICTE) – Virtual",
      responsibilities: [
        "Completed a 1-month virtual internship focused on ServiceNow Administration and IT Service Management (ITSM)",
        "Gained hands-on experience with Incident, Problem, and Change Management modules",
        "Learned ServiceNow Administration Fundamentals, Flows, and Automated Test Framework (ATF) Essentials",
        "Created reports, dashboards, and automated workflows for business process management",
        "Explored Agentic AI integration and prepared for the ServiceNow Certified System Administrator (CSA) certification",
        "Strengthened understanding of enterprise IT workflows and the ServiceNow platform",
      ],
    },
    {
      title: "Artificial Intelligence Intern",
      duration: "June 2025 – July 2025",
      company: "Codec Technologies India (AICTE & ICAC Recognized) – Virtual",
      responsibilities: [
        "Completed a 1-month virtual internship in Artificial Intelligence",
        "Developed a stock price prediction model using historical Tesla stock data",
        "Built a movie recommendation system based on user-selected themes",
        "Worked on data handling, model development, and result analysis",
        "Strengthened practical understanding of machine learning fundamentals",
      ],
    },
  ];

  return (
    <section id="experience" className="section-padding" style={{ position: "relative" }}>
      <SectionParallax color1="59,130,246" color2="139,92,246" />
      <div className="section-container relative z-10">
        <p className="section-title">Experience</p>
        <h2 className="text-2xl md:text-3xl text-foreground mb-12 section-heading">
  Work Experience
</h2>
          
        

        <div ref={ref} className="flex flex-col gap-6">
          {experiences.map((experience, experienceIndex) => (
            <div key={experienceIndex} className="flex gap-0">
              {/* Timeline dot + line */}
              <div className="flex flex-col items-center mr-6" style={{ minWidth: "40px" }}>
                <div
                  style={{
                    width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0,
                    background: hovered ? color : `${color}18`,
                    border: `2px solid ${color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.3s ease",
                    boxShadow: hovered ? `0 0 16px ${color}50` : "none",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "scale(1)" : "scale(0)",
                  }}
                >
                  <Briefcase
                    style={{
                      width: "18px", height: "18px",
                      color: hovered ? "white" : color,
                      transition: "color 0.3s ease",
                    }}
                  />
                </div>
                {experienceIndex < experiences.length - 1 && (
                  <div style={{
                    flex: 1, width: "2px", marginTop: "6px",
                    background: `linear-gradient(to bottom, ${color}60, transparent)`,
                    minHeight: "40px",
                    opacity: inView ? 1 : 0,
                    transition: "opacity 0.8s ease 0.3s",
                  }} />
                )}
              </div>

              {/* Card */}
              <div
                className="card-subtle flex-1"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0px)" : "translateX(30px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  borderLeft: `3px solid ${hovered ? color : color + "40"}`,
                  boxShadow: hovered ? `0 10px 28px ${color}18` : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Background glow */}
                <div style={{
                  position: "absolute", top: "-40px", right: "-40px",
                  width: "180px", height: "180px", borderRadius: "50%",
                  background: `radial-gradient(circle, ${color}08 0%, transparent 70%)`,
                  pointerEvents: "none",
                  opacity: hovered ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }} />

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2 relative z-10">
                  <h3 className="text-lg font-semibold text-foreground">
                    {experience.title}
                  </h3>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full flex-shrink-0"
                    style={{
                      background: `${color}12`,
                      color: color,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    {experience.duration}
                  </span>
                </div>

                <p
                  className="font-medium mb-5 relative z-10"
                  style={{ color: color }}
                >
                  {experience.company}
                </p>

                {/* Responsibilities */}
                <div className="relative z-10">
                  <p className="font-medium text-foreground text-sm mb-3">
                    Responsibilities & Work:
                  </p>
                  <ul className="space-y-2">
                    {experience.responsibilities.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-muted-foreground text-sm"
                        style={{
                          opacity: inView ? 1 : 0,
                          transform: inView ? "translateX(0)" : "translateX(16px)",
                          transition: `opacity 0.5s ease ${0.2 + i * 0.08}s, transform 0.5s ease ${0.2 + i * 0.08}s`,
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ background: color }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;