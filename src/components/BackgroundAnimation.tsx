import { useEffect, useRef } from "react";

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Floating orbs
    const orbs = [
      { x: 0.1,  y: 0.05, r: 320, dx: 0.00012, dy: 0.00008,  color: "rgba(59,130,246,"  },
      { x: 0.85, y: 0.12, r: 280, dx: -0.00010, dy: 0.00012, color: "rgba(139,92,246,"  },
      { x: 0.5,  y: 0.3,  r: 350, dx: 0.00008,  dy: -0.00010, color: "rgba(16,185,129," },
      { x: 0.15, y: 0.55, r: 260, dx: 0.00014,  dy: 0.00006,  color: "rgba(245,158,11," },
      { x: 0.75, y: 0.48, r: 300, dx: -0.00009, dy: -0.00011, color: "rgba(236,72,153," },
      { x: 0.4,  y: 0.72, r: 290, dx: 0.00011,  dy: 0.00009,  color: "rgba(59,130,246," },
      { x: 0.9,  y: 0.78, r: 240, dx: -0.00013, dy: 0.00007,  color: "rgba(139,92,246," },
      { x: 0.2,  y: 0.88, r: 310, dx: 0.00007,  dy: -0.00012, color: "rgba(16,185,129," },
    ].map((o) => ({
      ...o,
      x: o.x * window.innerWidth,
      y: o.y * document.documentElement.scrollHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        // Slow drift
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges
        if (orb.x < -orb.r) orb.x = canvas.width + orb.r;
        if (orb.x > canvas.width + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = canvas.height + orb.r;
        if (orb.y > canvas.height + orb.r) orb.y = -orb.r;

        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.r
        );
        gradient.addColorStop(0, `${orb.color}0.06)`);
        gradient.addColorStop(0.5, `${orb.color}0.03)`);
        gradient.addColorStop(1, `${orb.color}0)`);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Resize canvas height on DOM changes
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
};

export default BackgroundAnimation;