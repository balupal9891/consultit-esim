import "./App.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "./appContext/UserContext";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import EsimCountryCard from "./utils/EsimCountryCard";
import axios from "axios";

const POPULAR_COUNTRIES = [
  "united states",
  "united kingdom",
  "canada",
  "australia",
  "germany",
  "france",
];

function App() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [popularCountries, setPopularCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, countryList]);

  function sortCountriesByPopularity(countries) {
    return [...countries].sort((a, b) => {
      const aPopular = POPULAR_COUNTRIES.includes(a.countryName.toLowerCase());
      const bPopular = POPULAR_COUNTRIES.includes(b.countryName.toLowerCase());
      return aPopular === bPopular ? 0 : aPopular ? -1 : 1;
    });
  }

  async function fetchCountries() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/country/list`
      );
      const data = res?.data?.data || [];
      const sorted = sortCountriesByPopularity(data);
      setCountryList(sorted);

      // Extract popular countries
      const popular = data.filter((country) =>
        POPULAR_COUNTRIES.includes(country.countryName.toLowerCase())
      );
      setPopularCountries(popular);
    } catch (error) {
      console.error("Error fetching eSIMs:", error);
    }
  }

  function handleSearch() {
    if (!searchTerm.trim()) {
      setCountries(countryList);
      return;
    }
    const filtered = countryList.filter((c) =>
      c.countryName.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
    setCountries(filtered);
  }

  function handleOnBuy(countryName) {
    navigate(`/products/${countryName}`);
  }

  return (
    <div className="w-full font-sans">
      <section className="relative bg-[url('/hometravel.jpg')] bg-cover h-[75vh] flex items-center justify-center">
        <div className="bg-black/60 p-8 rounded-xl text-white max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-4">Travel eSIM</h1>
          <ul className="space-y-1 text-lg font-medium">
            <li>✔️ Instant Activation</li>
            <li>✔️ QR Code on Email</li>
            <li>✔️ No SIM swap</li>
            <li>✔️ Starts working immediately on landing</li>
          </ul>
        </div>
      </section>

      {/* Popular Countries Section */}
      {!searchTerm && popularCountries.length > 0 && (
        <section className="mt-12 px-6 md:px-12 lg:px-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">🔥 Popular Destinations</h2>
            <p className="text-gray-600">Most loved eSIM plans by travelers</p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {popularCountries.map((country, idx) => (
              <EsimCountryCard
                key={`popular-${idx}`}
                country={country}
                dataLabel="1 GB to UNLIMITED DATA"
                reviews={8}
                price={499}
                onBuy={handleOnBuy}
              />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 px-6 md:px-12 lg:px-20">
        <h1 className="text-4xl font-bold text-center mb-8">
          🌍 Explore eSIM Plans
        </h1>

        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search by country"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-[30px]">
          {countries.map((country, idx) => (
            <EsimCountryCard
              key={idx}
              country={country}
              dataLabel="1 GB to UNLIMITED DATA"
              reviews={8}
              price={499}
              onBuy={handleOnBuy}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
