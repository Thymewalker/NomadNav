import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SafetyCommsScreen() {
  const [activeTab, setActiveTab] = useState('emergency');
  const [searchQuery, setSearchQuery] = useState('');

  const emergencyContacts = [
    { name: 'Police', number: '122', icon: 'shield-outline' },
    { name: 'Ambulance', number: '123', icon: 'medical-outline' },
    { name: 'Fire', number: '180', icon: 'flame-outline' },
    { name: 'Tourist Police', number: '126', icon: 'people-outline' },
  ];

  const commonScams = [
    {
      title: 'Taxi Scam',
      description: 'Drivers may try to charge exorbitant rates or take longer routes.',
      prevention: 'Always use official taxi stands and agree on the price before starting the journey.',
    },
    {
      title: 'Currency Exchange',
      description: 'Some exchange offices may give incorrect rates or counterfeit money.',
      prevention: 'Use official exchange offices and count your money carefully.',
    },
    {
      title: 'Fake Tour Guides',
      description: 'Unauthorized guides may offer tours at inflated prices.',
      prevention: 'Book tours through official tourism offices or reputable agencies.',
    },
  ];

  const essentialPhrases = [
    { english: 'Hello', local: 'مرحبا', pronunciation: 'Marhaba' },
    { english: 'Thank you', local: 'شكرا', pronunciation: 'Shukran' },
    { english: 'Help', local: 'مساعدة', pronunciation: 'Musaada' },
    { english: 'Emergency', local: 'طوارئ', pronunciation: 'Tawaree' },
  ];

  const renderEmergencyContacts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Emergency Contacts</Text>
      {emergencyContacts.map((contact, index) => (
        <TouchableOpacity
          key={index}
          style={styles.contactCard}
          onPress={() => Linking.openURL(`tel:${contact.number}`)}
        >
          <View style={styles.contactIcon}>
            <Ionicons name={contact.icon} size={24} color="#007AFF" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactNumber}>{contact.number}</Text>
          </View>
          <Ionicons name="call-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderScamAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Common Scams</Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search scams..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {commonScams.map((scam, index) => (
        <View key={index} style={styles.scamCard}>
          <Text style={styles.scamTitle}>{scam.title}</Text>
          <Text style={styles.scamDescription}>{scam.description}</Text>
          <View style={styles.preventionContainer}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#4CAF50" />
            <Text style={styles.preventionText}>{scam.prevention}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderEssentialPhrases = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Essential Phrases</Text>
      {essentialPhrases.map((phrase, index) => (
        <View key={index} style={styles.phraseCard}>
          <View style={styles.phraseHeader}>
            <Text style={styles.phraseEnglish}>{phrase.english}</Text>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play-circle-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.phraseLocal}>{phrase.local}</Text>
          <Text style={styles.phrasePronunciation}>{phrase.pronunciation}</Text>
        </View>
      ))}
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'emergency':
        return renderEmergencyContacts();
      case 'scams':
        return renderScamAlerts();
      case 'phrases':
        return renderEssentialPhrases();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabBar}
      >
        <TouchableOpacity
          style={[styles.tab, activeTab === 'emergency' && styles.activeTab]}
          onPress={() => setActiveTab('emergency')}
        >
          <Ionicons
            name="warning-outline"
            size={24}
            color={activeTab === 'emergency' ? '#fff' : '#007AFF'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'emergency' && styles.activeTabText,
            ]}
          >
            Emergency
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'scams' && styles.activeTab]}
          onPress={() => setActiveTab('scams')}
        >
          <Ionicons
            name="alert-circle-outline"
            size={24}
            color={activeTab === 'scams' ? '#fff' : '#007AFF'}
          />
          <Text
            style={[styles.tabText, activeTab === 'scams' && styles.activeTabText]}
          >
            Scam Alerts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'phrases' && styles.activeTab]}
          onPress={() => setActiveTab('phrases')}
        >
          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={activeTab === 'phrases' ? '#fff' : '#007AFF'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'phrases' && styles.activeTabText,
            ]}
          >
            Phrases
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView style={styles.content}>{renderContent()}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  scamCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  scamTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  scamDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  preventionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 5,
  },
  preventionText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#4CAF50',
  },
  phraseCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  phraseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  phraseEnglish: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phraseLocal: {
    fontSize: 24,
    marginBottom: 5,
  },
  phrasePronunciation: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  playButton: {
    padding: 5,
  },
}); 