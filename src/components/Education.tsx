import { GraduationCap } from "lucide-react";

const Education = () => {
  const educationData = [
    {
      institution: "MIT ADT University, Pune",
      degree: "Bachelor of Technology in Computer Engineering",
      period: "Aug 2023 – Present",
      coursework: [
        "Machine Learning",
        "Artificial Intelligence",
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Data Analytics Fundamentals",
      ],
    },
    {
      institution: "Sinhgad College of Arts, Commerce and Science, Pune",
      degree: "Higher Secondary Certificate (HSC)",
      period: "July 2021 – May 2023",
      coursework: [],
    },
  ];

  return (
    <section id="education" className="section-padding">
      <div className="section-container">
        <p className="section-title">Education</p>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-12">
          Academic Background
        </h2>

        <div className="space-y-8">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="card-subtle flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {edu.institution}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {edu.period}
                  </span>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {edu.degree}
                </p>
                
                {edu.coursework.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">
                      Relevant Coursework:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 bg-secondary rounded-full text-muted-foreground"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
