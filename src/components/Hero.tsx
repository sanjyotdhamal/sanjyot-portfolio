import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import profileImage from "@/assets/profile.png";

// ── Mouse Parallax Hook ───────────────────────────────────────────────────────
const useMouseParallax = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);
  return mouse;
};

// ── Floating Particles Background ────────────────────────────────────────────
const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animFrameId: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1, dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4, opacity: Math.random() * 0.4 + 0.1,
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
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animFrameId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.6 }} />;
};

// ── Typing Animation ──────────────────────────────────────────────────────────
const roles = ["AI & ML Enthusiast", "Web Developer", "Blockchain Builder", "Data Science Explorer", "Athlete & Team Player"];
const TypingText = () => {
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length) timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    else if (!deleting && displayed.length === current.length) timeout = setTimeout(() => setDeleting(true), 1600);
    else if (deleting && displayed.length > 0) timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    else if (deleting && displayed.length === 0) { setDeleting(false); setRoleIndex((prev) => (prev + 1) % roles.length); }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);
  return (
    <p className="text-lg md:text-xl leading-relaxed mb-4" style={{ color: "var(--muted-foreground)", fontWeight: 300, minHeight: "32px" }}>
      {displayed}
      <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle" style={{ animation: "blink-cursor 0.8s step-end infinite" }} />
    </p>
  );
};

const useMountFade = (delay: number) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return visible;
};

const SocialBtn = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        width: "38px", height: "38px", borderRadius: "10px",
        background: hovered ? "#E6F1FB" : "var(--secondary, rgba(0,0,0,0.04))",
        border: `1px solid ${hovered ? "#3b82f6" : "var(--border, rgba(0,0,0,0.1))"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s ease", transform: hovered ? "translateY(-3px)" : "translateY(0)", textDecoration: "none",
      }}
    >{children}</a>
  );
};

// ── Main Hero Component ───────────────────────────────────────────────────────
const Hero = () => {
  const v0 = useMountFade(100);
  const v1 = useMountFade(250);
  const v2 = useMountFade(400);
  const v3 = useMountFade(550);
  const v4 = useMountFade(700);
  const v5 = useMountFade(850);
  const mouse = useMouseParallax();
  const [btnHovered, setBtnHovered] = useState<string | null>(null);

  const fadeUp = (visible: boolean, delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <ParticlesBackground />

      {/* Mouse-reactive background blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "10%", left: "5%",
          width: "350px", height: "350px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.09), transparent 70%)",
          transform: `translate(${mouse.x * -22}px, ${mouse.y * -22}px)`,
          transition: "transform 0.8s cubic-bezier(0.2,0.8,0.2,1)",
        }} />
        <div style={{
          position: "absolute", top: "55%", right: "5%",
          width: "280px", height: "280px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.09), transparent 70%)",
          transform: `translate(${mouse.x * 25}px, ${mouse.y * 25}px)`,
          transition: "transform 1s cubic-bezier(0.2,0.8,0.2,1)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "35%",
          width: "220px", height: "220px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)",
          transform: `translate(${mouse.x * -15}px, ${mouse.y * 18}px)`,
          transition: "transform 1.2s cubic-bezier(0.2,0.8,0.2,1)",
        }} />
        <div style={{
          position: "absolute", top: "30%", right: "25%",
          width: "180px", height: "180px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.07), transparent 70%)",
          transform: `translate(${mouse.x * 18}px, ${mouse.y * -14}px)`,
          transition: "transform 0.9s cubic-bezier(0.2,0.8,0.2,1)",
        }} />
      </div>

      <div className="section-container py-20 relative z-10 w-full">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 items-center">

          {/* ── LEFT — image + socials ── */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "20px",
            opacity: v0 ? 1 : 0,
            transform: v0
              ? `translateX(0px) translate(${mouse.x * -10}px, ${mouse.y * -10}px)`
              : "translateX(-30px)",
            transition: v0 ? "opacity 0.7s ease, transform 0.9s cubic-bezier(0.2,0.8,0.2,1)" : "opacity 0.7s ease, transform 0.7s ease",
          }}>
            <div style={{ position: "relative", width: "220px", height: "220px" }}>
              <div style={{ position: "absolute", inset: "-18px", borderRadius: "50%", border: "1.5px dashed rgba(59,130,246,0.25)", animation: "spin-slow 20s linear infinite reverse" }} />
              <div style={{ position: "absolute", inset: "-8px", borderRadius: "50%", border: "2px dashed rgba(59,130,246,0.35)", animation: "spin-slow 12s linear infinite" }} />
              <img src={profileImage} alt="Sanjyot Dhamal" style={{
                width: "220px", height: "220px", borderRadius: "50%",
                objectFit: "cover", objectPosition: "center top",
                border: "3px solid white",
                boxShadow: "0 8px 32px rgba(59,130,246,0.15)",
                position: "relative", zIndex: 1,
              }} />
              <div style={{ position: "absolute", bottom: "14px", right: "14px", width: "16px", height: "16px", borderRadius: "50%", background: "#10b981", border: "3px solid white", zIndex: 2, boxShadow: "0 0 8px rgba(16,185,129,0.5)" }} />
            </div>
            <div style={{ ...fadeUp(v5), display: "flex", gap: "10px" }}>
              <SocialBtn href="https://github.com/sanjyotdhamal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </SocialBtn>
              <SocialBtn href="https://www.linkedin.com/in/sanjyot-dhamal-2b6205289">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </SocialBtn>
              <SocialBtn href="mailto:sanjyotdhamal31@gmail.com">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </SocialBtn>
            </div>
          </div>

          {/* ── RIGHT — text ── */}
          <div style={{
            transform: `translate(${mouse.x * 8}px, ${mouse.y * 8}px)`,
            transition: "transform 0.9s cubic-bezier(0.2,0.8,0.2,1)",
          }}>
            <div style={fadeUp(v0)}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#185FA5", background: "#E6F1FB", border: "0.5px solid #B5D4F4",
                borderRadius: "20px", padding: "5px 14px", marginBottom: "1.5rem",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6", animation: "pulse-badge 2s ease-in-out infinite" }} />
                Computer Science Engineering Student
              </div>
            </div>
            <div style={fadeUp(v1)}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 5.5vw, 64px)", fontWeight: 700, lineHeight: 1.1, marginBottom: "0.75rem", color: "var(--foreground)" }}>
                Sanjyot Dhamal
              </h1>
            </div>
            <div style={fadeUp(v2)}><TypingText /></div>
            <div style={fadeUp(v3)}>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg" style={{ fontSize: "15px" }}>
                Computer Science Engineering student with strong interest in Artificial Intelligence and Machine Learning. Experienced in building data-driven applications, blockchain-based systems, and practical ML solutions.
              </p>
            </div>
            <div style={{ ...fadeUp(v4), display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a href="#projects"
                onMouseEnter={() => setBtnHovered("primary")} onMouseLeave={() => setBtnHovered(null)}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: 500, background: btnHovered === "primary" ? "#1e293b" : "#0f172a", color: "white", border: "none", textDecoration: "none", transform: btnHovered === "primary" ? "translateY(-2px)" : "translateY(0)", boxShadow: btnHovered === "primary" ? "0 8px 20px rgba(0,0,0,0.2)" : "none", transition: "all 0.25s ease" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                View Projects
              </a>
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} download
                onMouseEnter={() => setBtnHovered("outline")} onMouseLeave={() => setBtnHovered(null)}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 22px", borderRadius: "10px", fontSize: "14px", fontWeight: 500, background: "transparent", color: btnHovered === "outline" ? "#3b82f6" : "var(--foreground)", border: `1.5px solid ${btnHovered === "outline" ? "#3b82f6" : "var(--border, rgba(0,0,0,0.2))"}`, textDecoration: "none", transform: btnHovered === "outline" ? "translateY(-2px)" : "translateY(0)", transition: "all 0.25s ease" }}>
                <Download style={{ width: "16px", height: "16px" }} />
                View Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ zIndex: 10 }}>
        <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
          </svg>
        </a>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
        @keyframes blink-cursor { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse-badge { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.7)} }
      `}</style>
    </section>
  );
};

export default Hero;