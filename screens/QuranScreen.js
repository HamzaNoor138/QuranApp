import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import useFetchSurah from '../hooks/useFetchSurah';

const QuranScreen = () => {
  const { surahData, loading } = useFetchSurah();
  const [expandedSurah, setExpandedSurah] = useState(null);
  const [ayahDetails, setAyahDetails] = useState({}); // Object to store details of ayahs

  const handleSurahPress = async (surahNumber) => {
    if (expandedSurah === surahNumber) {
      // Collapse if the same surah is clicked
      setExpandedSurah(null);
      setAyahDetails({});
    } else {
      // Fetch details for the selected surah if not already fetched
      if (!ayahDetails[surahNumber]) {
        try {
          const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`);
          const data = await response.json();
          
          // Fetch each ayah details
          const ayahs = data.data.ayahs; // Assuming 'ayahs' is an array in the response
          const ayahPromises = ayahs.map((ayah) =>
            fetch(`https://api.alquran.cloud/v1/ayah/${ayah.number}/en.asad`).then((res) => res.json())
          );
          
          const ayahResponses = await Promise.all(ayahPromises);
          
          // Store ayah details in the state
          const ayahDetailsMap = ayahResponses.reduce((acc, response) => {
            acc[response.data.number] = response.data; // Use ayah number as key
            return acc;
          }, {});
          
          setAyahDetails((prev) => ({ ...prev, [surahNumber]: ayahDetailsMap })); // Store details for the specific surah
        } catch (error) {
          console.error('Error fetching ayah details:', error);
        }
      }
      setExpandedSurah(surahNumber);
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

            {expandedSurah === surah.number && ayahDetails[surah.number] && (
              <View style={styles.expandedDetail}>
                <Text style={styles.expandedTitle}>Ayahs:</Text>
                {Object.values(ayahDetails[surah.number]).map((ayah) => (
                  <Text key={ayah.number} style={styles.expandedText}>
                    Ayah {ayah.number}: {ayah.text}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5FF', // light background with a hint of purple
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    color: '#A6A6A6',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A3FCE', // Purple
  },
  lastRead: {
    backgroundColor: '#E9E7FD', // light purple background
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lastReadText: {
    fontSize: 16,
    color: '#7B67F1', // darker purple
  },
  surahName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A3FCE', // primary purple
  },
  ayahNumber: {
    fontSize: 16,
    color: '#6E6E6E',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabText: {
    fontSize: 16,
    color: '#A6A6A6', // grey for inactive tabs
  },
  activeTab: {
    color: '#4A3FCE', // purple for active tab
    fontWeight: 'bold',
  },
  surahList: {
    flex: 1,
  },
  surahItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  surahInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  surahNumber: {
    marginRight: 15,
    fontSize: 18,
    color: '#4A3FCE', // purple
  },
  surahDetails: {
    fontSize: 14,
    color: '#6E6E6E', // light grey
  },
  surahArabic: {
    fontSize: 22,
    color: '#4A3FCE', // purple for Arabic text
  },
  loadingText: {
    fontSize: 18,
    color: '#4A3FCE', // loading text in purple
    textAlign: 'center',
    marginTop: 20,
  },
  expandedDetail: {
    backgroundColor: '#F0F0F0', // light background for details
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  expandedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3FCE',
  },
  expandedText: {
    fontSize: 14,
    color: '#333', // dark text for details
  },
});

export default QuranScreen;
