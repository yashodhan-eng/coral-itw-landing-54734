import { Star } from "lucide-react";
import { useEffect, useRef } from "react";

const testimonials = [
  {
    id: 1,
    quote: "My son can't wait for Thursday classes every week!",
    author: "David K.",
    location: "Nevada",
    rating: 4.5,
  },
  {
    id: 2,
    quote: "Great teacher, my daughter loves learning about reptiles!",
    author: "Sarah M.",
    location: "California",
    rating: 5,
  },
  {
    id: 3,
    quote: "The live animals make it so engaging. Worth every penny!",
    author: "Michael R.",
    location: "Texas",
    rating: 5,
  },
  {
    id: 4,
    quote: "My kids learned so much about different reptile species. The teacher is incredibly knowledgeable!",
    author: "Emily T.",
    location: "Florida",
    rating: 5,
  },
  {
    id: 5,
    quote: "Perfect class for curious kids. My daughter now wants to be a herpetologist!",
    author: "Jason L.",
    location: "Arizona",
    rating: 5,
  },
  {
    id: 6,
    quote: "Interactive, fun, and educational. Lizzie the lizard is a star!",
    author: "Rachel P.",
    location: "Oregon",
    rating: 4.5,
  },
  {
    id: 7,
    quote: "The best online science class we've tried. My son is finally excited about learning!",
    author: "Mark D.",
    location: "New York",
    rating: 5,
  },
  {
    id: 8,
    quote: "Amazing how engaged my shy daughter became. She asks questions every class now!",
    author: "Lisa W.",
    location: "Washington",
    rating: 5,
  },
];

const TestimonialCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;
    let currentIndex = 0;
    const cardWidth = 292; // 280px width + 12px gap

    const autoScroll = () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      scrollContainer.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    };

    scrollInterval = setInterval(autoScroll, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="py-2 px-4 overflow-hidden">
      <div className="container max-w-6xl mx-auto">
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-[280px] md:w-[340px] snap-center"
            >
              <div className="bg-card border border-border rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                {/* Stars */}
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(testimonial.rating)
                          ? "text-primary fill-primary"
                          : i < testimonial.rating
                          ? "text-primary fill-primary opacity-50"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground text-xs mb-2 leading-relaxed text-center">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="text-xs text-muted-foreground text-center">
                  <p className="font-medium text-foreground">— {testimonial.author}</p>
                  <p className="text-[10px]">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
