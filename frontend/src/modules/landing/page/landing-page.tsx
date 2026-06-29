import styles from "./landing-page.module.scss";

// import { Navbar } from "../navbar/navbar";
import { HeroSection } from "../hero-section/hero-section";
// import { FeaturesSection } from "../features-section/features-section";
// import { DashboardPreview } from "../dashboard-preview/dashboard-preview";
// import { TestimonialsSection } from "../testimonials-section/testimonials-section";
// import { PricingSection } from "../pricing-section/pricing-section";
// import { CtaSection } from "../cta-section/cta-section";
// import { Footer } from "../footer/footer";

export function LandingPage() {
  return (
    <main className={styles.container}>
      {/* <Navbar /> */}

      <HeroSection />

      {/* <FeaturesSection />

      <DashboardPreview />

      <TestimonialsSection />

      <PricingSection />

      <CtaSection />

      <Footer /> */}
    </main>
  );
}