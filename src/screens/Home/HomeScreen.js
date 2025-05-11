// File Location: NomadNav/src/screens/Home/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Ensure this is installed

// Test data for different countries
const TEST_DATA = {
  Egypt: {
    guide: "Welcome to Egypt! Here are some essential tips:\n\n" +
           "• Always negotiate prices for taxis and souvenirs\n" +
           "• Local currency is Egyptian Pound (EGP)\n" +
           "• Tipping (baksheesh) is expected for many services\n" +
           "• Be prepared for persistent vendors in tourist areas",
    currency: "EGP",
    commonPrices: {
      "Taxi (short ride)": "20-50 EGP",
      "Local meal": "30-80 EGP",
      "Bottled water": "5-10 EGP",
    }
  },
  Thailand: {
    guide: "Welcome to Thailand! Here are some essential tips:\n\n" +
           "• Use the Thai Baht (THB) for all transactions\n" +
           "• Street food is safe and delicious\n" +
           "• Tuk-tuks should be negotiated before riding\n" +
           "• Markets are great for souvenirs and local goods",
    currency: "THB",
    commonPrices: {
      "Tuk-tuk ride": "50-150 THB",
      "Street food meal": "40-100 THB",
      "Bottled water": "10-15 THB",
    }
  }
};

// This HomeScreen will now be simpler. It will display the country picker
// and the "Guide" information for the selected country.
// The other data types (Prices, Trusted) will be handled by their own dedicated tabs/screens
// as defined in App.js.
const HomeScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState('Egypt');

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Area with App Title and Country Selector */}
      <View style={styles.headerContainer}>
        <Text style={styles.appTitleText}>NomadNav</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCountry}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCountry(itemValue)}
            dropdownIconColor="#1e293b"
          >
            {Object.keys(TEST_DATA).map((country) => (
              <Picker.Item key={country} label={country} value={country} style={styles.pickerItem} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Content Area - Displays the guide for the selected country */}
      <ScrollView style={styles.contentArea}>
        <Text style={styles.tabScreenTitle}>Traveler's Guide for {selectedCountry}</Text>
        <Text style={styles.guideContent}>
          {TEST_DATA[selectedCountry].guide}
        </Text>

        <View style={styles.pricesContainer}>
          <Text style={styles.sectionTitle}>Common Prices</Text>
          {Object.entries(TEST_DATA[selectedCountry].commonPrices).map(([item, price]) => (
            <View key={item} style={styles.priceItem}>
              <Text style={styles.priceItemName}>{item}</Text>
              <Text style={styles.priceItemValue}>{price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  headerContainer: {
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? 15 : 10,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  appTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#1e293b',
  },
  pickerItem: {
    fontSize: 16,
  },
  contentArea: {
    flex: 1,
    padding: 20,
  },
  tabScreenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 15,
    textAlign: 'center',
  },
  guideContent: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    textAlign: 'left',
  },
  pricesContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  priceItemName: {
    fontSize: 16,
    color: '#334155',
  },
  priceItemValue: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '500',
  },
});

export default HomeScreen;
