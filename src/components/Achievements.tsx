import { useEffect, useRef, useState } from "react";
import { Star, Trophy, Target, Lightbulb } from "lucide-react";

// ── Stagger fade-in hook ──────────────────────────────────────────────────────
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
              }, i * 150);
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

// ── Card colors ───────────────────────────────────────────────────────────────
const cardColors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

// ── Achievement Card ──────────────────────────────────────────────────────────
const AchievementCard = ({
  icon: Icon,
  title,
  description,
  color,
  visible,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  visible: boolean;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card-subtle relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-6px) scale(1.02)" : "translateY(0px)"
          : "translateY(28px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.3s ease`,
        boxShadow: hovered ? `0 12px 28px ${color}25` : "none",
        borderColor: hovered ? `${color}55` : undefined,
        cursor: "default",
      }}
    >
      {/* Animated top color bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "3px", background: color,
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.35s ease",
      }} />

      {/* Background glow */}
      <div style={{
        position: "absolute", top: "-30px", right: "-30px",
        width: "140px", height: "140px", borderRadius: "50%",
        background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
        pointerEvents: "none",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }} />

      <div className="flex items-start gap-4 relative z-10">
        {/* Icon */}
        <div
          className="flex-shrink-0"
          style={{
            width: "44px", height: "44px",
            borderRadius: "12px",
            background: hovered ? `${color}18` : `${color}10`,
            border: `1.5px solid ${hovered ? color + "55" : color + "20"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: hovered ? "rotate(-8deg) scale(1.1)" : "rotate(0deg) scale(1)",
            transition: "all 0.3s ease",
          }}
        >
          <Icon
            style={{
              width: "20px", height: "20px",
              color: color,
              transition: "color 0.3s ease",
            }}
          />
        </div>

        {/* Text */}
        <div>
          <h3
            className="font-semibold mb-1"
            style={{
              color: hovered ? color : "var(--foreground)",
              transition: "color 0.3s ease",
            }}
          >
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Achievements = () => {
  const achievements = [
    {
      icon: Star,
      title: "Academic Excellence",
      description: "Strong academic performance while actively working on AI/ML projects and practical applications",
    },
    {
      icon: Target,
      title: "Continuous Learning",
      description: "Commitment to growth through industry-recognized certifications from IBM, Google Cloud, and Coursera",
    },
    {
      icon: Lightbulb,
      title: "Real-World Solutions",
      description: "Passion for building technology solutions that address genuine problems in agriculture and governance",
    },
    {
      icon: Trophy,
      title: "Growth Mindset",
      description: "Consistently seeking new learning opportunities and challenges to expand technical expertise",
    },
  ];

  const { ref, visible } = useStaggerFade(achievements.length);

  return (
    <section id="achievements" className="section-padding bg-secondary/30">
      <div className="section-container">
        <p className="section-title">Achievements & Activities</p>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-12">
          Recognition & Growth
        </h2>

        <div ref={ref} className="grid sm:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              icon={achievement.icon}
              title={achievement.title}
              description={achievement.description}
              color={cardColors[index % cardColors.length]}
              visible={visible[index]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;