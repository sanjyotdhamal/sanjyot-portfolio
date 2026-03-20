import { useEffect, useRef, useState } from "react";

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

// ── Main Component ────────────────────────────────────────────────────────────
const About = () => {
  const { ref, inView } = useInView();

  const paragraphs = [
    <>Currently pursuing B.Tech in Computer Science Engineering at MIT ADT University, Pune. With a deep interest in Artificial Intelligence, Machine Learning, and Data Analysis.</>,
    <>I believe in hands-on learning and have gained practical experience through internships, projects, hackathons, and industry-recognized certifications. My approach combines theoretical understanding with real-world application.</>,
    <>Participated in <span className="text-foreground font-medium">Smart India Hackathon 2025</span> (Internal Round), where our team ranked <span className="text-foreground font-medium">44th out of 200 software teams</span> and <span className="text-foreground font-medium">11th in the Agriculture &amp; Rural Development domain</span>.</>,
    <>Beyond academics, I am an active sportsperson and have represented MIT ADT University at the All India University level in rowing. This experience has taught me discipline, consistency, and teamwork, which I apply in my studies and projects.</>,
  ];

  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="section-container">
        <p className="section-title">About Me</p>

        <div ref={ref}>
          {/* Heading */}
          <h2
            className="text-2xl md:text-3xl font-semibold text-foreground mb-8"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0px)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            Passionate about building intelligent solutions
          </h2>

          {/* Paragraphs — staggered slide in from left */}
          <div className="space-y-6">
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className="text-muted-foreground leading-relaxed"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0px)" : "translateX(-28px)",
                  transition: `opacity 0.6s ease ${0.1 + i * 0.13}s, transform 0.6s ease ${0.1 + i * 0.13}s`,
                }}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;