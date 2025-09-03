import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PricingSection from '@/components/PricingSection';
import ScrollToTop from '@/components/ScrollToTop';
import TestimonialsSection from '@/components/TestimonialsSection';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout className="landing-page">
        <ScrollToTop />
        <Header />
        <Content>
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
