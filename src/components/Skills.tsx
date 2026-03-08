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

  return (
    <section id="skills" className="section-padding bg-secondary/30">
      <div className="section-container">
        <p className="section-title">Technical Skills</p>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-12">
          Technologies & Expertise
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="card-subtle">
              <h3 className="text-sm font-medium uppercase tracking-wider text-primary mb-4">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-background border border-border rounded-md text-sm text-foreground hover:border-primary/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
