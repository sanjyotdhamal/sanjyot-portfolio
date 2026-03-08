import { Award, Eye } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import oracleCert from "@/assets/oracle-certificate.png";
import ibmMlCert from "@/assets/ibm-ml-certificate.png";
import tableauCert from "@/assets/tableau-certificate.png";
import genAiCert from "@/assets/generative-ai-certificate.png";

interface CertItem {
  name: string;
  image?: string;
}

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);

  const certifications: CertItem[] = [
    { name: "IBM Machine Learning with Python & Scikit-learn", image: ibmMlCert },
    { name: "Machine Learning Capstone – Coursera" },
    { name: "Intro to Generative AI", image: genAiCert },
    { name: "Introduction to Tableau", image: tableauCert },
    { name: "Data Analytics Job Simulation – Deloitte Australia (Forage)" },
    { name: "AI Foundations Associate by Oracle", image: oracleCert },
  ];

  return (
    <section id="certifications" className="section-padding">
      <div className="section-container">
        <p className="section-title">Certifications</p>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-12">
          Professional Development
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`card-subtle flex items-start gap-4 ${cert.image ? "cursor-pointer hover:border-primary/40 transition-colors" : ""}`}
              onClick={() => cert.image && setSelectedCert(cert)}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <p className="text-sm text-foreground leading-relaxed">
                  {cert.name}
                </p>
                {cert.image && (
                  <p className="text-xs text-primary mt-2 font-medium flex items-center gap-1">
                    <Eye className="w-3 h-3" /> View Certificate
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

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
