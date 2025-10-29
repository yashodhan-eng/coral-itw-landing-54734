import { useState } from "react";
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

const enrollmentSchema = z.object({
  parentName: z.string()
    .trim()
    .min(2, { message: "Parent name must be at least 2 characters" })
    .max(100, { message: "Parent name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

interface EnrollmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EnrollmentModal = ({ open, onOpenChange }: EnrollmentModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const form = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      parentName: "",
      email: "",
    },
  });

  const onSubmit = async (data: EnrollmentFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Close modal and show loader
    onOpenChange(false);
    setShowLoader(true);
    
    // Redirect after showing loader
    setTimeout(() => {
      window.location.href = "https://www.coralacademy.com/class/scalesandslime-d8a4adf3-941f-4944-b278-378544601ecc";
    }, 2500);
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
              
              <Button 
                type="submit" 
                className="w-full py-5 sm:py-6 text-base sm:text-lg font-semibold bg-primary hover:bg-primary/90 shadow-coral transition-all duration-300 rounded-xl"
                disabled={isSubmitting}
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
