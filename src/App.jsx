import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import SalesWordsSlide from './slides/SalesWordsSlide';
import OpeningSlide from './slides/OpeningSlide';

import SuccessStorySlide from './slides/SuccessStorySlide';

import WhyNowSlide from './slides/WhyNowSlide';

import VisionSlide from './slides/VisionSlide';
import ProductsSlide from './slides/ProductsSlide';
import StoreSlide from './slides/StoreSlide';
import WebsiteSlide from './slides/WebsiteSlide';

import OldVsNewInteractive from './slides/OldVsNewInteractive';

import FinalLogoSlide from './slides/FinalLogoSlide';
import TruckRevealSlide from './slides/TruckRevealSlide';
import TruckHumorSlide from './slides/TruckHumorSlide';
import SummarySlide from './slides/SummarySlide';
import PlayerView from './components/PlayerView';
import RamadanGreeting from './pages/RamadanGreeting';
import ServiceApp from './slides/service/ServiceApp';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Direct detection for initial render to avoid white flash/blank page
  const isPlayer = typeof window !== 'undefined' && window.location.pathname.includes('/play');
  const isRamadan = typeof window !== 'undefined' && window.location.pathname.includes('/ramadan');
  const isService = typeof window !== 'undefined' && window.location.pathname.includes('/service');

  const slides = [
    OpeningSlide,
    VisionSlide,
    SuccessStorySlide,
    ProductsSlide,
    StoreSlide,
    WebsiteSlide,
    WhyNowSlide,
    SalesWordsSlide,
    OldVsNewInteractive,
    TruckHumorSlide,
    TruckRevealSlide,
    SummarySlide,
    FinalLogoSlide
  ];

  if (isPlayer) {
    return <PlayerView />;
  }

  if (isRamadan) {
    return <RamadanGreeting />;
  }

  if (isService) {
    return <ServiceApp />;
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  // Helper for menu navigation
  const handleJump = (index) => {
    setCurrentSlide(index);
  };

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <Layout
      currentSlide={currentSlide}
      totalSlides={slides.length}
      onNext={nextSlide}
      onPrev={prevSlide}
    >
      <CurrentSlideComponent onNavigate={handleJump} />
    </Layout>
  );
}

export default App;
