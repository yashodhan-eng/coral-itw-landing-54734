import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import videoThumbnail from "@/assets/reptile-class-hero.png";

interface HeroProps {
  onEnrollClick: () => void;
}

const Hero = ({ onEnrollClick }: HeroProps) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setIsVideoModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setIsVideoModalOpen(open);
    if (!open && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (isVideoModalOpen && videoRef.current) {
      // Handle promise from play() for better iOS compatibility
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Video autoplay failed:", error);
        });
      }
    }
  }, [isVideoModalOpen]);

  return (
    <section className="relative flex items-center justify-center px-4 py-8 md:py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral-secondary/20 via-background to-coral-accent-light/10" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        {/* Live online classes badge */}
        <div className="flex justify-center mb-6 md:mb-8 fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm md:text-base font-semibold text-primary">Live online classes</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Left content */}
          <div className="text-center md:text-left space-y-4 md:space-y-6 fade-in-up">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Into the Wild: Exploring Reptiles and Amphibians
            </h1>
            
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
              Learn all about herpetology in live, weekly science classes for kids (ages 8–13), featuring real animals like Scaly the Corn Snake, Slimy the Tiger Salamander, & Lizzie the Leopard Gecko.
            </p>
            
            <div className="space-y-3 md:space-y-4">
              <Button 
                size="lg" 
                onClick={onEnrollClick}
                className="w-full md:w-auto px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-coral-lg hover:shadow-coral transition-all duration-300 hover:scale-105"
              >
                Enroll For FREE
              </Button>
              
              <p className="text-sm md:text-base text-muted-foreground">
                Class meets every <span className="font-semibold text-foreground">Thursday</span> · 5 PM – 5:50 PM (PST)
              </p>
            </div>
          </div>
          
          {/* Right video thumbnail */}
          <div className="relative fade-in order-first md:order-last max-w-md mx-auto md:max-w-none">
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-coral-lg cursor-pointer group" onClick={handlePlayClick}>
              <img 
                src={videoThumbnail}
                alt="Video preview: Meet live reptiles and amphibians in our herpetology class"
                className="w-full h-auto object-cover"
                loading="eager"
                decoding="async"
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/40 rounded-full animate-ping" style={{ animationDuration: '2.5s' }} />
                  <div className="relative bg-primary hover:bg-primary/90 rounded-full p-4 md:p-6 transition-all duration-300 group-hover:scale-110 shadow-coral-lg">
                    <Play className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground fill-current" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating accent elements */}
            <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-16 h-16 md:w-24 md:h-24 bg-coral-secondary rounded-full blur-2xl opacity-60 animate-pulse" />
            <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-20 h-20 md:w-32 md:h-32 bg-coral-accent-light rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="w-[95vw] sm:w-[90vw] max-w-4xl max-h-[90vh] p-0 bg-black border-none rounded-lg sm:rounded-2xl overflow-hidden">
          <div className="relative w-full aspect-video">
            <video 
              ref={videoRef}
              src="/hero-video.mp4"
              className="w-full h-full object-contain"
              controls
              autoPlay
              playsInline
              webkit-playsinline="true"
              preload="metadata"
              controlsList="nodownload"
              aria-label="Into the Wild: Reptiles and Amphibians class video"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;
