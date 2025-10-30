import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

const ParentTestimonial = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortText = "My daughter absolutely loves this class and the teacher. We signed her up because we wanted her to try a few science classes, though it's not really her thing. So I honestly wasn't expecting her to stick with it. She usually drops out of science classes after 3 or 4 weeks. But I was genuinely happy and surprised when she wanted to keep taking this one.\n\nShe loves the animal the teacher brings that they all call Lizzie and now she's always pointing out reptiles and species on walks or even on our balcony.";
  
  const fullText = "My daughter absolutely loves this class and the teacher. We signed her up because we wanted her to try a few science classes, though it's not really her thing. So I honestly wasn't expecting her to stick with it. She usually drops out of science classes after 3 or 4 weeks. But I was genuinely happy and surprised when she wanted to keep taking this one.\n\nShe loves the animal the teacher brings that they all call Lizzie and now she's always pointing out reptiles and species on walks or even on our balcony. She's started sharing facts at dinner, asking to look for frogs in the backyard and drawing pictures of the animals she learns about.\n\nI love that the class feels so lively, and we couldn't be happier seeing her pick up on the topic so well.";

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
                  <span className="text-xl font-bold text-primary">J</span>
                </div>
                <div>
                  <p className="font-bold text-lg text-foreground">Jennifer</p>
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
