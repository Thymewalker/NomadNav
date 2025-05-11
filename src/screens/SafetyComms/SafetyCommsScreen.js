import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Test data for emergency information and scam alerts
const TEST_DATA = {
  Egypt: {
    emergency: {
      police: '122',
      ambulance: '123',
      fire: '180',
      touristPolice: '126',
    },
    scams: [
      {
        id: 1,
        title: 'Taxi Meter Scam',
        description: 'Some taxi drivers may claim their meter is broken and charge inflated prices.',
        prevention: 'Always agree on a price before getting in, or use ride-hailing apps.',
      },
      {
        id: 2,
        title: 'Fake Tour Guides',
        description: 'Unauthorized guides may approach you at tourist sites.',
        prevention: 'Only use licensed guides or book through reputable agencies.',
      },
    ],
    phrases: {
      greetings: [
        { english: 'Hello', local: 'مرحبا (Marhaba)' },
        { english: 'Thank you', local: 'شكرا (Shukran)' },
      ],
      emergency: [
        { english: 'Help!', local: 'ساعدني! (Sa'adni!)' },
        { english: 'Call the police', local: 'اتصل بالشرطة (Itasal bil-shurta)' },
      ],
    },
  },
  Thailand: {
    emergency: {
      police: '191',
      ambulance: '1669',
      fire: '199',
      touristPolice: '1155',
    },
    scams: [
      {
        id: 1,
        title: 'Tuk-tuk Scam',
        description: 'Some tuk-tuk drivers may take you to shops where they get commission.',
        prevention: 'Be clear about your destination and don't agree to unscheduled stops.',
      },
      {
        id: 2,
        title: 'Gem Scam',
        description: 'Tourists are sometimes taken to gem shops with inflated prices.',
        prevention: 'Avoid buying gems unless you're an expert or with a trusted local.',
      },
    ],
    phrases: {
      greetings: [
        { english: 'Hello', local: 'สวัสดี (Sawadee)' },
        { english: 'Thank you', local: 'ขอบคุณ (Khob khun)' },
      ],
      emergency: [
        { english: 'Help!', local: 'ช่วยด้วย! (Chuay duay!)' },
        { english: 'Call the police', local: 'เรียกตำรวจ (Riak tamruat)' },
      ],
    },
  },
};

const SafetyCommsScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState('Egypt');
  const [activeTab, setActiveTab] = useState('emergency');
  const [searchQuery, setSearchQuery] = useState('');

  const renderEmergencyInfo = () => (
    <ScrollView style={styles.contentArea}>
      <View style={styles.emergencyCard}>
        <Text style={styles.sectionTitle}>Emergency Numbers</Text>
        {Object.entries(TEST_DATA[selectedCountry].emergency).map(([service, number]) => (
          <TouchableOpacity key={service} style={styles.emergencyItem}>
            <View style={styles.emergencyIconContainer}>
              <Icon 
                name={service === 'police' ? 'police-badge' : 
                      service === 'ambulance' ? 'ambulance' : 
                      service === 'fire' ? 'fire-truck' : 'shield-check'} 
                size={24} 
                color="#ef4444" 
              />
            </View>
            <View style={styles.emergencyInfo}>
              <Text style={styles.emergencyService}>
                {service.charAt(0).toUpperCase() + service.slice(1)}
              </Text>
              <Text style={styles.emergencyNumber}>{number}</Text>
            </View>
            <TouchableOpacity style={styles.callButton}>
              <Icon name="phone" size={20} color="#2563eb" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  const renderScamAlerts = () => (
    <ScrollView style={styles.contentArea}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search scam alerts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {TEST_DATA[selectedCountry].scams.map((scam) => (
        <View key={scam.id} style={styles.scamCard}>
          <View style={styles.scamHeader}>
            <Icon name="alert-circle" size={24} color="#ef4444" />
            <Text style={styles.scamTitle}>{scam.title}</Text>
          </View>
          <Text style={styles.scamDescription}>{scam.description}</Text>
          <View style={styles.preventionContainer}>
            <Text style={styles.preventionLabel}>How to prevent:</Text>
            <Text style={styles.preventionText}>{scam.prevention}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderPhrasebook = () => (
    <ScrollView style={styles.contentArea}>
      <View style={styles.phrasebookCard}>
        <Text style={styles.sectionTitle}>Essential Phrases</Text>
        
        <Text style={styles.phraseCategory}>Greetings</Text>
        {TEST_DATA[selectedCountry].phrases.greetings.map((phrase, index) => (
          <View key={index} style={styles.phraseItem}>
            <Text style={styles.phraseEnglish}>{phrase.english}</Text>
            <Text style={styles.phraseLocal}>{phrase.local}</Text>
            <TouchableOpacity style={styles.speakButton}>
              <Icon name="volume-high" size={20} color="#2563eb" />
            </TouchableOpacity>
          </View>
        ))}

        <Text style={styles.phraseCategory}>Emergency</Text>
        {TEST_DATA[selectedCountry].phrases.emergency.map((phrase, index) => (
          <View key={index} style={styles.phraseItem}>
            <Text style={styles.phraseEnglish}>{phrase.english}</Text>
            <Text style={styles.phraseLocal}>{phrase.local}</Text>
            <TouchableOpacity style={styles.speakButton}>
              <Icon name="volume-high" size={20} color="#2563eb" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'emergency' && styles.activeTab]}
          onPress={() => setActiveTab('emergency')}
        >
          <Icon name="phone-alert" size={20} color={activeTab === 'emergency' ? '#2563eb' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'emergency' && styles.activeTabText]}>
            Emergency
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'scams' && styles.activeTab]}
          onPress={() => setActiveTab('scams')}
        >
          <Icon name="alert-circle" size={20} color={activeTab === 'scams' ? '#2563eb' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'scams' && styles.activeTabText]}>
            Scam Alerts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'phrases' && styles.activeTab]}
          onPress={() => setActiveTab('phrases')}
        >
          <Icon name="translate" size={20} color={activeTab === 'phrases' ? '#2563eb' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'phrases' && styles.activeTabText]}>
            Phrases
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'emergency' && renderEmergencyInfo()}
      {activeTab === 'scams' && renderScamAlerts()}
      {activeTab === 'phrases' && renderPhrasebook()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#f1f5f9',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#2563eb',
  },
  contentArea: {
    flex: 1,
    padding: 15,
  },
  emergencyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
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
    marginBottom: 15,
  },
  emergencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  emergencyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyService: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  emergencyNumber: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  callButton: {
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#1e293b',
  },
  scamCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  scamTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginLeft: 10,
  },
  scamDescription: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 10,
  },
  preventionContainer: {
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 6,
  },
  preventionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 5,
  },
  preventionText: {
    fontSize: 14,
    color: '#475569',
  },
  phrasebookCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  phraseCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 15,
    marginBottom: 10,
  },
  phraseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  phraseEnglish: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  phraseLocal: {
    flex: 1,
    fontSize: 16,
    color: '#475569',
    textAlign: 'right',
    marginRight: 10,
  },
  speakButton: {
    padding: 5,
  },
});

export default SafetyCommsScreen; 