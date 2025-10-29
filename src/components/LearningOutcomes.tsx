import { Lightbulb, MessageSquare, TrendingUp, Globe } from "lucide-react";

const outcomes = [
  {
    icon: Lightbulb,
    title: "Meet Live Animals",
    description: "Snakes, salamanders & geckos",
  },
  {
    icon: MessageSquare,
    title: "Share & Discover",
    description: "Stories and observations",
  },
  {
    icon: TrendingUp,
    title: "Science Basics",
    description: "Reptiles vs. amphibians",
  },
  {
    icon: Globe,
    title: "World Explorers",
    description: "Species from around globe",
  },
];

const LearningOutcomes = () => {
  return (
    <section className="py-12 md:py-16 px-6 bg-gradient-to-b from-background to-coral-secondary/10">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-8 fade-in-up">
          <h2 className="text-2xl md:text-3xl font-bold">
            What Young Explorers Learn
          </h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4 md:gap-6 fade-in">
          {outcomes.map((outcome, index) => {
            const Icon = outcome.icon;
            return (
              <div 
                key={index}
                className="bg-card p-4 md:p-6 rounded-xl shadow-md hover:shadow-coral transition-all duration-300 hover:scale-105 border border-border"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-1">{outcome.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{outcome.description}</p>
                  </div>
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
