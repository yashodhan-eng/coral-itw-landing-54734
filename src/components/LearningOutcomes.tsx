import { Lightbulb, MessageSquare, TrendingUp } from "lucide-react";

const outcomes = [
  {
    icon: Lightbulb,
    description: "Explore the key traits of reptiles and amphibians with help of live animals like toads, snakes, and salamanders",
  },
  {
    icon: MessageSquare,
    description: "Learn from a teacher who's explored wildlife across nearly every continent: bringing real stories, field research, & stunning nature photography into each class",
  },
  {
    icon: TrendingUp,
    description: "Spot reptiles and amphibians in your own environment through fun at-home challenges and creative activities",
  },
];

const LearningOutcomes = () => {
  return (
    <section className="py-12 md:py-16 px-6 bg-background">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What Kids Learn
          </h2>
        </div>
        
        <div className="space-y-4 fade-in">
          {outcomes.map((outcome, index) => {
            const Icon = outcome.icon;
            return (
              <div 
                key={index}
                className="bg-card p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-border"
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed flex-1 pt-2">
                    {outcome.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;
