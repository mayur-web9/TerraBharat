import { useState, useEffect } from 'react';
import { DEFAULT_MARKETPLACES } from '../utils/mockData';

const Marketplaces = () => {
  const [displayMarketplaces, setDisplayMarketplaces] = useState(DEFAULT_MARKETPLACES);

  useEffect(() => {
    const stored = localStorage.getItem('jharYatraMarketplaces');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Merge: keep defaults that aren't in stored, and add stored ones
          const merged = [...DEFAULT_MARKETPLACES];
          parsed.forEach((m: any) => {
            const index = merged.findIndex(dm => dm.id === m.id || dm.name === m.name);
            if (index === -1) {
              merged.push(m);
            } else {
              merged[index] = m;
            }
          });
          setDisplayMarketplaces(merged);
        }
      } catch (e) {
        console.error("Error parsing marketplaces from localStorage:", e);
      }
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-offwhite dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            Famous Indian Marketplaces
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore the vibrant colors, authentic crafts, and rich cultural heritage of India's most iconic bazaars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayMarketplaces.map((market) => (
            <div key={market.id} className="group relative flex flex-col rounded-3xl bg-offwhite dark:bg-gray-900 shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={market.image} 
                  alt={market.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {market.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <h2 className="text-2xl font-bold mb-3 group-hover:text-orange-600 dark:group-hover:text-amber-400 transition-colors">
                  {market.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed flex-1">
                  {market.description}
                </p>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(market.location + " " + market.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 dark:text-amber-500 hover:text-orange-700 dark:hover:text-amber-400 transition-colors group/link"
                  >
                    <svg className="w-5 h-5 transition-transform group-hover/link:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {market.location}
                    <svg className="w-4 h-4 ml-1 opacity-0 group-hover/link:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplaces;
