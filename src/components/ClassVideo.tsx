import { Card } from "@/components/ui/card";

const ClassVideo = () => {
  return (
    <section className="py-12 md:py-16 px-4 bg-background">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
          Watch a Class in Action
        </h2>
        
        <div className="relative">
          {/* Green glow animation */}
          <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl animate-pulse" style={{ animationDuration: '3s' }} />
          
          <Card className="relative overflow-hidden shadow-coral-lg">
            <video
              className="w-full aspect-video"
              controls
              poster="/placeholder.svg"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Card>
        </div>
        
        <p className="text-center text-muted-foreground mt-6 text-sm md:text-base">
          See how our interactive reptile classes engage and inspire young learners
        </p>
      </div>
    </section>
  );
};

export default ClassVideo;
