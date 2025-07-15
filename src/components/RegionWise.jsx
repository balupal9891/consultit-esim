import React, { useState, useEffect, useMemo } from 'react';
import { Search, Globe, Wifi, Calendar, MapPin, Star, ShoppingCart } from 'lucide-react';
import axios from 'axios';

// Region colors and icons
const regionConfig = {
  'Asia': { color: 'from-green-400 to-emerald-600', icon: '🌏', bgColor: 'bg-green-50' },
  'Europe': { color: 'from-blue-400 to-indigo-600', icon: '🏰', bgColor: 'bg-blue-50' },
  'North America': { color: 'from-purple-400 to-violet-600', icon: '🗽', bgColor: 'bg-purple-50' },
  'South America': { color: 'from-orange-400 to-red-600', icon: '🏔️', bgColor: 'bg-orange-50' },
  'Africa': { color: 'from-yellow-400 to-orange-600', icon: '🦁', bgColor: 'bg-yellow-50' },
  'Middle East': { color: 'from-teal-400 to-cyan-600', icon: '🕌', bgColor: 'bg-teal-50' },
  'Oceania': { color: 'from-pink-400 to-rose-600', icon: '🏝️', bgColor: 'bg-pink-50' }
};

// Country flag emojis mapping
const countryFlags = {
  'AE': '🇦🇪', 'AF': '🇦🇫', 'AL': '🇦🇱', 'AM': '🇦🇲', 'AR': '🇦🇷', 'AT': '🇦🇹', 'AU': '🇦🇺', 'AZ': '🇦🇿',
  'BA': '🇧🇦', 'BD': '🇧🇩', 'BE': '🇧🇪', 'BG': '🇧🇬', 'BH': '🇧🇭', 'BR': '🇧🇷', 'BY': '🇧🇾',
  'CA': '🇨🇦', 'CH': '🇨🇭', 'CL': '🇨🇱', 'CN': '🇨🇳', 'CO': '🇨🇴', 'CR': '🇨🇷', 'CZ': '🇨🇿',
  'DE': '🇩🇪', 'DK': '🇩🇰', 'EE': '🇪🇪', 'EG': '🇪🇬', 'ES': '🇪🇸', 'FI': '🇫🇮', 'FR': '🇫🇷',
  'GB': '🇬🇧', 'GE': '🇬🇪', 'GR': '🇬🇷', 'GT': '🇬🇹', 'HK': '🇭🇰', 'HR': '🇭🇷', 'HU': '🇭🇺',
  'ID': '🇮🇩', 'IE': '🇮🇪', 'IL': '🇮🇱', 'IN': '🇮🇳', 'IQ': '🇮🇶', 'IR': '🇮🇷', 'IS': '🇮🇸', 'IT': '🇮🇹',
  'JO': '🇯🇴', 'JP': '🇯🇵', 'KE': '🇰🇪', 'KG': '🇰🇬', 'KH': '🇰🇭', 'KR': '🇰🇷', 'KW': '🇰🇼', 'KZ': '🇰🇿',
  'LB': '🇱🇧', 'LK': '🇱🇰', 'LT': '🇱🇹', 'LU': '🇱🇺', 'LV': '🇱🇻', 'MA': '🇲🇦', 'MD': '🇲🇩', 'ME': '🇲🇪',
  'MK': '🇲🇰', 'MM': '🇲🇲', 'MN': '🇲🇳', 'MX': '🇲🇽', 'MY': '🇲🇾', 'NL': '🇳🇱', 'NO': '🇳🇴', 'NP': '🇳🇵',
  'NZ': '🇳🇿', 'OM': '🇴🇲', 'PE': '🇵🇪', 'PH': '🇵🇭', 'PK': '🇵🇰', 'PL': '🇵🇱', 'PT': '🇵🇹',
  'QA': '🇶🇦', 'RO': '🇷🇴', 'RS': '🇷🇸', 'RU': '🇷🇺', 'SA': '🇸🇦', 'SE': '🇸🇪', 'SG': '🇸🇬', 'SI': '🇸🇮',
  'SK': '🇸🇰', 'TH': '🇹🇭', 'TJ': '🇹🇯', 'TM': '🇹🇲', 'TN': '🇹🇳', 'TR': '🇹🇷', 'TW': '🇹🇼', 'TZ': '🇹🇿',
  'UA': '🇺🇦', 'US': '🇺🇸', 'UY': '🇺🇾', 'UZ': '🇺🇿', 'VE': '🇻🇪', 'VN': '🇻🇳', 'YE': '🇾🇪', 'ZA': '🇿🇦'
};

function RegionWiseESIM() {
  const [esimData, setEsimData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/get-all-product`);
        console.log("all products data:", response.data);
        // Extract the data array from the response
        setEsimData(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group data by regions
  const regionData = useMemo(() => {
    const grouped = {};
    
    esimData.forEach(plan => {
      const region = plan.region || 'Other';
      if (!grouped[region]) {
        grouped[region] = [];
      }
      grouped[region].push(plan);
    });
    
    return grouped;
  }, [esimData]);

  // Filter data based on search and selected region
  const filteredData = useMemo(() => {
    let filtered = regionData;
    
    if (selectedRegion !== 'All') {
      filtered = { [selectedRegion]: regionData[selectedRegion] || [] };
    }
    
    if (searchTerm) {
      const searchFiltered = {};
      Object.keys(filtered).forEach(region => {
        const matchingPlans = filtered[region].filter(plan => 
          plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plan.countries.some(country => 
            country.countryName.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        if (matchingPlans.length > 0) {
          searchFiltered[region] = matchingPlans;
        }
      });
      filtered = searchFiltered;
    }
    
    return filtered;
  }, [regionData, selectedRegion, searchTerm]);

  const regions = Object.keys(regionData);
  const totalPlans = esimData.length;
const totalCountries = esimData.reduce((acc, plan) => acc + (plan.countries?.length || 0), 0);


  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg mb-6 w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🌍 eSIM Plans by Region
        </h1>
        <p className="text-gray-600 text-lg">
          Discover data plans organized by geographical regions
        </p>
        
        {/* Stats */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
            <span className="text-sm text-gray-500">Total Plans</span>
            <div className="font-bold text-lg text-blue-600">{totalPlans}</div>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
            <span className="text-sm text-gray-500">Countries</span>
            <div className="font-bold text-lg text-green-600">{totalCountries}</div>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
            <span className="text-sm text-gray-500">Regions</span>
            <div className="font-bold text-lg text-purple-600">{regions.length}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by country or plan name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Region Filter */}
          <div className="lg:w-64">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Region Cards */}
      <div className="space-y-8">
        {Object.keys(filteredData).map(region => (
          <div key={region} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Region Header */}
            <div className={`bg-gradient-to-r ${regionConfig[region]?.color || 'from-gray-400 to-gray-600'} p-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{regionConfig[region]?.icon || '🌐'}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{region}</h2>
                    <p className="text-white/90">
                      {filteredData[region].length} plan{filteredData[region].length !== 1 ? 's' : ''} available
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white/90 text-sm">Total Countries</div>
                  <div className="text-2xl font-bold text-white">
                    {filteredData[region].reduce((acc, plan) => acc + plan.countries.length, 0)}
                  </div>
                </div>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData[region].map(plan => (
                  <div key={plan.localPlanId} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                    {/* Plan Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{plan.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Wifi className="w-4 h-4" />
                          <span>{plan.data}GB Data</span>
                          <Calendar className="w-4 h-4 ml-2" />
                          <span>{plan.validity} days</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{plan.price}</div>
                        <div className="text-xs text-gray-500">{plan.planType}</div>
                      </div>
                    </div>

                    {/* Countries */}
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-700">
                          {plan.countries.length} {plan.countries.length === 1 ? 'Country' : 'Countries'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {plan.countries.slice(0, 4).map(country => (
                          <span
                            key={country.countryLocalId}
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            <span className="mr-1">{countryFlags[country.countryCode] || '🏳️'}</span>
                            {country.countryName}
                          </span>
                        ))}
                        {plan.countries.length > 4 && (
                          <span className="inline-flex items-center px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                            +{plan.countries.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Plan Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {plan.isregional && (
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            <Globe className="w-3 h-3 mr-1" />
                            Regional
                          </span>
                        )}
                        {plan.globalPlan && (
                          <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            <Globe className="w-3 h-3 mr-1" />
                            Global
                          </span>
                        )}
                        {!plan.rechargeOnly && (
                          <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            <Star className="w-3 h-3 mr-1" />
                            New Line
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Buy Button */}
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2">
                      <ShoppingCart className="w-4 h-4" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {Object.keys(filteredData).length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No plans found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}

export default RegionWiseESIM;