import { Star, Trophy, Target, Lightbulb } from "lucide-react";

const Achievements = () => {
  const achievements = [
    {
      icon: Star,
      title: "Academic Excellence",
      description: "Strong academic performance while actively working on AI/ML projects and practical applications",
    },
    {
      icon: Target,
      title: "Continuous Learning",
      description: "Commitment to growth through industry-recognized certifications from IBM, Google Cloud, and Coursera",
    },
    {
      icon: Lightbulb,
      title: "Real-World Solutions",
      description: "Passion for building technology solutions that address genuine problems in agriculture and governance",
    },
    {
      icon: Trophy,
      title: "Growth Mindset",
      description: "Consistently seeking new learning opportunities and challenges to expand technical expertise",
    },
  ];

  return (
    <section id="achievements" className="section-padding bg-secondary/30">
      <div className="section-container">
        <p className="section-title">Achievements & Activities</p>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-12">
          Recognition & Growth
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <achievement.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {achievement.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
