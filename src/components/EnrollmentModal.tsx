import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { adCampaignService } from "@/lib/api";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback?: (token: string) => void;
        'error-callback'?: () => void;
        size?: 'normal' | 'compact';
        theme?: 'light' | 'dark';
      }) => number;
      reset: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
    };
  }
}

// Email validation regex (browser-compatible)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const enrollmentSchema = z.object({
  parentName: z.string()
    .trim()
    .min(2, { message: "Parent name must be at least 2 characters" })
    .max(100, { message: "Parent name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .min(1, { message: "Email is required" })
    .max(255, { message: "Email must be less than 255 characters" })
    .refine((email) => EMAIL_REGEX.test(email), {
      message: "Please enter a valid email address",
    }),
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

interface EnrollmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EnrollmentModal = ({ open, onOpenChange }: EnrollmentModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaLoaded = useRef(false);
  const recaptchaWidgetId = useRef<number | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const retryCountRef = useRef(0);

  const form = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      parentName: "",
      email: "",
    },
  });

  // Load reCAPTCHA script once (v2 checkbox)
  useEffect(() => {
    if (!recaptchaLoaded.current) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        recaptchaLoaded.current = true;
      };
      document.body.appendChild(script);
    }
  }, []);

  // Render/re-render reCAPTCHA when modal opens
  useEffect(() => {
    if (!open) {
      // Reset when modal closes
      setRecaptchaToken(null);
      form.reset();
      if (recaptchaWidgetId.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(recaptchaWidgetId.current);
        } catch (error) {
          // Ignore reset errors
        }
        // Keep widget id so we can just reset on reopen (avoid re-render errors)
      }
      return;
    }

    // Render when modal opens
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Test key
    
    const renderRecaptcha = () => {
      if (!recaptchaContainerRef.current) {
        console.warn('reCAPTCHA container not found');
        return;
      }

      // Do not clear container to avoid re-render issues

      if (!window.grecaptcha) {
        console.warn('grecaptcha not available yet');
        return;
      }

      window.grecaptcha.ready(() => {
        if (!recaptchaContainerRef.current) {
          console.warn('Container ref is null when trying to render');
          return;
        }

        try {
          // If widget already exists, just reset it and return (don't re-render)
          if (recaptchaWidgetId.current !== null) {
            try {
              window.grecaptcha.reset(recaptchaWidgetId.current);
              console.log('reCAPTCHA widget reset (already rendered)');
              return;
            } catch (e) {
              console.error('Error resetting reCAPTCHA:', e);
              // If reset fails, clear the widget ID and try to render fresh
              recaptchaWidgetId.current = null;
            }
          }

          // Only render if widget doesn't exist yet
          console.log('Rendering reCAPTCHA with siteKey:', siteKey);
          console.log('Container element:', recaptchaContainerRef.current);
          
          const widgetId = window.grecaptcha.render(recaptchaContainerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              console.log('reCAPTCHA completed, token received');
              setRecaptchaToken(token);
            },
            'error-callback': () => {
              console.error('reCAPTCHA error callback');
              setRecaptchaToken(null);
              toast.error('reCAPTCHA verification failed. Please try again.');
            },
            size: 'normal',
            theme: 'light',
          });
          recaptchaWidgetId.current = widgetId;
          console.log('reCAPTCHA rendered successfully with widgetId:', widgetId);
        } catch (error) {
          console.error('Error rendering reCAPTCHA:', error);
          toast.error('Failed to load reCAPTCHA. Please refresh the page.');
        }
      });
    };

    // Wait for grecaptcha to be available with retry limit
    retryCountRef.current = 0;
    const maxRetries = 20; // Max 2 seconds of retries
    
    const checkAndRender = () => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        retryCountRef.current = 0; // Reset on success
        renderRecaptcha();
      } else if (retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        setTimeout(checkAndRender, 100);
      } else {
        console.error('reCAPTCHA failed to load after multiple retries');
        toast.error('reCAPTCHA failed to load. Please refresh the page.');
      }
    };

    // Start checking after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(checkAndRender, 300);
    return () => {
      clearTimeout(timeoutId);
      retryCountRef.current = 0;
    };
  }, [open, form]);

  const onSubmit = async (data: EnrollmentFormData) => {
    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Call API first - don't close modal or show loader yet
      console.log("Calling API with data:", data);
      const response = await adCampaignService.register({
        name: data.parentName,
        email: data.email,
        source: 'ITW_Class_Page',
        recaptchaToken: recaptchaToken,
      });

      console.log("API response:", response);

      // Only close modal and show loader on success
      onOpenChange(false);
      setShowLoader(true);

      // Handle success
      toast.success(response.message || 'Registration successful! Redirecting...');

      // Redirect to class page after a short delay
      setTimeout(() => {
        window.location.href = "https://www.coralacademy.com/class/scalesandslime-d8a4adf3-941f-4944-b278-378544601ecc";
      }, 2000);
    } catch (error: any) {
      console.error("API error:", error);
      setIsSubmitting(false);
      
      // Reset reCAPTCHA on error so user can retry
      // Use setTimeout to ensure reset happens after state updates
      setTimeout(() => {
        if (recaptchaWidgetId.current !== null && window.grecaptcha) {
          try {
            window.grecaptcha.reset(recaptchaWidgetId.current);
            console.log('reCAPTCHA reset successfully');
          } catch (resetError) {
            console.error('Error resetting reCAPTCHA:', resetError);
            // If reset fails, try to re-render by clearing widget ID
            recaptchaWidgetId.current = null;
          }
        } else {
          console.warn('reCAPTCHA widget ID is null or grecaptcha not available');
        }
      }, 100);
      
      // Clear the token state
      setRecaptchaToken(null);
      
      // Handle different error types with appropriate messages
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.errorType === 'duplicate_email') {
        errorMessage = 'Email already registered. Please use a different email address.';
      } else if (error.errorType === 'validation_error') {
        errorMessage = error.message || 'Please check your information and try again.';
      } else if (error.errorType === 'captcha_error') {
        errorMessage = 'reCAPTCHA verification failed. Please complete it again and try.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      // Modal should stay open - don't change its state on error
      // Don't show loader or redirect on error
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[85vw] max-w-[340px] sm:max-w-md border-2 border-primary/20 shadow-coral-lg rounded-2xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-0">
          <div className="p-4 sm:p-8">
            <DialogHeader className="mb-3 sm:mb-6">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
                Enroll For <span className="text-primary">FREE</span>
              </DialogTitle>
              <DialogDescription className="text-center text-xs sm:text-sm">
                Start your child's business journey today. Hurry, seats are filling up fast!
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Parent Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field} 
                        className="rounded-xl h-10 sm:h-11 text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="your.email@example.com" 
                        {...field}
                        className="rounded-xl h-10 sm:h-11 text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* reCAPTCHA Container */}
              <div className="flex justify-center my-2 min-h-[78px]">
                <div 
                  ref={recaptchaContainerRef}
                  id="recaptcha-container"
                  className="flex justify-center"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-5 sm:py-6 text-base sm:text-lg font-semibold bg-primary hover:bg-primary/90 shadow-coral transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || !recaptchaToken}
              >
                {isSubmitting ? "Enrolling..." : "Book your seat now"}
              </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full-screen loader */}
      {showLoader && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Thank you for your interest!
            </h2>
          </div>
          
          {/* Orange loader spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          <p className="text-lg text-muted-foreground animate-pulse">
            Redirecting you to the class page...
          </p>
        </div>
      )}
    </>
  );
};

export default EnrollmentModal;
