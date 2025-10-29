import { Button } from "@/components/ui/button";

interface CTABannerProps {
  onEnrollClick: () => void;
}

const CTABanner = ({ onEnrollClick }: CTABannerProps) => {
  return (
    <section className="py-12 md:py-16 px-6 bg-gradient-to-r from-primary via-primary/90 to-primary">
      <div className="container max-w-4xl mx-auto text-center space-y-6 fade-in-up">
        <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground">
          Start your child's wildlife adventure today — Free Trial Available!
        </h3>
        
        <Button 
          size="lg"
          onClick={onEnrollClick}
          className="bg-background text-primary hover:bg-background/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Enroll For FREE
        </Button>
      </div>
    </section>
  );
};

export default CTABanner;
