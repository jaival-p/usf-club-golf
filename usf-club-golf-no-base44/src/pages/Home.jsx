import React, { useState } from 'react';
import SponsorNavigation from '../components/golf/SponsorNavigation';
import SponsorHeroSection from '../components/golf/SponsorHeroSection';
import TournamentOverviewSection from '../components/golf/TournamentOverviewSection';
import TheCauseSection from '../components/golf/TheCauseSection';
import SponsorshipPackagesSection from '../components/golf/SponsorshipPackagesSection';
import SponsorInquiryForm from '../components/golf/SponsorInquiryForm';
import ConfirmationSection from '../components/golf/ConfirmationSection';
import SponsorFooter from '../components/golf/SponsorFooter';

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelectPackage = (tier) => {
    setSelectedPackage(tier);
    setTimeout(() => {
      document.getElementById('sponsor-inquiry')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSuccess = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedPackage(null);
  };

  return (
    <div className="min-h-screen bg-fairway">
      <SponsorNavigation />
      <SponsorHeroSection />
      <PartnerSection />
      <TournamentOverviewSection />
      <TheCauseSection />
      <SponsorshipPackagesSection onSelectPackage={handleSelectPackage} />
      {submitted ? (
        <ConfirmationSection onReset={handleReset} />
      ) : (
        <SponsorInquiryForm selectedPackage={selectedPackage} onSuccess={handleSuccess} />
      )}
      <SponsorFooter />
    </div>
  );
}
