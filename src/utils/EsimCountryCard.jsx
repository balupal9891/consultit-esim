import { useEffect, useRef, useState } from "react";

// Cache for storing API responses
const imageCache = new Map();

// Skeleton loader component
function CardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-xl rounded-3xl overflow-hidden animate-pulse">
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
  );
}

export default function EsimCountryCard({ country, dataLabel, reviews, price, onBuy }) {
  const [image, setImage] = useState("/esim.jpg");
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const ref = useRef(null);
  const ACCESS_KEY = 'DjnsCwxlFPH0uX3IZNf7oz_ekD4sZzPJemOAGDS4zww';

  useEffect(() => {
    // Enhanced entrance animation
    if (ref.current) {
      const tl = {
        fromTo: (element, from, to) => {
          Object.assign(element.style, from);
          setTimeout(() => {
            Object.assign(element.style, to);
          }, to.delay || 0);
        }
      };
      
      tl.fromTo(
        ref.current,
        { 
          opacity: '0', 
          transform: 'translateY(40px) scale(0.95) rotateX(10deg)',
          filter: 'blur(4px)'
        },
        {
          opacity: '1',
          transform: 'translateY(0px) scale(1) rotateX(0deg)',
          filter: 'blur(0px)',
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          delay: Math.random() * 200
        }
      );
    }
  }, []);

  useEffect(() => {
    async function getImageByKeyword(keyword) {
      if (!keyword) return;
      
      const cacheKey = keyword.toLowerCase();
      
      // Check cache first
      if (imageCache.has(cacheKey)) {
        const cachedData = imageCache.get(cacheKey);
        setImage(cachedData.url);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${keyword}&per_page=1&client_id=${ACCESS_KEY}`
        );
        const data = await res.json();
        const imageUrl = data?.results?.[0]?.urls?.regular;
        
        if (imageUrl) {
          // Cache the result
          imageCache.set(cacheKey, {
            url: imageUrl,
            timestamp: Date.now()
          });
          setImage(imageUrl);
        }
      } catch (err) {
        console.log("Error fetching image:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (country?.countryName) {
      getImageByKeyword(country.countryName.toLowerCase());
    }
  }, [country]);

  // Show skeleton while loading
  if (isLoading) {
    return <CardSkeleton />;
  }

  return (
    <div
      ref={ref}
      className="group relative bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:shadow-indigo-200/50 hover:border-indigo-200/30 cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.8) 100%)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1) inset'
      }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
      
      <div className="relative z-10">
        <div className="relative overflow-hidden">
          {/* Image container with loading state */}
          <div className="relative w-full h-48 bg-gradient-to-r from-slate-100 to-slate-200">
            <img 
              src={image} 
              alt={country?.countryName || 'Country'}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
              loading="lazy"
            />
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"></div>
            )}
          </div>
          
          {/* Flag with modern styling */}
          <img
            src={`https://flagcdn.com/w320/${country?.countryCode?.toLowerCase()}.png`}
            className="absolute top-4 left-4 w-10 h-7 rounded-lg shadow-2xl border-2 border-white/80 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
            alt="flag"
            loading="lazy"
          />
          
          {/* Data label with enhanced styling */}
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              {dataLabel}
            </div>
          </div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
        </div>
        
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-1 tracking-wide group-hover:text-indigo-700 transition-colors duration-300">
            {country?.countryName || 'Country'} 
            <span className="text-sm font-normal text-gray-500 ml-1">eSIM</span>
          </h3>
          
          <button
            onClick={() => onBuy(country?.countryName?.toLowerCase())}
            className="relative w-full mt-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-500 hover:bg-[position:100%_0%] hover:scale-105 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span style={{cursor: "pointer"}} className="relative z-10 flex items-center justify-center gap-2">
              <span >Quick Buy</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}