import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Test data - This will be replaced with API data later
const testData = {
  egypt: {
    guides: [
      { title: 'Pyramids of Giza', description: 'Ancient wonders of the world' },
      { title: 'Nile River Cruise', description: 'Experience the lifeblood of Egypt' },
    ],
    transport: [
      { type: 'Metro', cost: '5 EGP', description: 'Fast and cheap way to get around Cairo' },
      { type: 'Taxi', cost: '30-50 EGP', description: 'Negotiate price before getting in' },
    ],
    haggling: {
      tips: [
        'Start at 50% of asking price',
        'Be prepared to walk away',
        'Shop around for best prices',
      ],
    },
    visa: {
      requirements: [
        'Valid passport (6 months validity)',
        'Visa application form',
        'Passport photos',
        'Proof of accommodation',
      ],
      cost: '25 USD',
      duration: '30 days',
    },
  },
  thailand: {
    guides: [
      { title: 'Temples of Bangkok', description: 'Spiritual heart of Thailand' },
      { title: 'Island Hopping', description: 'Explore paradise beaches' },
    ],
    transport: [
      { type: 'Tuk-tuk', cost: '50-100 THB', description: 'Iconic Thai transport' },
      { type: 'BTS Skytrain', cost: '15-40 THB', description: 'Modern and efficient' },
    ],
    haggling: {
      tips: [
        'Start at 30% of asking price',
        'Be respectful and smile',
        'Know market prices beforehand',
      ],
    },
    visa: {
      requirements: [
        'Valid passport (6 months validity)',
        'Return flight ticket',
        'Proof of funds',
        'Passport photos',
      ],
      cost: 'Free (30 days)',
      duration: '30 days',
    },
  },
};

export default function ExploreScreen() {
  const [selectedCountry, setSelectedCountry] = useState('egypt');
  const [activeSection, setActiveSection] = useState('guides');

  const renderSectionContent = () => {
    const countryData = testData[selectedCountry];
    
    switch (activeSection) {
      case 'guides':
        return (
          <View style={styles.sectionContent}>
            {countryData.guides.map((guide, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>{guide.title}</Text>
                <Text style={styles.cardDescription}>{guide.description}</Text>
              </View>
            ))}
          </View>
        );
      
      case 'transport':
        return (
          <View style={styles.sectionContent}>
            {countryData.transport.map((item, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>{item.type}</Text>
                <Text style={styles.cardSubtitle}>Cost: {item.cost}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
            ))}
          </View>
        );
      
      case 'haggling':
        return (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Haggling Tips</Text>
            {countryData.haggling.tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Ionicons name="bulb-outline" size={20} color="#007AFF" />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        );
      
      case 'visa':
        return (
          <View style={styles.sectionContent}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Visa Requirements</Text>
              {countryData.visa.requirements.map((req, index) => (
                <View key={index} style={styles.requirementItem}>
                  <Ionicons name="checkmark-circle-outline" size={20} color="#007AFF" />
                  <Text style={styles.requirementText}>{req}</Text>
                </View>
              ))}
              <View style={styles.visaInfo}>
                <Text style={styles.visaInfoText}>Cost: {countryData.visa.cost}</Text>
                <Text style={styles.visaInfoText}>Duration: {countryData.visa.duration}</Text>
              </View>
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <View style={styles.countrySelector}>
          <TouchableOpacity
            style={[
              styles.countryButton,
              selectedCountry === 'egypt' && styles.selectedCountry,
            ]}
            onPress={() => setSelectedCountry('egypt')}
          >
            <Text style={styles.countryText}>Egypt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.countryButton,
              selectedCountry === 'thailand' && styles.selectedCountry,
            ]}
            onPress={() => setSelectedCountry('thailand')}
          >
            <Text style={styles.countryText}>Thailand</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sectionNav}
      >
        <TouchableOpacity
          style={[styles.sectionButton, activeSection === 'guides' && styles.activeSection]}
          onPress={() => setActiveSection('guides')}
        >
          <Text style={styles.sectionButtonText}>Guides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sectionButton, activeSection === 'transport' && styles.activeSection]}
          onPress={() => setActiveSection('transport')}
        >
          <Text style={styles.sectionButtonText}>Transport</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sectionButton, activeSection === 'haggling' && styles.activeSection]}
          onPress={() => setActiveSection('haggling')}
        >
          <Text style={styles.sectionButtonText}>Haggling</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sectionButton, activeSection === 'visa' && styles.activeSection]}
          onPress={() => setActiveSection('visa')}
        >
          <Text style={styles.sectionButtonText}>Visa</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView style={styles.content}>
        {renderSectionContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  countrySelector: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  countryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedCountry: {
    backgroundColor: '#007AFF',
  },
  countryText: {
    fontSize: 16,
    color: '#333',
  },
  sectionNav: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeSection: {
    backgroundColor: '#007AFF',
  },
  sectionButtonText: {
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionContent: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  requirementText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  visaInfo: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  visaInfoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
}); 