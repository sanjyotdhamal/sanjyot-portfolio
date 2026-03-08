import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sanjyotdhamal31@gmail.com",
      href: "mailto:sanjyotdhamal31@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "8856906418",
      href: "tel:+918856906418",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Pune, Maharashtra, India",
      href: null,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/sanjyot-dhamal-2b6205289",
    },
  ];

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="section-container">
        <p className="section-title">Contact</p>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Let's Connect
        </h2>
        
        <p className="text-muted-foreground mb-12 max-w-xl">
          I'm open to internship opportunities, collaborations, and conversations about 
          AI/ML projects. Feel free to reach out.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((contact, index) => (
            <div key={index} className="card-subtle text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <contact.icon className="w-6 h-6 text-primary" />
              </div>
              
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                {contact.label}
              </p>
              
              {contact.href ? (
                <a
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {contact.value}
                </a>
              ) : (
                <p className="text-sm font-medium text-foreground">
                  {contact.value}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
