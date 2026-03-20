import { useEffect, useRef, useState } from "react";

// ── Staggered scroll fade-in hook ─────────────────────────────────────────────
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

// ── Category accent colors (cycles through 4) ────────────────────────────────
const categoryColors = [
  { tag: "rgba(59,130,246,0.12)", glow: "rgba(59,130,246,0.35)", border: "rgba(59,130,246,0.4)" },   // blue
  { tag: "rgba(139,92,246,0.12)", glow: "rgba(139,92,246,0.35)", border: "rgba(139,92,246,0.4)" },   // purple
  { tag: "rgba(16,185,129,0.12)", glow: "rgba(16,185,129,0.35)", border: "rgba(16,185,129,0.4)" },   // green
  { tag: "rgba(245,158,11,0.12)", glow: "rgba(245,158,11,0.35)", border: "rgba(245,158,11,0.4)" },   // amber
];

// ── Skill tag with glow on hover ──────────────────────────────────────────────
const SkillTag = ({
  skill,
  color,
}: {
  skill: string;
  color: (typeof categoryColors)[0];
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? color.tag : undefined,
        borderColor: hovered ? color.border : undefined,
        boxShadow: hovered ? `0 0 10px ${color.glow}` : undefined,
        transition: "all 0.2s ease",
      }}
      className="px-4 py-2 bg-background border border-border rounded-md text-sm text-foreground cursor-default"
    >
      {skill}
    </span>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "C", "SQL", "JavaScript", "HTML", "CSS"],
    },
    {
      title: "Machine Learning & AI",
      skills: [
        "Machine Learning",
        "Neural Networks",
        "Scikit-learn",
        "TensorFlow",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn",
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        "Git",
        "Tableau",
        "Google Cloud Platform",
        "Jupyter Notebook",
        "VS Code",
      ],
    },
    {
      title: "Core Skills",
      skills: ["Data Analysis", "Problem Solving"],
    },
  ];

  const { ref, visible } = useStaggerFade(skillCategories.length);

  return (
    <section id="skills" className="section-padding bg-secondary/30">
      <div className="section-container">
        <p className="section-title">Technical Skills</p>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-12">
          Technologies & Expertise
        </h2>

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const color = categoryColors[index % categoryColors.length];
            return (
              <div
                key={index}
                className="card-subtle"
                style={{
                  opacity: visible[index] ? 1 : 0,
                  transform: visible[index] ? "translateY(0px)" : "translateY(28px)",
                  transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
                  borderTop: `2px solid ${color.border}`,
                }}
              >
                <h3 className="text-sm font-medium uppercase tracking-wider text-primary mb-4">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <SkillTag key={i} skill={skill} color={color} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;