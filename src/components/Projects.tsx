import { useState, useRef, useEffect } from "react";
import { Droplets, Layers, Leaf, ExternalLink, Github, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ProjectDetail = {
  overview: string;
  features: string[];
  techStack: string[];
  impact: string[];
  learned: string[];
  liveDemo?: string;
  github?: string;
  report?: string;
};

// ── Per-card scroll visibility hook ──────────────────────────────────────────
const useCardInView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
};

// ── Card accent colors ────────────────────────────────────────────────────────
const cardColors = ["#10b981", "#3b82f6", "#8b5cf6"];

// ── 3D Tilt Card ─────────────────────────────────────────────────────────────
const TiltCard = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateY = ((x - cx) / cx) * 10;
    const rotateX = -((y - cy) / cy) * 10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.transition = "transform 0.08s ease";
    const glare = card.querySelector(".tilt-glare") as HTMLElement;
    if (glare) {
      glare.style.opacity = "1";
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.transition = "transform 0.5s ease";
    const glare = card.querySelector(".tilt-glare") as HTMLElement;
    if (glare) glare.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <div
        className="tilt-glare pointer-events-none absolute inset-0 rounded-lg z-10"
        style={{ opacity: 0, transition: "opacity 0.3s ease" }}
      />
      {children}
    </div>
  );
};

// ── Single Project Row ────────────────────────────────────────────────────────
const ProjectRow = ({
  project,
  index,
  color,
  onExplore,
}: {
  project: any;
  index: number;
  color: string;
  onExplore: () => void;
}) => {
  const { ref, inView } = useCardInView();
  const [hovered, setHovered] = useState(false);

  // Alternate: even = slide from left, odd = slide from right
  const fromLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateX(0px) translateY(0px)"
          : `translateX(${fromLeft ? "-60px" : "60px"}) translateY(20px)`,
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <TiltCard
        className="card-subtle group cursor-pointer relative overflow-hidden w-full"
        onClick={onExplore}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Top color bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: "3px", background: color,
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.35s ease",
          }} />

          {/* Background glow */}
          <div style={{
            position: "absolute", top: "-40px", right: "-40px",
            width: "200px", height: "200px", borderRadius: "50%",
            background: `radial-gradient(circle, ${color}08 0%, transparent 70%)`,
            pointerEvents: "none",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }} />

          <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">

            {/* Left — icon + year + number */}
            <div className="flex md:flex-col items-center md:items-center gap-4 md:gap-2 flex-shrink-0">
              <div
                style={{
                  width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
                  background: hovered ? `${color}18` : `${color}10`,
                  border: `1.5px solid ${hovered ? color + "55" : color + "20"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transform: hovered ? "rotate(-6deg) scale(1.1)" : "scale(1)",
                  transition: "all 0.3s ease",
                }}
              >
                <project.icon style={{ width: "24px", height: "24px", color }} />
              </div>
              <span
                className="text-xs font-bold"
                style={{ color: `${color}80`, letterSpacing: "0.05em" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Middle — title + tags */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                <h3
                  className="text-xl font-semibold transition-colors"
                  style={{ color: hovered ? color : "var(--foreground)" }}
                >
                  {project.title}
                </h3>
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 w-fit"
                  style={{
                    background: `${color}12`,
                    color: color,
                    border: `1px solid ${color}30`,
                  }}
                >
                  {project.year}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 5).map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded border text-muted-foreground"
                    style={{
                      background: hovered ? `${color}08` : "var(--background)",
                      borderColor: hovered ? `${color}30` : "var(--border)",
                      transition: `all 0.2s ease ${i * 0.04}s`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="text-xs px-2 py-1 bg-background border border-border rounded text-muted-foreground">
                    +{project.technologies.length - 5} more
                  </span>
                )}
              </div>
            </div>

            {/* Right — explore hint */}
            <div className="flex items-center flex-shrink-0">
              <p
                className="text-xs font-medium flex items-center gap-1"
                style={{
                  color: color,
                  transform: hovered ? "translateX(4px)" : "translateX(0px)",
                  transition: "transform 0.2s ease",
                }}
              >
                Explore →
              </p>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      title: "Smart Agri-Booth",
      icon: Leaf,
      technologies: ["Python", "Flask", "SQLite3", "Pandas", "Matplotlib", "IoT Simulation"],
      year: "2024–2025",
      description: [
        "Web-based platform providing digital agricultural services to farmers",
        "Features include soil analysis, service requests, and government scheme information",
        "Developed using Flask, HTML, CSS, and JavaScript",
        "Simulated IoT data to monitor farm conditions",
      ],
      detail: {
        overview: "Smart Agri-Booth is an intelligent web platform designed to empower farmers with digital agricultural services, real-time insights, and data-driven decision support.",
        features: ["Farmer & Admin Dashboards", "Service Request Management", "Soil & Farm Data Monitoring (IoT Simulation)", "Data Visualization & Analytics", "Government Scheme Information", "Secure Database Integration"],
        techStack: ["Python", "Flask", "SQLite", "Pandas", "HTML", "CSS", "JavaScript", "Matplotlib"],
        impact: ["Improves transparency between farmers and authorities", "Enables smarter farming decisions using data insights", "Demonstrates scalable architecture for future IoT integration"],
        learned: ["Full-stack web development with Flask", "Database design & integration", "Data visualization techniques", "Real-world problem solving in agriculture domain"],
        liveDemo: "#", github: "#", report: "#",
      } as ProjectDetail,
    },
    {
      title: "Subsi-Chain: Subsidy Distribution Tracker",
      icon: Layers,
      technologies: ["Blockchain", "Web Application", "React.js", "Node.js", "MongoDB"],
      year: "2025",
      description: [
        "Blockchain-based system to track government and NGO subsidy distribution",
        "Separate dashboards for farmers and authorities",
        "Subsidy transactions recorded on a secure, tamper-proof ledger",
        "Improves transparency and reduces chances of fraud",
      ],
      detail: {
        overview: "Subsi-Chain is a blockchain-powered platform designed to bring transparency, security, and trust to subsidy distribution.",
        features: ["Farmer & Authority Dashboards", "Blockchain-Based Subsidy Ledger", "Real-Time Subsidy Tracking", "Secure Authentication & Role Access", "Transparent Transaction History", "Notification System"],
        techStack: ["React.js", "Node.js", "Blockchain", "MongoDB"],
        impact: ["Increases transparency in subsidy distribution", "Reduces fraud and corruption risks", "Builds trust between farmers and authorities"],
        learned: ["Blockchain fundamentals and integration", "Full-stack web development", "Secure authentication systems"],
        report: "#",
      } as ProjectDetail,
    },
    {
      title: "Smart Irrigation System",
      icon: Droplets,
      technologies: ["IoT", "Sensors", "Microcontroller", "Cloud Computing", "Python"],
      year: "2024",
      description: [
        "IoT-based automated irrigation system for efficient water management in agriculture",
        "Uses soil moisture and weather sensors",
        "Automatically controls water pumps",
        "Reduces water wastage and improves crop yield",
      ],
      detail: {
        overview: "Smart Irrigation System optimizes water usage using IoT sensors and automation.",
        features: ["Soil Moisture Monitoring", "Automated Irrigation", "IoT Sensor Integration", "Real-Time Data Analysis"],
        techStack: ["IoT Sensors", "Automation", "Embedded Systems"],
        impact: ["Reduces water consumption", "Improves crop yield", "Supports sustainable farming"],
        learned: ["IoT system design", "Automation in agriculture", "Data-driven farming decisions"],
        liveDemo: "#", github: "#", report: "#",
      } as ProjectDetail,
    },
  ];

  const selected = selectedProject !== null ? projects[selectedProject] : null;

  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="section-container">
        <p className="section-title">Projects</p>
        <h2 className="text-2xl md:text-3xl text-foreground mb-12 section-heading">
  Featured Work
</h2>

        {/* Vertical project rows */}
        <div className="flex flex-col gap-4">
          {projects.map((project, index) => (
            <ProjectRow
              key={index}
              project={project}
              index={index}
              color={cardColors[index % cardColors.length]}
              onExplore={() => project.detail && setSelectedProject(index)}
            />
          ))}
        </div>

        {/* Modal */}
        <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            {selected?.detail && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl">
                    <selected.icon className="w-7 h-7 text-primary" />
                    {selected.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">{selected.detail.overview}</p>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">About</h4>
                    <ul className="space-y-1 text-muted-foreground text-sm">
                      {selected.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Features</h4>
                    <ul className="space-y-1 text-muted-foreground text-sm">
                      {selected.detail.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.detail.techStack.map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-background border border-border rounded text-muted-foreground">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Impact</h4>
                    <ul className="space-y-1 text-muted-foreground text-sm">
                      {selected.detail.impact.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">What I Learned</h4>
                    <ul className="space-y-1 text-muted-foreground text-sm">
                      {selected.detail.learned.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {(selected.detail.liveDemo || selected.detail.github || selected.detail.report) && (
                    <div className="flex gap-3 pt-2">
                      {selected.detail.liveDemo && selected.detail.liveDemo !== "#" && (
                        <a href={selected.detail.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                          <ExternalLink className="w-3 h-3" /> Live Demo
                        </a>
                      )}
                      {selected.detail.github && selected.detail.github !== "#" && (
                        <a href={selected.detail.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                          <Github className="w-3 h-3" /> GitHub
                        </a>
                      )}
                      {selected.detail.report && selected.detail.report !== "#" && (
                        <a href={selected.detail.report} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                          <FileText className="w-3 h-3" /> Report
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Projects;