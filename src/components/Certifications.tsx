import { Award, Eye } from "lucide-react";
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import oracleCert from "@/assets/oracle-certificate.png";
import ibmMlCert from "@/assets/ibm-ml-certificate.png";
import tableauCert from "@/assets/tableau-certificate.png";
import Deloitte from "@/assets/Deloitte.png";
import genAiCert from "@/assets/generative-ai-certificate.png";
import pythonCert from "@/assets/python-cert.png";
import softwaretest from "@/assets/software-testing.png";
import CTcert from "@/assets/CT-cert.png";

interface CertItem {
  name: string;
  image?: string;
  color: string;
}

// ── Single cert card ──────────────────────────────────────────────────────────
const CertCard = ({
  cert,
  onClick,
}: {
  cert: CertItem;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card-subtle flex items-start gap-4 flex-shrink-0 relative overflow-hidden"
      style={{
        minWidth: "280px",
        maxWidth: "280px",
        cursor: cert.image ? "pointer" : "default",
        borderColor: hovered ? `${cert.color}55` : undefined,
        background: hovered ? `${cert.color}08` : undefined,
        transform: hovered ? "translateY(-5px) scale(1.02)" : "translateY(0px) scale(1)",
        boxShadow: hovered ? `0 10px 24px ${cert.color}25` : "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated top color bar */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "3px",
          background: cert.color,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.35s ease",
        }}
      />

      {/* Icon */}
      <div className="flex-shrink-0">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            background: hovered ? `${cert.color}18` : "rgba(0,0,0,0.04)",
            border: `1.5px solid ${hovered ? cert.color + "55" : "transparent"}`,
            transform: hovered ? "rotate(-8deg) scale(1.12)" : "rotate(0deg) scale(1)",
            transition: "all 0.3s ease",
          }}
        >
          <Award
            className="w-5 h-5"
            style={{
              color: hovered ? cert.color : undefined,
              transition: "color 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Text */}
      <div>
        <p
          className="text-sm leading-relaxed"
          style={{
            color: hovered ? cert.color : undefined,
            transition: "color 0.3s ease",
          }}
        >
          {cert.name}
        </p>
        {cert.image && (
          <p
            className="text-xs mt-2 font-medium flex items-center gap-1"
            style={{
              color: cert.color,
              opacity: hovered ? 1 : 0.55,
              transition: "opacity 0.3s ease",
            }}
          >
            <Eye className="w-3 h-3" /> View Certificate
          </p>
        )}
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const certifications: CertItem[] = [
    { name: "IBM Machine Learning with Python & Scikit-learn", image: ibmMlCert,    color: "rgb(57, 151, 246)" },
    { name: "Intro to Generative AI",                           image: genAiCert,   color: "#08eb9f" },
    { name: "Introduction to Tableau",                          image: tableauCert, color: "#f59e0b" },
    { name: "Data Analytics Job Simulation – Deloitte Australia (Forage)",image: Deloitte, color: "#19ff08" },
    { name: "AI Foundations Associate by Oracle",               image: oracleCert,  color: "#ec4899" },
    { name: "Python Programming – Reliance Foundation Skilling Academy", image: pythonCert, color: "#06b6d4" },
    { name: "Foundations of Software Testing and Validation", image: softwaretest, color: "#d406bc" },
    { name: "Computational Thinking for Problem Solving", image: CTcert, color: "#f50b0b" },
  ];

  const row1 = [...certifications.slice(0, 3), ...certifications.slice(0, 3), ...certifications.slice(0, 3)];
  const row2 = [...certifications.slice(3),    ...certifications.slice(3),    ...certifications.slice(3)];

  const pause  = (ref: React.RefObject<HTMLDivElement>) => { if (ref.current) ref.current.style.animationPlayState = "paused";  };
  const resume = (ref: React.RefObject<HTMLDivElement>) => { if (ref.current) ref.current.style.animationPlayState = "running"; };

  const maskStyle: React.CSSProperties = {
    maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
  };

  return (
    <section id="certifications" className="section-padding">
      <div className="section-container">
        <p className="section-title">Certifications</p>
        <h2 className="text-2xl md:text-3xl text-foreground mb-12 section-heading">
  Professional Development
</h2>
      </div>

      {/* Marquee band — uses bg-secondary/30 to match rest of portfolio */}
      <div className="bg-secondary/30 py-8 relative">

        {/* Subtle colored gradient blobs in background */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "-40%", left: "10%",
            width: "300px", height: "300px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          }} />
          <div style={{
            position: "absolute", top: "-20%", right: "15%",
            width: "250px", height: "250px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          }} />
          <div style={{
            position: "absolute", bottom: "-30%", left: "40%",
            width: "280px", height: "280px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
          }} />
        </div>

        <div className="flex flex-col gap-4 relative">
          {/* Row 1 — scrolls left */}
          <div
            className="relative w-full overflow-hidden"
            style={maskStyle}
            onMouseEnter={() => pause(row1Ref)}
            onMouseLeave={() => resume(row1Ref)}
          >
            <div
              ref={row1Ref}
              className="flex w-max"
              style={{ gap: "12px", paddingLeft: "12px", animation: "marquee-left 22s linear infinite" }}
            >
              {row1.map((cert, index) => (
                <CertCard key={index} cert={cert} onClick={() => cert.image && setSelectedCert(cert)} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div
            className="relative w-full overflow-hidden"
            style={maskStyle}
            onMouseEnter={() => pause(row2Ref)}
            onMouseLeave={() => resume(row2Ref)}
          >
            <div
              ref={row2Ref}
              className="flex w-max"
              style={{ gap: "12px", paddingLeft: "12px", animation: "marquee-right 22s linear infinite" }}
            >
              {row2.map((cert, index) => (
                <CertCard key={index} cert={cert} onClick={() => cert.image && setSelectedCert(cert)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Certificate viewer */}
      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="max-w-3xl p-2">
          <DialogTitle className="sr-only">{selectedCert?.name}</DialogTitle>
          {selectedCert?.image && (
            <img
              src={selectedCert.image}
              alt={selectedCert.name}
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Certifications;