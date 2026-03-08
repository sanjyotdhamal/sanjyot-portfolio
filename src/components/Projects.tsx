import { useState } from "react";
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
        overview:
          "Smart Agri-Booth is an intelligent web platform designed to empower farmers with digital agricultural services, real-time insights, and data-driven decision support.",
        features: [
          "Farmer & Admin Dashboards",
          "Service Request Management",
          "Soil & Farm Data Monitoring (IoT Simulation)",
          "Data Visualization & Analytics",
          "Government Scheme Information",
          "Secure Database Integration",
        ],
        techStack: ["Python", "Flask", "SQLite", "Pandas", "HTML", "CSS", "JavaScript", "Matplotlib"],
        impact: [
          "Improves transparency between farmers and authorities",
          "Enables smarter farming decisions using data insights",
          "Demonstrates scalable architecture for future IoT integration",
        ],
        learned: [
          "Full-stack web development with Flask",
          "Database design & integration",
          "Data visualization techniques",
          "Real-world problem solving in agriculture domain",
        ],
        liveDemo: "#",
        github: "#",
        report: "#",
      } as ProjectDetail,
    },
    {
      title: "Subsi-Chain: Subsidy Distribution Tracker",
      icon: Layers,
      technologies: ["Blockchain", "Web Application"],
      year: "2025",
      description: [
        "Blockchain-based system to track government and NGO subsidy distribution",
        "Separate dashboards for farmers and authorities",
        "Subsidy transactions recorded on a secure, tamper-proof ledger",
        "Improves transparency and reduces chances of fraud",
      ],
      detail: {
        overview:
          "Subsi-Chain is a blockchain-powered platform designed to bring transparency, security, and trust to subsidy distribution.",
        features: [
          "Farmer & Authority Dashboards",
          "Blockchain-Based Subsidy Ledger",
          "Real-Time Subsidy Tracking",
          "Secure Authentication & Role Access",
          "Transparent Transaction History",
          "Notification System",
        ],
        techStack: ["React.js", "Node.js", "Blockchain", "MongoDB"],
        impact: [
          "Increases transparency in subsidy distribution",
          "Reduces fraud and corruption risks",
          "Builds trust between farmers and authorities",
        ],
        learned: [
          "Blockchain fundamentals and integration",
          "Full-stack web development",
          "Secure authentication systems",
        ],
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
        overview:
          "Smart Irrigation System optimizes water usage using IoT sensors and automation.",
        features: [
          "Soil Moisture Monitoring",
          "Automated Irrigation",
          "IoT Sensor Integration",
          "Real-Time Data Analysis",
        ],
        techStack: ["IoT Sensors", "Automation", "Embedded Systems"],
        impact: [
          "Reduces water consumption",
          "Improves crop yield",
          "Supports sustainable farming",
        ],
        learned: [
          "IoT system design",
          "Automation in agriculture",
          "Data-driven farming decisions",
        ],
        liveDemo: "#",
        github: "#",
        report: "#",
      } as ProjectDetail,
    },
  ];

  const selected = selectedProject !== null ? projects[selectedProject] : null;

  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="section-container">
        <p className="section-title">Projects</p>

        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-12">
          Featured Work
        </h2>

        {/* SIDEWAYS SCROLL CONTAINER */}
        <div className="flex gap-6 overflow-x-auto pb-6 scroll-smooth">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card-subtle group min-w-[340px] h-full flex flex-col cursor-pointer hover:border-primary/50 transition-all"
              onClick={() => project.detail && setSelectedProject(index)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <project.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{project.year}</span>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-background border border-border rounded text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="space-y-1 text-muted-foreground text-sm flex-1">
                {project.description.map((desc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>

              {project.detail && (
                <p className="text-xs text-primary mt-3 font-medium">
                  Explore Project →
                </p>
              )}
            </div>
          ))}
        </div>

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
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selected.detail.overview}
                  </p>
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