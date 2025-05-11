import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Test data for different countries
const TEST_DATA = {
  Egypt: {
    guide: "Welcome to Egypt! Here are some essential tips:\n\n" +
           "• Always negotiate prices for taxis and souvenirs\n" +
           "• Local currency is Egyptian Pound (EGP)\n" +
           "• Tipping (baksheesh) is expected for many services\n" +
           "• Be prepared for persistent vendors in tourist areas",
    transport: {
      title: "Local Transport Guide",
      content: "• Taxis: Always negotiate price before riding\n" +
               "• Metro: Available in Cairo, very cheap\n" +
               "• Buses: Cheap but can be crowded\n" +
               "• Uber/Careem: Available in major cities"
    },
    haggling: {
      title: "Haggling & Etiquette",
      content: "• Start at 50% of initial price\n" +
               "• Be friendly but firm\n" +
               "• Walk away if price isn't right\n" +
               "• Tipping: 10-15% in restaurants"
    },
    visa: {
      title: "Visa & Entry Requirements",
      content: "• Most nationalities need a visa\n" +
               "• Can be obtained on arrival\n" +
               "• Valid for 30 days\n" +
               "• Cost: ~$25 USD"
    }
  },
  Thailand: {
    guide: "Welcome to Thailand! Here are some essential tips:\n\n" +
           "• Use the Thai Baht (THB) for all transactions\n" +
           "• Street food is safe and delicious\n" +
           "• Tuk-tuks should be negotiated before riding\n" +
           "• Markets are great for souvenirs and local goods",
    transport: {
      title: "Local Transport Guide",
      content: "• Tuk-tuks: Negotiate price first\n" +
               "• BTS/MRT: Modern and efficient\n" +
               "• Songthaews: Shared pickup trucks\n" +
               "• Grab: Southeast Asia's ride-hailing app"
    },
    haggling: {
      title: "Haggling & Etiquette",
      content: "• Markets: Start at 60-70% of asking price\n" +
               "• Malls: Fixed prices, no haggling\n" +
               "• Be respectful and smile\n" +
               "• Tipping: Not expected but appreciated"
    },
    visa: {
      title: "Visa & Entry Requirements",
      content: "• Many countries get 30-day visa exemption\n" +
               "• Extensions possible at immigration\n" +
               "• Proof of onward travel required\n" +
               "• Cost: Free for visa exemption"
    }
  }
};

const ExploreScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState('Egypt');
  const [activeSection, setActiveSection] = useState('guide');

  const renderSection = () => {
    const countryData = TEST_DATA[selectedCountry];
    switch (activeSection) {
      case 'guide':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Traveler's Guide</Text>
            <Text style={styles.sectionContent}>{countryData.guide}</Text>
          </View>
        );
      case 'transport':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{countryData.transport.title}</Text>
            <Text style={styles.sectionContent}>{countryData.transport.content}</Text>
          </View>
        );
      case 'haggling':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{countryData.haggling.title}</Text>
            <Text style={styles.sectionContent}>{countryData.haggling.content}</Text>
          </View>
        );
      case 'visa':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{countryData.visa.title}</Text>
            <Text style={styles.sectionContent}>{countryData.visa.content}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Country Selector */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Country:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedCountry}
            onValueChange={(itemValue) => setSelectedCountry(itemValue)}
            style={styles.picker}
          >
            {Object.keys(TEST_DATA).map((country) => (
              <Picker.Item key={country} label={country} value={country} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Section Navigation */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.sectionNav}
        contentContainerStyle={styles.sectionNavContent}
      >
        <TouchableOpacity
          style={[styles.sectionButton, activeSection === 'guide' && styles.activeSectionButton]}
          onPress={() => setActiveSection('guide')}
        >
          <Icon name="book-open-page-variant" size={20} color={activeSection === 'guide' ? '#fff' : '#64748b'} />
          <Text style={[styles.sectionButtonText, activeSection === 'guide' && styles.activeSectionButtonText]}>
            Guide
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sectionButton, activeSection === 'transport' && styles.activeSectionButton]}
          onPress={() => setActiveSection('transport')}
        >
          <Icon name="bus" size={20} color={activeSection === 'transport' ? '#fff' : '#64748b'} />
          <Text style={[styles.sectionButtonText, activeSection === 'transport' && styles.activeSectionButtonText]}>
            Transport
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sectionButton, activeSection === 'haggling' && styles.activeSectionButton]}
          onPress={() => setActiveSection('haggling')}
        >
          <Icon name="handshake" size={20} color={activeSection === 'haggling' ? '#fff' : '#64748b'} />
          <Text style={[styles.sectionButtonText, activeSection === 'haggling' && styles.activeSectionButtonText]}>
            Haggling
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sectionButton, activeSection === 'visa' && styles.activeSectionButton]}
          onPress={() => setActiveSection('visa')}
        >
          <Icon name="passport" size={20} color={activeSection === 'visa' ? '#fff' : '#64748b'} />
          <Text style={[styles.sectionButtonText, activeSection === 'visa' && styles.activeSectionButtonText]}>
            Visa
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Content Area */}
      <ScrollView style={styles.contentArea}>
        {renderSection()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  pickerContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  label: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  picker: {
    height: 50,
  },
  sectionNav: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  sectionNavContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  activeSectionButton: {
    backgroundColor: '#2563eb',
  },
  sectionButtonText: {
    marginLeft: 5,
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  activeSectionButtonText: {
    color: '#ffffff',
  },
  contentArea: {
    flex: 1,
    padding: 15,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
  },
});

export default ExploreScreen; 