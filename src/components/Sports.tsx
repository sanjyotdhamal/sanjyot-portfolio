import { Medal, Users, Clock } from "lucide-react";

const Sports = () => {
  return (
    <section id="sports" className="section-padding">
      <div className="section-container">
        <p className="section-title">Sports</p>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-12">
          Athletic Pursuits
        </h2>

        <div className="card-subtle">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Medal className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                All India University National Rowing Championship
              </h3>
              <p className="text-primary font-medium mb-4">Quarter-Finalist</p>
              
              <p className="text-muted-foreground mb-6">
                Representing at the national level in rowing has been a defining experience, 
                teaching me invaluable lessons that extend beyond the sport.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Discipline</p>
                    <p className="text-xs text-muted-foreground">Rigorous training</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Teamwork</p>
                    <p className="text-xs text-muted-foreground">Synchronized effort</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    <Medal className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Consistency</p>
                    <p className="text-xs text-muted-foreground">Daily commitment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sports;
