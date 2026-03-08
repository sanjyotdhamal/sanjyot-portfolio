import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import profileImage from "@/assets/profile.png";

const Hero = () => {
  return <section className="min-h-screen flex items-center justify-center relative">
      <div className="section-container py-32">
        <div className="max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <img 
              src={profileImage} 
              alt="Sanjyot Dhamal" 
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-primary/20 shadow-lg animate-fade-up"
            />
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4 animate-fade-up">COMPUTER SCIENCE ENGINEERING STUDENT</p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-up animation-delay-100">
                Sanjyot Dhamal
              </h1>
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 animate-fade-up animation-delay-200">
            AI & Machine Learning Enthusiast
          </p>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl animate-fade-up animation-delay-200">Computer Science Engineering student with strong interest in Artificial Intelligence and Machine Learning. Experienced in building data-driven applications, blockchain-based systems, and practical ML solutions.</p>

          <div className="flex flex-wrap gap-4 animate-fade-up animation-delay-300">
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">
                View Projects
                <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </section>;
};
export default Hero;