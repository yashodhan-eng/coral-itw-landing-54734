import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LearningOutcomes from "@/components/LearningOutcomes";
import ParentTestimonial from "@/components/ParentTestimonial";
import CTABanner from "@/components/CTABanner";
import EnrollmentModal from "@/components/EnrollmentModal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnrollClick = () => {
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen">
      <Header />
      <Hero onEnrollClick={handleEnrollClick} />
      <LearningOutcomes />
      <ParentTestimonial />
      <CTABanner onEnrollClick={handleEnrollClick} />
      <EnrollmentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </main>
  );
};

export default Index;
