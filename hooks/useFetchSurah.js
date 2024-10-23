import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetchSurah = () => {
  const [surahData, setSurahData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        // Try to fetch from API
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await response.json();

        // Store the data in AsyncStorage
        await AsyncStorage.setItem('surahData', JSON.stringify(data.data));
        setSurahData(data.data); // Update the state with fetched data

      } catch (error) {
        console.error('Error fetching surah data, loading from cache:', error);

        // If API fails, load data from AsyncStorage (offline mode)
        const cachedData = await AsyncStorage.getItem('surahData');
        if (cachedData !== null) {
          setSurahData(JSON.parse(cachedData)); // Use cached data if available
        } else {
          console.log('No cached data available.');
        }

      } finally {
        setLoading(false);
      }
    };

    fetchSurahData();
  }, []);

  return { surahData, loading };
};

export default useFetchSurah;
