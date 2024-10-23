import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import useFetchSurah from '../hooks/useFetchSurah';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/StyleScreen';  // Import the styles from the new file

const QuranScreen = () => {
  const { surahData, loading } = useFetchSurah();
  const [expandedSurah, setExpandedSurah] = useState(null);
  const [ayahs, setAyahs] = useState([]);

  const handleSurahPress = async (surahNumber) => {
    if (expandedSurah === surahNumber) {
      // Collapse if the same surah is clicked
      setExpandedSurah(null);
      setAyahs([]);
    } else {
      // Try to fetch cached ayahs first
      const cachedAyahs = await AsyncStorage.getItem(`surah_${surahNumber}_ayahs`);
      if (cachedAyahs) {
        setAyahs(JSON.parse(cachedAyahs));
        setExpandedSurah(surahNumber);
        return; // Skip fetching from API if data is already cached
      }

      // Fetch details for the selected surah and ayahs
      try {
        const response = await fetch('https://api.alquran.cloud/v1/quran/en.asad');
        const data = await response.json();

        // Filter ayahs for the selected surah
        const surahAyahs = data.data.surahs.find(surah => surah.number === surahNumber).ayahs;

        // Cache the ayahs data for offline use
        await AsyncStorage.setItem(`surah_${surahNumber}_ayahs`, JSON.stringify(surahAyahs));

        setAyahs(surahAyahs);
        setExpandedSurah(surahNumber);

      } catch (error) {
        console.error('Error fetching surah details or ayahs:', error);
      }
    }
  };

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Asslamualaikum</Text>
        <Text style={styles.userName}>Tanvir Ahassan</Text>
      </View>

      {/* Last Read Section */}
      <View style={styles.lastRead}>
        <Text style={styles.lastReadText}>Last Read</Text>
        <Text style={styles.surahName}>Al-Fatiah</Text>
        <Text style={styles.ayahNumber}>Ayah No: 1</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tabText, styles.activeTab]}>Surah</Text>
        <Text style={styles.tabText}>Para</Text>
        <Text style={styles.tabText}>Page</Text>
        <Text style={styles.tabText}>Hijb</Text>
      </View>

      {/* Surah List */}
      <ScrollView style={styles.surahList}>
        {surahData.map((surah) => (
          <View key={surah.number}>
            <TouchableOpacity
              style={styles.surahItem}
              onPress={() => handleSurahPress(surah.number)}
            >
              <View style={styles.surahInfo}>
                <Text style={styles.surahNumber}>{surah.number}</Text>
                <View>
                  <Text style={styles.surahName}>{surah.englishName}</Text>
                  <Text style={styles.surahDetails}>{`${surah.revelationType} • ${surah.numberOfAyahs} verses`}</Text>
                </View>
              </View>
              <Text style={styles.surahArabic}>{surah.name}</Text>
            </TouchableOpacity>

            {expandedSurah === surah.number && (
              <View style={styles.expandedDetail}>
                <Text style={styles.expandedTitle}>Ayahs:</Text>
                {ayahs.map((ayah) => (
                  <Text key={ayah.number} style={styles.ayahText}>
                    <Text style={styles.ayahNumber}>Ayah {ayah.number}: </Text>
                    {ayah.text}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default QuranScreen;
