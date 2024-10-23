import { useState, useEffect } from 'react';

const useFetchSurah = () => {
  const [surahData, setSurahData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await response.json();
        setSurahData(data.data); // Data is inside 'data' object of the API response
      } catch (error) {
        console.error('Error fetching surah data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahData();
  }, []);

  return { surahData, loading };
};

export default useFetchSurah;
