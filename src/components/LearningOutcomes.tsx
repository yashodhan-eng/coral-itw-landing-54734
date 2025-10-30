import { useState } from "react";
import { Lightbulb, MessageSquare, TrendingUp, Calendar, ChevronDown } from "lucide-react";

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

const weeks = [
  {
    week: "Week 1",
    title: "The Philippines",
    description: "Flying lizards & rare island species",
  },
  {
    week: "Week 2",
    title: "Tasmania",
    description: "Native amphibians from a unique ecosystem",
  },
  {
    week: "Week 3",
    title: "New Zealand",
    description: "Ancient reptiles like the tuatara & their island adaptations",
  },
];

const LearningOutcomes = () => {
  const [isScheduleExpanded, setIsScheduleExpanded] = useState(false);

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

          {/* Schedule Item - Expandable */}
          <div className="bg-card rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-border overflow-hidden">
            <button
              onClick={() => setIsScheduleExpanded(!isScheduleExpanded)}
              className="w-full p-6 md:p-8 flex items-start gap-4 md:gap-6 text-left hover:bg-accent/5 transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-base md:text-lg font-semibold text-foreground leading-relaxed">
                  Next 3 Weeks' Schedule At A Glance: Island Herpetology
                </h3>
              </div>
              <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 text-muted-foreground transition-transform flex-shrink-0 mt-2 ${isScheduleExpanded ? 'rotate-180' : ''}`} />
            </button>

            {/* Expandable Schedule Content */}
            {isScheduleExpanded && (
              <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 space-y-4 border-t border-border">
                {weeks.map((week, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-foreground">
                        {week.week} - {week.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {week.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;
