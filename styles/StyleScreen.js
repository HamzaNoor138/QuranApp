import { StyleSheet } from 'react-native';

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
  ayahText: {
    fontSize: 14,
    color: '#333', // dark text for ayah
    marginBottom: 5,
  },
  ayahNumber: {
    fontWeight: 'bold',
    color: '#4A3FCE', // purple for ayah number
  },
});

export default styles;
