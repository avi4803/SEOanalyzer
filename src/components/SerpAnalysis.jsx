import React, { useState, useEffect } from 'react';

const SerpAnalysis = ({ activeNav }) => {
  const [locationInput, setLocationInput] = useState('');
  const [website, setWebsite] = useState('');
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [websitePosition, setWebsitePosition] = useState(null); // Track website position

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.map((country) => ({
          code: country.cca2.toLowerCase(),
          name: country.name.common,
        }));
        setLocations(countryList);
      })
      .catch((error) => console.error('Error fetching locations:', error));
  }, []);

  useEffect(() => {
    if (locationInput) {
      const filtered = locations.filter((loc) =>
        loc.name.toLowerCase().includes(locationInput.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  }, [locationInput, locations]);

  const normalizeWebsiteUrl = (url) => {
    // Remove whitespace and convert to lowercase
    url = url.trim().toLowerCase();

    // Add protocol if not present
    if (!/^https?:\/\//.test(url)) {
      url = 'https://' + url;
    }

    return url;
  };

  const handleSearch = () => {
    if (!query || !selectedCountryCode) {
      setError('Please select a location and enter a search query.');
      return;
    }

    // Normalize the website URL before using it
    const normalizedWebsite = normalizeWebsiteUrl(website);
    console.log('Searching SERP for:', query, 'in', selectedCountryCode);

    const apiKey = 'be88bce1f01b111804b361e68da015ec83ae2cf822a80f4635f7c70cd5806e41'; // Replace with your actual API key
    const url = `https://cors-anywhere.herokuapp.com/https://serpapi.com/search.json?api_key=${apiKey}&q=${encodeURIComponent(query)}&gl=${selectedCountryCode}&hl=en`;

    setLoading(true);
    setWebsitePosition(null); // Reset position before fetching results

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setResults(data);
        setError('');

        // Normalize the website URL for comparison
        const normalizedResultWebsite = new URL(normalizedWebsite).hostname.replace(/^www\./, '');

        // Find the position of the entered website in the SERP results
        const position = data.organic_results.findIndex((result) => {
          const resultLink = new URL(result.link).hostname.replace(/^www\./, '');
          return resultLink === normalizedResultWebsite;
        });

        if (position !== -1) {
          setWebsitePosition(position + 1); // Store the position in state
        } else {
          setWebsitePosition(null); // Not found
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to fetch results. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    activeNav === 'serp-analysis' && (
      <div className="p-4">
        <h2 className="text-2xl font-semibold">SERP Analysis</h2>
        <p className="mt-2 text-gray-600">Enter the location and website to test SERP.</p>

        <div className="mt-6">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Type Location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
              />
              {filteredLocations.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 mt-1 rounded-md w-full">
                  {filteredLocations.map((loc) => (
                    <li
                      key={loc.code}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setLocationInput(loc.name);
                        setSelectedCountryCode(loc.code);
                        setFilteredLocations([]);
                      }}
                    >
                      {loc.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <input
              type="text"
              placeholder="Enter Website URL"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="text"
              placeholder="Enter Search Query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
              onClick={handleSearch}
              className={`mt-4 md:mt-0 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <span className="loader"></span>
              ) : (
                'Test SERP'
              )}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold">Results</h3>
          {error && <p className="text-red-600">{error}</p>}
          {websitePosition !== null && (
            <p className="text-green-600 font-semibold">
              Your website is in position: {websitePosition}
            </p>
          )}
          <div className="mt-4 p-4 border border-gray-300 rounded-md">
            {results ? (
              <div>
                {results.organic_results && results.organic_results.length > 0 ? (
                  <ul>
                    {results.organic_results.map((result, index) => (
                      <li
                        key={index}
                        className={`mt-2 p-2 rounded ${
                          websitePosition === index + 1 ? 'border-2 border-blue-500 bg-blue-100' : ''
                        }`}
                      >
                        <span className="font-semibold">Position: {index + 1}</span>
                        <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">
                          {result.title}
                        </a>
                        <p className="text-gray-500">{result.snippet}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No results found for this query.</p>
                )}
              </div>
            ) : (
              <p>No results yet. Perform a search to see the SERP results here.</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default SerpAnalysis;
