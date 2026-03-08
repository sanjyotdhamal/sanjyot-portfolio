const About = () => {
  return <section id="about" className="section-padding bg-secondary/30">
      <div className="section-container">
        <p className="section-title">About Me</p>
        
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
            Passionate about building intelligent solutions
          </h2>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>Currently pursuing B.Tech in Computer Science Engineering at MIT ADT University, Pune .With a deep interest in Artificial Intelligence, Machine Learning, and Data Analysis.</p>
            
            <p>
              I believe in hands-on learning and have gained practical experience through internships, 
              projects, hackathons, and industry-recognized certifications. My approach combines 
              theoretical understanding with real-world application.
            </p>
            
            <p>
              Participated in <span className="text-foreground font-medium">Smart India Hackathon 2025</span> (Internal Round), 
              where our team ranked <span className="text-foreground font-medium">44th out of 200 software teams</span> and 
              <span className="text-foreground font-medium"> 11th in the Agriculture & Rural Development domain</span>.
            </p>
            
            <p>Beyond academics, I am an active sportsperson and have represented MIT ADT University at the All India University level in rowing. This experience has taught me discipline, consistency, and teamwork, which I apply in my studies and projects.</p>
          </div>
        </div>
      </div>
    </section>;
};
export default About;