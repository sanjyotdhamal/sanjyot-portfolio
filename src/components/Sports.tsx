import { useEffect, useRef, useState } from "react";
import { Medal, Users, Clock, Trophy, Waves, Footprints, PersonStanding } from "lucide-react";

// ── Scroll fade hook ──────────────────────────────────────────────────────────
const useStaggerFade = (count: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean[]>(Array(count).fill(false));
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Array.from({ length: count }).forEach((_, i) => {
              setTimeout(() => {
                setVisible((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }, i * 180);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count]);
  return { ref, visible };
};

// ── Stat / Sport tile (same component for both) ───────────────────────────────
const InfoTile = ({
  icon: Icon,
  title,
  subtitle,
  color,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "16px 10px",
        borderRadius: "12px",
        border: `1px solid ${hovered ? color + "55" : "var(--border, rgba(0,0,0,0.08))"}`,
        background: hovered ? `${color}08` : "var(--background)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 6px 18px ${color}20` : "none",
        transition: "all 0.3s ease",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* top color bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "2px", background: color,
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.3s ease",
      }} />

      {/* icon circle */}
      <div style={{
        width: "40px", height: "40px", borderRadius: "50%",
        background: hovered ? `${color}18` : `${color}10`,
        border: `1.5px solid ${hovered ? color + "50" : color + "20"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "10px",
        transform: hovered ? "rotate(-8deg) scale(1.1)" : "scale(1)",
        transition: "all 0.3s ease",
      }}>
        <Icon style={{ width: "18px", height: "18px", color: color }} />
      </div>

      <p style={{
        fontSize: "13px", fontWeight: 600, margin: "0 0 2px",
        color: hovered ? color : "var(--foreground)",
        transition: "color 0.3s ease",
      }}>{title}</p>
      <p style={{
        fontSize: "11px", margin: 0,
        color: "var(--muted-foreground, #888)",
      }}>{subtitle}</p>
    </div>
  );
};

// ── Sports Card ───────────────────────────────────────────────────────────────
const SportsCard = ({
  accentColor,
  badge,
  badgeBg,
  icon: Icon,
  title,
  achievement,
  achievementColor,
  description,
  tiles,
  visible,
  delay,
}: {
  accentColor: string;
  badge: string;
  badgeBg: string;
  icon: React.ElementType;
  title: string;
  achievement: string;
  achievementColor: string;
  description: string;
  tiles: { icon: React.ElementType; title: string; subtitle: string; color: string }[];
  visible: boolean;
  delay: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card-subtle relative overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        borderTop: `3px solid ${accentColor}`,
        boxShadow: hovered ? `0 12px 32px ${accentColor}18` : undefined,
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "-50px", right: "-50px",
        width: "200px", height: "200px", borderRadius: "50%",
        background: `radial-gradient(circle, ${accentColor}08 0%, transparent 70%)`,
        pointerEvents: "none",
        transition: "opacity 0.3s ease",
        opacity: hovered ? 1 : 0.5,
      }} />

      {/* Header row */}
      <div className="flex items-start gap-5 mb-5">
        <div style={{
          width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
          background: `${accentColor}14`,
          border: `1.5px solid ${accentColor}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon style={{ width: "26px", height: "26px", color: accentColor }} />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <span style={{
              fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em",
              padding: "3px 10px", borderRadius: "20px",
              background: badgeBg, color: accentColor,
            }}>
              {badge}
            </span>
          </div>
          <p style={{ color: achievementColor, fontWeight: 600, fontSize: "14px", margin: 0 }}>
            {achievement}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        {description}
      </p>

      {/* Divider */}
      <div style={{
        height: "1px",
        background: `linear-gradient(to right, ${accentColor}30, transparent)`,
        marginBottom: "16px",
      }} />

      {/* Info tiles — same grid for both cards */}
      <div className="grid grid-cols-3 gap-3">
        {tiles.map((tile, i) => (
          <InfoTile
            key={i}
            icon={tile.icon}
            title={tile.title}
            subtitle={tile.subtitle}
            color={tile.color}
          />
        ))}
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Sports = () => {
  const { ref, visible } = useStaggerFade(2);

  const card1Tiles = [
    { icon: Clock,  title: "Discipline",  subtitle: "Rigorous training",   color: "#3b82f6" },
    { icon: Users,  title: "Teamwork",    subtitle: "Synchronized effort", color: "#8b5cf6" },
    { icon: Medal,  title: "Consistency", subtitle: "Daily commitment",    color: "#10b981" },
  ];

  const card2Tiles = [
    { icon: Waves,          title: "Indoor Rowing", subtitle: "Ergometer sport",  color: "#3b82f6" },
    { icon: Footprints,     title: "Cross Country", subtitle: "Endurance running", color: "#10b981" },
    { icon: PersonStanding, title: "Mini Marathon", subtitle: "Distance running",  color: "#f59e0b" },
  ];

  return (
    <section id="sports" className="section-padding">
      <div className="section-container">
        <p className="section-title">Sports</p>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-12">
          Athletic Pursuits
        </h2>

        <div ref={ref} className="flex flex-col gap-6">
          <SportsCard
            accentColor="#3b82f6"
            badge="NATIONAL LEVEL"
            badgeBg="rgba(59,130,246,0.1)"
            icon={Medal}
            title="All India University National Rowing Championship"
            achievement="Participation "
            achievementColor="#3b82f6"
            description="Representing at the national level in rowing has been a defining experience, teaching me invaluable lessons that extend beyond the sport."
            tiles={card1Tiles}
            visible={visible[0]}
            delay={0}
          />

          <SportsCard
            accentColor="#f59e0b"
            badge="COLLEGE LEVEL"
            badgeBg="rgba(245,158,11,0.1)"
            icon={Trophy}
            title="Inter-Collegiate Sports Event"
            achievement="Multiple Medals & Trophies"
            achievementColor="#f59e0b"
            description="Won various medals and trophies across multiple sports events at the inter-collegiate level, demonstrating versatility, competitive spirit, and dedication to athletic excellence."
            tiles={card2Tiles}
            visible={visible[1]}
            delay={180}
          />
        </div>
      </div>
    </section>
  );
};

export default Sports;