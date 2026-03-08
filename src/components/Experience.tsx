import { Briefcase } from "lucide-react";
const Experience = () => {
  return <section id="experience" className="section-padding">
      <div className="section-container">
        <p className="section-title">
      </p>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-12">Experience</h2>

        <div className="card-subtle">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Artificial Intelligence Intern
                </h3>
                <span className="text-sm text-muted-foreground">
                  June 2025 – July 2025
                </span>
              </div>
              
              <p className="text-primary font-medium mb-4">
                Codec Technologies India (AICTE & ICAC Recognized) – Virtual
              </p>
              
              <div className="space-y-3 text-muted-foreground">
                <p className="font-medium text-foreground text-sm">Responsibilities & Work:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Completed a 1-month virtual internship in Artificial Intelligence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Developed a stock price prediction model using historical Tesla stock data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Built a movie recommendation system based on user-selected themes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Worked on data handling, model development, and result analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Strengthened practical understanding of machine learning fundamentals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Experience;