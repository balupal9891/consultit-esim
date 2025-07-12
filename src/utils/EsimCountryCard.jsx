import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function EsimCountryCard({
  country,
  dataLabel,
  reviews,
  price,
  onBuy,
}) {
  const [image, setImage] = useState('esim.jpg');
  const ref = useRef(null);

  const ACCESS_KEY = 'DjnsCwxlFPH0uX3IZNf7oz_ekD4sZzPJemOAGDS4zww';

  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 40 }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: Math.random() * 0.2,
      ease: "power2.out"
    });
  }, []);

  async function getImageByKeyword(keyword) {
    try {
      const res = await fetch(`https://api.unsplash.com/search/photos?query=${keyword}&per_page=1&client_id=${ACCESS_KEY}`);
      const data = await res.json();
      const imageUrl = data?.results?.[0]?.urls?.regular;
      if (imageUrl) setImage(imageUrl);
    } catch (err) {
      console.log("Error fetching image:", err);
    }
  }

  useEffect(() => {
    getImageByKeyword(country?.countryName?.toLowerCase());
  }, []);

  return (
    <div
      ref={ref}
      className="bg-white shadow-xl rounded-2xl overflow-hidden transition hover:shadow-2xl duration-300 transform hover:-translate-y-1"
    >
      <div className="relative">
        <img src={image} alt={country.countryName} className="w-full h-48 object-cover" />
        <img
          src={`https://flagcdn.com/w320/${country?.countryCode?.toLowerCase()}.png`}
          className="absolute top-2 left-2 w-10 h-6 rounded shadow"
          alt="flag"
        />
        <div className="absolute bottom-2 left-2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
          {dataLabel}
        </div>
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-gray-800">{country.countryName} eSIM</h3>
        {/* <p className="text-sm text-gray-600 mt-1 mb-3">From ₹{price}</p> */}
        <button
          onClick={() => onBuy(country?.countryName?.toLowerCase())}
          className="bg-black text-white w-full py-2 rounded-full hover:bg-gray-800 transition duration-200"
          style={{cursor: 'pointer'}}
        >
          Quick Buy
        </button>
      </div>
    </div>
  );
}
