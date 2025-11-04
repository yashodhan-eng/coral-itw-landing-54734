import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface HeroProps {
  onEnrollClick: () => void;
}

const Hero = ({ onEnrollClick }: HeroProps) => {
  return (
    <section className="relative px-4 py-6 md:py-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral-secondary/20 via-background to-coral-accent-light/10" />
      
      <div className="container max-w-3xl mx-auto relative z-10">
        {/* Trustpilot Rating */}
        <div className="flex justify-center mb-4 fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border shadow-sm">
            <span className="text-sm font-semibold text-foreground">Excellent</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-4 h-4 text-green-600 fill-green-600" />
              ))}
              {/* Partial star (70% filled for 4.7 rating) */}
              <div className="relative w-4 h-4">
                <Star className="w-4 h-4 text-green-600 absolute" />
                <div className="absolute inset-0 overflow-hidden" style={{ width: '70%' }}>
                  <Star className="w-4 h-4 text-green-600 fill-green-600" />
                </div>
              </div>
            </div>
            <span className="text-sm font-semibold text-green-600">4.7/5</span>
            <span className="text-sm font-semibold text-foreground">Trustpilot</span>
          </div>
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-4 fade-in">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm md:text-base font-semibold text-primary text-center">
              Weekly Live Online Classes for Ages 8-13
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-4 fade-in-up leading-tight">
          Into the Wild: Exploring Reptiles and Amphibians
        </h1>

        {/* Description */}
        <p className="text-sm md:text-base text-muted-foreground text-center mb-6 leading-relaxed max-w-2xl mx-auto fade-in-up">
          Live science classes featuring real animals like Scaly the Corn Snake, Slimy the Tiger Salamander, & Lizzie the Leopard Gecko.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mb-4 fade-in-up">
          <Button 
            size="lg" 
            onClick={onEnrollClick}
            className="w-full md:w-auto px-10 py-5 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-coral-lg hover:shadow-coral transition-all duration-300 hover:scale-105 rounded-xl"
          >
            TRY FOR FREE
          </Button>
        </div>

        {/* Schedule Info */}
        <p className="text-center text-sm text-muted-foreground mb-4 fade-in">
          Every <span className="font-semibold text-foreground">Thursday</span> · 5 PM – 5:50 PM (PST) · Online
        </p>
      </div>
    </section>
  );
};

export default Hero;
