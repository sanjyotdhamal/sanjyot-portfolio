import SectionParallax from "@/components/SectionParallax";
import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

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
              }, i * 130);
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

const cardColors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

// ── Single card ───────────────────────────────────────────────────────────────
const ContactCard = ({
  icon: Icon,
  label,
  value,
  href,
  color,
  visible,
  index,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string | null;
  color: string;
  visible: boolean;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  const content = (
    <div
      className="card-subtle text-center relative overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-8px) scale(1.03)" : "translateY(0px)"
          : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.13}s, transform 0.3s ease`,
        boxShadow: hovered ? `0 12px 28px ${color}28` : undefined,
        borderColor: hovered ? `${color}55` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated top color bar */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "3px",
          background: color,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.35s ease",
        }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
        style={{
          background: hovered ? `${color}18` : "rgba(0,0,0,0.04)",
          border: `1.5px solid ${hovered ? color + "55" : "transparent"}`,
          transform: hovered ? "rotate(-8deg) scale(1.12)" : "rotate(0deg) scale(1)",
          transition: "all 0.3s ease",
        }}
      >
        <Icon
          className="w-5 h-5"
          style={{ color: hovered ? color : undefined, transition: "color 0.3s ease" }}
        />
      </div>

      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </p>

      <p
        className="text-sm font-medium"
        style={{
          color: hovered ? color : "var(--foreground)",
          transition: "color 0.3s ease",
        }}
      >
        {value}
      </p>
    </div>
  );

  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="block no-underline"
    >
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sanjyotdhamal31@gmail.com",
      href: "mailto:sanjyotdhamal31@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "8856906418",
      href: "tel:+918856906418",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Pune, Maharashtra, India",
      href: null,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/sanjyot-dhamal-2b6205289",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "View GitHub Profilel",
      href: "https://github.com/sanjyotdhamal",
    },
  ];

  const { ref, visible } = useStaggerFade(contactInfo.length);

  return (
    <section id="contact" className="section-padding bg-secondary/30" style={{ position: "relative" }}>
      <SectionParallax color1="59,130,246" color2="16,185,129" />
      <div className="section-container relative z-10">
        <p className="section-title">Contact</p>

<h2 className="text-2xl md:text-3xl text-foreground mb-12 section-heading">
  Let's Connect
</h2>

        <p className="text-muted-foreground mb-12 max-w-xl">
          I'm open to internship opportunities, collaborations, and conversations
          about AI/ML projects and web devlopment. Feel free to reach out.
        </p>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {contactInfo.map((contact, index) => (
            <ContactCard
              key={index}
              icon={contact.icon}
              label={contact.label}
              value={contact.value}
              href={contact.href}
              color={cardColors[index]}
              visible={visible[index]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;