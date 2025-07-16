// App.jsx (Enhanced with alphabetical pagination and performance improvements)
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { useUser } from "./appContext/UserContext";
import { FaSearch } from "react-icons/fa";
import EsimCountryCard from "./utils/EsimCountryCard";
import axios from "axios";
import PopularCarousel from "./components/PopularCaraousal";
import heroImage1 from "./assets/images/landingPage/image1.jpg";
import heroImage2 from "./assets/images/landingPage/image2.jpg";
import heroImage3 from "./assets/images/landingPage/image3.jpg";
import heroImage4 from "./assets/images/landingPage/image4.jpg";
import heroImage5 from "./assets/images/landingPage/image5.jpg";
import RegionWiseESIM from "./components/RegionWise";

const countryCache = new Map();

const POPULAR_COUNTRIES = [
  "united states",
  "united kingdom",
  "canada",
  "australia",
  "germany",
  "france",
];

const ITEMS_PER_PAGE = 20; // Show 20 countries per page for better performance

// Hero slideshow images
const HERO_IMAGES = [
  {
    src: heroImage1,
    alt: "Modern city skyline at sunset",
  },
  {
    src: heroImage2,
    alt: "Tropical beach paradise",
  },
  {
    src: heroImage3,
    alt: "Mountain landscape adventure",
  },
  {
    src: heroImage4,
    alt: "European city streets",
  },
  {
    src: heroImage5,
    alt: "Desert dunes at golden hour",
  },
];

// Alphabetical Pagination Component
function AlphabeticalPagination({ selectedLetter, onLetterSelect, availableLetters }) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm rounded-xl p-0 shadow-lg " style={{ background: "transparent" }}>
      <div className="flex flex-col space-y-1 max-h-96 overflow-y-auto" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#d1d5db transparent',
        WebkitScrollbar: {
          width: '4px'
        }
      }}>
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 4px;
          }
          div::-webkit-scrollbar-track {
            background: transparent;
          }
          div::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 2px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
        `}</style>
        <button
          onClick={() => onLetterSelect('ALL')}
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${selectedLetter === 'ALL'
            ? 'bg-blue-500 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          ALL
        </button>
        {alphabet.map((letter) => {
          const isAvailable = availableLetters.has(letter);
          const isSelected = selectedLetter === letter;

          return (
            <button
              key={letter}
              onClick={() => isAvailable && onLetterSelect(letter)}
              disabled={!isAvailable}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isSelected
                ? 'bg-blue-500 text-white shadow-md'
                : isAvailable
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-300 cursor-not-allowed'
                }`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Load More Button Component
function LoadMoreButton({ onClick, isLoading, hasMore }) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Loading...</span>
          </div>
        ) : (
          'Load More Countries'
        )}
      </button>
    </div>
  );
}

// Hero Background Slideshow Component
function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideshowRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (slideshowRef.current) {
      const slides = slideshowRef.current.querySelectorAll(".slide");

      gsap.to(slides, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      });

      gsap.to(slides[currentSlide], {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  }, [currentSlide]);

  return (
    <div ref={slideshowRef} className="absolute inset-0 overflow-hidden">
      {HERO_IMAGES.map((image, index) => (
        <div
          key={index}
          className={`slide absolute inset-0 transition-opacity duration-1000 ${index === 0 ? "opacity-100" : "opacity-0"
            }`}
        >
          <img
            src={HERO_IMAGES[index].src}
            alt={image.alt}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
      ))}

      {/* Slideshow Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
              ? "bg-white shadow-lg scale-125"
              : "bg-white/40 hover:bg-white/60"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Skeleton loader for countries grid
function CountriesGridSkeleton() {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-xl rounded-3xl overflow-hidden animate-pulse"
        >
          <div className="relative">
            <div className="w-full h-48 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"></div>
            <div className="absolute top-3 left-3 w-9 h-6 bg-slate-300 rounded shadow-md"></div>
            <div className="absolute bottom-3 left-3 bg-slate-300 w-20 h-6 rounded-full"></div>
          </div>
          <div className="p-5 text-center space-y-3">
            <div className="h-6 bg-slate-300 rounded-lg mx-auto w-3/4"></div>
            <div className="h-10 bg-slate-300 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

const useIsVisible = (ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting)
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref]);

  return isVisible;
};

function App() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [popularCountries, setPopularCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const heroRef = useRef(null);
  const searchRef = useRef(null);
  const sectionRef = useRef(null);
  const isSectionVisible = useIsVisible(sectionRef);

  // Memoized filtered countries based on search and letter
  const filteredCountries = useMemo(() => {
    let filtered = countryList;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter((c) =>
        c.countryName.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }

    // Apply letter filter
    if (selectedLetter !== 'ALL') {
      filtered = filtered.filter((c) =>
        c.countryName.charAt(0).toUpperCase() === selectedLetter
      );
    }

    return filtered;
  }, [countryList, searchTerm, selectedLetter]);

  // Memoized available letters
  const availableLetters = useMemo(() => {
    const letters = new Set();
    countryList.forEach(country => {
      letters.add(country.countryName.charAt(0).toUpperCase());
    });
    return letters;
  }, [countryList]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
  const hasMore = currentPage < totalPages;

  useEffect(() => {
    // Animate hero section on mount
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".animate-on-load"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }
  }, []);

  useEffect(() => {
    fetchCountries();
  }, []);

  // Update displayed countries when filters change
  useEffect(() => {
    setCurrentPage(1);
    updateDisplayedCountries(1);
  }, [filteredCountries]);

  // Debounced search effect
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const updateDisplayedCountries = useCallback((page) => {
    const startIndex = 0;
    const endIndex = page * ITEMS_PER_PAGE;
    setDisplayedCountries(filteredCountries.slice(startIndex, endIndex));
  }, [filteredCountries]);

  function sortCountriesByPopularity(countries) {
    return [...countries].sort((a, b) => {
      // First sort by popularity
      const aPopular = POPULAR_COUNTRIES.includes(a.countryName.toLowerCase());
      const bPopular = POPULAR_COUNTRIES.includes(b.countryName.toLowerCase());

      if (aPopular && !bPopular) return -1;
      if (!aPopular && bPopular) return 1;

      // Then sort alphabetically
      return a.countryName.localeCompare(b.countryName);
    });
  }

  async function fetchCountries() {
    try {
      // Check cache first
      const cacheKey = "all_countries";
      if (countryCache.has(cacheKey)) {
        const cachedData = countryCache.get(cacheKey);
        // Check if cache is still valid (24 hours)
        if (Date.now() - cachedData.timestamp < 24 * 60 * 60 * 1000) {
          setCountryList(cachedData.sorted);
          setPopularCountries(cachedData.popular);
          setIsLoading(false);
          return;
        }
      }

      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/country/list`
      );
      const data = res?.data?.data || [];
      const sorted = sortCountriesByPopularity(data);

      const popular = data.filter((country) =>
        POPULAR_COUNTRIES.includes(country.countryName.toLowerCase())
      );

      // Cache the results
      countryCache.set(cacheKey, {
        sorted,
        popular,
        timestamp: Date.now(),
      });

      setCountryList(sorted);
      setPopularCountries(popular);
    } catch (error) {
      console.error("Error fetching eSIMs:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      updateDisplayedCountries(nextPage);
      setIsLoadingMore(false);
    }, 500);
  }, [currentPage, updateDisplayedCountries]);

  const handleLetterSelect = useCallback((letter) => {
    setSelectedLetter(letter);
    setSearchTerm(''); // Clear search when selecting a letter
  }, []);

  function handleOnBuy(countryName) {
    navigate(`/products/${countryName}`);
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 font-sans overflow-hidden">
      {/* Hero Section with Slideshow Background */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Slideshow */}
        <HeroSlideshow />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-400/5 to-cyan-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-1/4 w-2 h-2 bg-white/80 rounded-full animate-bounce delay-100 z-20"></div>
        <div className="absolute top-20 right-1/4 w-3 h-3 bg-white/80 rounded-full animate-bounce delay-300 z-20"></div>
        <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-white/80 rounded-full animate-bounce delay-500 z-20"></div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto text-center px-6">
          <div className="animate-on-load">
            <h1 className="text-7xl md:text-8xl font-black mb-6 text-white leading-tight drop-shadow-2xl">
              Travel eSIM
            </h1>
          </div>

          <div className="animate-on-load">
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Instant activation. Seamless travel connectivity.
              <span className="font-semibold text-white">
                {" "}
                One scan, and you're online.
              </span>
            </p>
          </div>

          <div className="animate-on-load flex justify-center gap-4 mb-12 flex-wrap">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30 shadow-lg">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                200+ Countries
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30 shadow-lg">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                Instant Setup
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30 shadow-lg">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                24/7 Support
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-on-load">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105 transform">
              Explore eSIM Plans
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </section>

      {/* Popular Destinations Carousel */}
      {!searchTerm && popularCountries.length > 0 && (
        <section className="relative py-16 px-6 md:px-12 lg:px-20 bg-white">
          <div className="border-2 border-orange-500 rounded-xl p-8 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                🔥 Popular Destinations
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Most loved eSIM plans by travelers worldwide
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-orange-50 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-orange-50 to-transparent z-10 pointer-events-none"></div>

              <PopularCarousel
                countries={popularCountries}
                onBuy={handleOnBuy}
              />
            </div>
          </div>
        </section>
      )}

      {/* Search and Full List Section */}
      <section  ref={sectionRef} className="py-16 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
        <div className="relative py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden border-2 border-white/20 rounded-3xl shadow-lg">
          {/* World Map Background */}
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              <path
                d="M158,206 L180,186 L220,190 L250,170 L280,180 L320,160 L350,170 L380,150 L420,160 L450,140 L480,150 L520,130 L550,140 L580,120 L620,130 L650,110 L680,120 L720,100 L750,110 L780,90 L820,100 L850,80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white animate-pulse"
              />
              <circle cx="200" cy="200" r="3" fill="currentColor" className="text-blue-300 animate-pulse" />
              <circle cx="400" cy="180" r="3" fill="currentColor" className="text-purple-300 animate-pulse" style={{ animationDelay: "1s" }} />
              <circle cx="600" cy="160" r="3" fill="currentColor" className="text-indigo-300 animate-pulse" style={{ animationDelay: "2s" }} />
              <circle cx="800" cy="140" r="3" fill="currentColor" className="text-cyan-300 animate-pulse" style={{ animationDelay: "0.5s" }} />
            </svg>
          </div>

          {/* Glowing Orbs */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 right-32 w-6 h-6 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: "2s" }}></div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                🌍 Explore All eSIM Plans
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Find the perfect data plan for your destination
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div ref={searchRef} className="flex justify-center mb-16">
              <div className="relative w-full max-w-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-sm opacity-50"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-2">
                  <div className="flex items-center">
                    <div className="pl-6 pr-4">
                      <FaSearch className="w-6 h-6 text-gray-300" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by country name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 py-4 pr-6 bg-transparent placeholder-gray-400 text-white text-lg focus:outline-none"
                    />
                    {isSearching && (
                      <div className="pr-6">
                        <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alphabetical Pagination */}
        {isSectionVisible && (
          <AlphabeticalPagination
            selectedLetter={selectedLetter}
            onLetterSelect={handleLetterSelect}
            availableLetters={availableLetters}
          />
        )}
        {/* <RegionWiseESIM jsx={true}/> */}
        {/* <RegionWiseESIM /> */}
        {/* Filter Info */}
        <div  className="mt-8 mb-4 text-center">
          <p className="text-gray-600">
            {selectedLetter === 'ALL' ? 'All countries' : `Countries starting with "${selectedLetter}"`}
            {searchTerm && ` matching "${searchTerm}"`}
            {' '}({filteredCountries.length} {filteredCountries.length === 1 ? 'country' : 'countries'})
          </p>
        </div>

        {/* Countries Grid */}
        <div className="relative">
          {isLoading ? (
            <CountriesGridSkeleton />
          ) : (
            <>
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
                {displayedCountries.map((country, idx) => (
                  <EsimCountryCard
                    key={`${country.countryCode}-${idx}`}
                    country={country}
                    dataLabel="1 GB to UNLIMITED DATA"
                    reviews={8}
                    price={499}
                    onBuy={handleOnBuy}
                  />
                ))}
              </div>

              {/* Load More Button */}
              <LoadMoreButton
                onClick={handleLoadMore}
                isLoading={isLoadingMore}
                hasMore={hasMore}
              />
            </>
          )}

          {/* No Results State */}
          {!isLoading && filteredCountries.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No countries found
              </h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search term' : 'Try selecting a different letter'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-24 px-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to stay connected worldwide?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of travelers who trust our eSIM solutions
          </p>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-2xl">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;