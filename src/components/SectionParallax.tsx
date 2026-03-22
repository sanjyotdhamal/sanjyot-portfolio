import { useEffect, useState } from "react";

// Reusable mouse parallax background for any section
const SectionParallax = ({
  color1 = "59,130,246",
  color2 = "139,92,246",
  intensity = 15,
}: {
  color1?: string;
  color2?: string;
  intensity?: number;
}) => {
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

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {/* Blob 1 — top left */}
      <div style={{
        position: "absolute", top: "-10%", left: "-5%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: `radial-gradient(circle, rgba(${color1},0.15), transparent 70%)`,
        transform: `translate(${mouse.x * -intensity}px, ${mouse.y * -intensity}px)`,
        transition: "transform 1s cubic-bezier(0.2,0.8,0.2,1)",
      }} />
      {/* Blob 2 — bottom right */}
      <div style={{
        position: "absolute", bottom: "-10%", right: "-5%",
        width: "350px", height: "350px", borderRadius: "50%",
        background: `radial-gradient(circle, rgba(${color2},0.15), transparent 70%)`,
        transform: `translate(${mouse.x * intensity}px, ${mouse.y * intensity}px)`,
        transition: "transform 1.2s cubic-bezier(0.2,0.8,0.2,1)",
      }} />
    </div>
  );
};

export default SectionParallax;