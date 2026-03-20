import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import profileImage from "@/assets/profile.png";

// ── Floating Particles Background ────────────────────────────────────────────
const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const PARTICLE_COUNT = 55;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100,100,100,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,120,120,${p.opacity})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      animFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

// ── Typing Animation ──────────────────────────────────────────────────────────
const roles = [
  "AI & ML Enthusiast",
  "Web Developer",
  "Blockchain Builder",
  "Data Science Explorer",
  "Athlete & Team Player",
];

const TypingText = () => {
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
      {displayed}
      <span
        className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle"
        style={{ animation: "blink-cursor 0.8s step-end infinite" }}
      />
    </p>
  );
};

// ── Fade-in on mount hook ─────────────────────────────────────────────────────
const useMountFade = (delay: number) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return visible;
};

// ── Main Hero Component ───────────────────────────────────────────────────────
const Hero = () => {
  const v0 = useMountFade(100);
  const v1 = useMountFade(300);
  const v2 = useMountFade(500);
  const v3 = useMountFade(700);
  const v4 = useMountFade(900);

  const fadeStyle = (visible: boolean, extraDelay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${extraDelay}ms, transform 0.7s ease ${extraDelay}ms`,
  });

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Particles */}
      <ParticlesBackground />

      <div className="section-container py-32 relative z-10">
        <div className="max-w-4xl">
          {/* Profile image + name row */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">

            {/* Profile image with ring pulse */}
            <div style={fadeStyle(v0)} className="relative flex-shrink-0">
              <div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                style={{ animation: "ring-pulse 2.5s ease-out infinite" }}
              />
              <img
                src={profileImage}
                alt="Sanjyot Dhamal"
                className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-primary/20 shadow-lg relative z-10"
              />
            </div>

            <div>
              {/* Label */}
              <div style={fadeStyle(v1)}>
                <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">
                  COMPUTER SCIENCE ENGINEERING STUDENT
                </p>
              </div>

              {/* Name — Playfair Display font */}
              <div style={fadeStyle(v2)}>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    letterSpacing: "-0.5px",
                  }}
                >
                  Sanjyot Dhamal
                </h1>
              </div>
            </div>
          </div>

          {/* Typing role */}
          <div style={fadeStyle(v3)}>
            <TypingText />
          </div>

          {/* Description */}
          <div style={fadeStyle(v3)}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              Computer Science Engineering student with strong interest in Artificial
              Intelligence and Machine Learning. Experienced in building data-driven
              applications, blockchain-based systems, and practical ML solutions.
            </p>
          </div>

          {/* Buttons */}
          <div style={fadeStyle(v4)} className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">
                View Projects
                <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap');

        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes ring-pulse {
          0%   { transform: scale(1);    opacity: 0.6; }
          100% { transform: scale(1.18); opacity: 0;   }
        }
      `}</style>
    </section>
  );
};

export default Hero;