import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

const ParentTestimonial = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortText = "As a parent of a nature-loving 8-year-old, I've been searching for engaging science programs that go beyond worksheets. My daughter has always been fascinated by reptiles — she watches nature documentaries, asks endless questions about snakes and lizards, and loves learning about animals. We've tried a few online classes before, but Into the Wild truly stands out.";
  
  const fullText = "As a parent of a nature-loving 8-year-old, I've been searching for engaging science programs that go beyond worksheets. My daughter has always been fascinated by reptiles — she watches nature documentaries, asks endless questions about snakes and lizards, and loves learning about animals. We've tried a few online classes before, but Into the Wild truly stands out.\n\nEach week, they meet a live animal — from Scaly the Corn Snake to Slimy the Tiger Salamander to Lizzie the Leopard Gecko. What I love most is that it's not just watching — kids get to share observations, bring pictures they've taken, and learn what makes reptiles different from amphibians. In a recent class, my daughter came home explaining ectothermic regulation with such excitement!\n\nThe class is engaging, hands-on, and teaches real science in such a fun way. Ms. Amalia shares incredible stories from places like the Komodo Dragon Islands and Madagascar, and the kids love seeing species from around the world. I often find myself listening in because the discussions are genuinely fascinating!";

  return (
    <section className="py-12 md:py-16 px-4 bg-background">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
          Parent Testimonial
        </h2>
        
        <div className="relative">
          {/* Green glow animation */}
          <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl animate-pulse" style={{ animationDuration: '3s' }} />
          
          <Card className="relative p-6 md:p-8 shadow-coral-lg">
            <div className="space-y-4">
              {/* Name and location at top */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">S</span>
                </div>
                <div>
                  <p className="font-bold text-lg text-foreground">Sarah</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <span className="text-primary">📍</span>
                    California
                  </p>
                </div>
              </div>
              
              {/* Testimonial text with gradient fade effect when collapsed */}
              <div className="relative">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {isExpanded ? fullText : shortText}
                </p>
                
                {/* Gradient fade overlay when collapsed */}
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card via-card/80 to-transparent pointer-events-none" />
                )}
              </div>
              
              {/* Show More/Less button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium mx-auto"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                <span>{isExpanded ? "Show less" : "Show more"}</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ParentTestimonial;
