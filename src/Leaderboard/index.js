import React, { useState, useEffect } from 'react';

const Leaderboard = () => {

  // State to manage visibility
  const [isVisible, setIsVisible] = useState(true);

  // Sample data for the leaderboard
    const leaderboardData = {
      Skopje: { lat: 41.9981, lon: 21.4254, nameCyrillic: "Скопје" },
      Bitola: { lat: 41.0297, lon: 21.3292 , nameCyrillic: "Битола" },
      Ohrid: { lat: 41.1231, lon: 20.8016 , nameCyrillic: "Охрид" },
      Veles: { lat: 41.7797, lon: 21.7376 , nameCyrillic: "Велес" },
      Kumanovo: { lat: 42.1322, lon: 21.7144 , nameCyrillic: "Куманово" },
      Prilep: { lat: 41.3441, lon: 21.5528 , nameCyrillic: "Прилеп" },
      Strumica: { lat: 41.4378, lon: 22.6427 , nameCyrillic: "Струмица" },
      Tetovo: { lat: 42.0069, lon: 20.9715 , nameCyrillic: "Тетово" },
      Gostivar: { lat: 41.8026, lon: 20.9089 , nameCyrillic: "Гостивар" },
      Kocani: { lat: 41.9168, lon: 22.4083 , nameCyrillic: "Кочани" },
      Struga: { lat: 41.1778, lon: 20.6783 , nameCyrillic: "Струга" },
      Gevgelija: { lat: 41.1452, lon: 22.4997 , nameCyrillic: "Гевгелија" },
      Debar: { lat: 41.5198, lon: 20.5289 , nameCyrillic: "Дебар" },
      Berovo: { lat: 41.7061, lon: 22.8552 , nameCyrillic: "Берово" },
      Vinica: { lat: 41.8833, lon: 22.5081 , nameCyrillic: "Виница" },
      Valandovo: { lat: 41.3170, lon: 22.5618 , nameCyrillic: "Валандово" },
      Shtip: { lat: 41.7464, lon: 22.1997 , nameCyrillic: "Штип" },
      SvetiNikole: { lat: 41.8656, lon: 21.9373 , nameCyrillic: "Свети Николе" },
      Resen: { lat: 41.0903, lon: 21.0133 , nameCyrillic: "Ресен" },
      Radovish: { lat: 41.6395, lon: 22.4679 , nameCyrillic: "Радовиш" },
      Probishtip: { lat: 41.9948, lon: 22.1877 , nameCyrillic: "Пробиштип" },
      Pehchevo: { lat: 41.7621, lon: 22.8865 , nameCyrillic: "Пехчево" },
      Negotino: { lat: 41.4829, lon: 22.0923 , nameCyrillic: "Неготино" },
      MakedonskaKamenica: { lat: 42.0214, lon: 22.5871 , nameCyrillic: "Македонска Каменица" },
      MakedonskiBrod: { lat: 41.5133, lon: 21.2174 , nameCyrillic: "Македонски Брод" },
      Krushevo: { lat: 41.3706, lon: 21.2502 , nameCyrillic: "Крушево" },
      KrivaPalanka: { lat: 42.2058, lon: 22.3308 , nameCyrillic: "Крива Паланка" },
      Kratovo: { lat: 42.0800, lon: 22.1803 , nameCyrillic: "Кратово" },
      Kichevo: { lat: 41.5129, lon: 20.9525 , nameCyrillic: "Кичево" },
      DemirHisar: { lat: 41.2214, lon: 21.2025 , nameCyrillic: "Демир Хисар" },
      DemirKapija: { lat: 41.4088, lon: 22.2436 , nameCyrillic: "Демир Капија" },
      Delchevo: { lat: 41.9709, lon: 22.7740 , nameCyrillic: "Делчево" },
      Bogdanci: { lat: 41.2031, lon: 22.5754 , nameCyrillic: "Богданци" },
      Kavadarci: { lat: 41.4329, lon: 22.0089 , nameCyrillic: "Кавадарци" },
      Dojran: { lat: 41.1811, lon: 22.7227 , nameCyrillic: "Дојран" }
    };

    const leaderboardArray = Object.keys(leaderboardData).map(cityName => ({
        name: cityName,
        ...leaderboardData[cityName]
      }));

    // Function to toggle leaderboard visibility
    const handleToggle = () => {
      setIsVisible(!isVisible);
    };
    
   // Effect to handle initial visibility based on screen size
   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    // Add event listener
    window.addEventListener('resize', handleResize);

    // Check initial screen size
    handleResize();

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {/* Toggle button */}
      <div className="leaderboard-toggle" onClick={handleToggle}>
        {isVisible ? '☰ Close Leaderboard' : '☰ Open Leaderboard'}
      </div>
      
      {/* Conditionally render the leaderboard */}
      {isVisible && (
        <div className="leaderboard-container">
          <h3>Leaderboard</h3>
          <ul>
            {leaderboardArray.map((city) => (
              <li key={city.name}>
                {city.nameCyrillic}: {city.lat}, {city.lon}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;