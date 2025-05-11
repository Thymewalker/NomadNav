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

// Test data for prices
const TEST_PRICES = {
  Egypt: [
    { id: 1, item: 'Taxi (airport to downtown)', price: '300-400', currency: 'EGP', category: 'Transport' },
    { id: 2, item: 'Koshary (street food)', price: '15-30', currency: 'EGP', category: 'Food' },
    { id: 3, item: 'Bottled water', price: '5-10', currency: 'EGP', category: 'Drinks' },
  ],
  Thailand: [
    { id: 4, item: 'Tuk-tuk ride (short distance)', price: '50-150', currency: 'THB', category: 'Transport' },
    { id: 5, item: 'Pad Thai (street food)', price: '40-80', currency: 'THB', category: 'Food' },
    { id: 6, item: 'Bottled water', price: '10-15', currency: 'THB', category: 'Drinks' },
  ],
};

const PricesToolsScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState('Egypt');
  const [activeTab, setActiveTab] = useState('prices');
  const [searchQuery, setSearchQuery] = useState('');
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EGP');

  const renderPriceList = () => (
    <ScrollView style={styles.contentArea}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search prices..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {TEST_PRICES[selectedCountry].map((item) => (
        <View key={item.id} style={styles.priceCard}>
          <View style={styles.priceHeader}>
            <Text style={styles.priceItem}>{item.item}</Text>
            <Text style={styles.priceCategory}>{item.category}</Text>
          </View>
          <View style={styles.priceDetails}>
            <Text style={styles.priceValue}>
              {item.price} {item.currency}
            </Text>
            <TouchableOpacity style={styles.reportButton}>
              <Icon name="alert-circle-outline" size={20} color="#2563eb" />
              <Text style={styles.reportButtonText}>Report Different Price</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderCurrencyConverter = () => (
    <View style={styles.contentArea}>
      <View style={styles.converterCard}>
        <Text style={styles.sectionTitle}>Currency Converter</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
          />
        </View>

        <View style={styles.currencyRow}>
          <View style={styles.currencyInput}>
            <Text style={styles.label}>From</Text>
            <TouchableOpacity style={styles.currencySelector}>
              <Text style={styles.currencyText}>{fromCurrency}</Text>
              <Icon name="chevron-down" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.swapButton}>
            <Icon name="swap-horizontal" size={24} color="#2563eb" />
          </TouchableOpacity>

          <View style={styles.currencyInput}>
            <Text style={styles.label}>To</Text>
            <TouchableOpacity style={styles.currencySelector}>
              <Text style={styles.currencyText}>{toCurrency}</Text>
              <Icon name="chevron-down" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Converted Amount</Text>
          <Text style={styles.resultValue}>0.00 {toCurrency}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'prices' && styles.activeTab]}
          onPress={() => setActiveTab('prices')}
        >
          <Icon name="currency-usd" size={20} color={activeTab === 'prices' ? '#2563eb' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'prices' && styles.activeTabText]}>
            Prices
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'converter' && styles.activeTab]}
          onPress={() => setActiveTab('converter')}
        >
          <Icon name="calculator" size={20} color={activeTab === 'converter' ? '#2563eb' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'converter' && styles.activeTabText]}>
            Converter
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'prices' ? renderPriceList() : renderCurrencyConverter()}
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
    fontSize: 16,
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
  priceCard: {
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
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceItem: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  priceCategory: {
    fontSize: 14,
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportButtonText: {
    marginLeft: 5,
    color: '#2563eb',
    fontSize: 14,
  },
  converterCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
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
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  currencyInput: {
    flex: 1,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
  },
  currencyText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  swapButton: {
    padding: 10,
    marginHorizontal: 10,
  },
  resultContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
});

export default PricesToolsScreen; 