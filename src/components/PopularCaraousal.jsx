// components/PopularCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import EsimCountryCard from '../utils/EsimCountryCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function PopularCarousel({ countries, onBuy }) {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle swiper events
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  // Navigation handlers
  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  // Auto-play control
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isAutoplayPaused) {
        swiperRef.current.autoplay.start();
      } else {
        swiperRef.current.autoplay.stop();
      }
      setIsAutoplayPaused(!isAutoplayPaused);
    }
  };

  return (
    <div className="relative group">
      {/* Enhanced Section Header */}
      <div className="flex items-center justify-between mb-8 px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Trending Now</h3>
            <p className="text-gray-600">Most popular among travelers</p>
          </div>
        </div>
        
        {/* Autoplay Toggle */}
        <button
          onClick={toggleAutoplay}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
        >
          <div className={`w-2 h-2 rounded-full ${isAutoplayPaused ? 'bg-gray-400' : 'bg-green-500 animate-pulse'}`} />
          <span className="text-sm text-gray-600">
            {isAutoplayPaused ? 'Resume' : 'Auto-play'}
          </span>
        </button>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Custom Navigation Buttons */}
        <button
          onClick={goPrev}
          disabled={isBeginning}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-2 transition-all duration-300 ${
            isBeginning 
              ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-white border-white text-gray-700 hover:bg-gray-50 hover:scale-110 shadow-xl'
          } flex items-center justify-center backdrop-blur-sm`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goNext}
          disabled={isEnd}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-2 transition-all duration-300 ${
            isEnd 
              ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-white border-white text-gray-700 hover:bg-gray-50 hover:scale-110 shadow-xl'
          } flex items-center justify-center backdrop-blur-sm`}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Enhanced Swiper */}
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={24}
          centeredSlides={false}
          loop={countries.length > 4}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={800}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          // Enhanced responsive breakpoints
          breakpoints={{
            320: { 
              slidesPerView: 1.2,
              spaceBetween: 16,
            },
            480: { 
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            640: { 
              slidesPerView: 2.2,
              spaceBetween: 24,
            },
            768: { 
              slidesPerView: 2.5,
              spaceBetween: 24,
            },
            1024: { 
              slidesPerView: 3.2,
              spaceBetween: 28,
            },
            1280: { 
              slidesPerView: 4.2,
              spaceBetween: 32,
            },
          }}
          // Pagination
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} !bg-gradient-to-r !from-orange-500 !to-red-500 !opacity-100"></span>`;
            },
          }}
          className="!pb-12"
        >
          {countries.map((country, idx) => (
            <SwiperSlide key={`${country.countryCode}-${idx}`}>
              <div className="relative">
                {/* Popular Badge for first few items */}
                {idx < 3 && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      #{idx + 1} Popular
                    </div>
                  </div>
                )}

                {/* Enhanced Country Card with hover effects */}
                <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <EsimCountryCard
                    country={country}
                    dataLabel="1 GB to UNLIMITED DATA"
                    reviews={8}
                    price={499}
                    onBuy={onBuy}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

   
      </div>

      {/* Background Decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}