import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';

// Test data for categories and currencies
const CATEGORIES = [
  'Transport',
  'Food',
  'Accommodation',
  'Activities',
  'Shopping',
  'Other',
];

const CURRENCIES = {
  Egypt: 'EGP',
  Thailand: 'THB',
  Vietnam: 'VND',
  Indonesia: 'IDR',
};

const ReportPriceScreen = () => {
  const [activeTab, setActiveTab] = useState('report');
  const [formData, setFormData] = useState({
    country: 'Egypt',
    category: 'Transport',
    item: '',
    price: '',
    location: '',
    notes: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate form data
    if (!formData.item || !formData.price || !formData.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Here you would typically send the data to your backend
    Alert.alert(
      'Success',
      'Price reported successfully!',
      [{ text: 'OK', onPress: () => resetForm() }]
    );
  };

  const resetForm = () => {
    setFormData({
      country: 'Egypt',
      category: 'Transport',
      item: '',
      price: '',
      location: '',
      notes: '',
    });
  };

  const renderReportForm = () => (
    <ScrollView style={styles.contentArea}>
      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Report a Price</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData.country}
              onValueChange={(value) => handleInputChange('country', value)}
              style={styles.picker}
            >
              {Object.keys(CURRENCIES).map((country) => (
                <Picker.Item key={country} label={country} value={country} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData.category}
              onValueChange={(value) => handleInputChange('category', value)}
              style={styles.picker}
            >
              {CATEGORIES.map((category) => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Item/Service *</Text>
          <TextInput
            style={styles.input}
            value={formData.item}
            onChangeText={(value) => handleInputChange('item', value)}
            placeholder="e.g., Taxi ride, Street food, Hotel room"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price *</Text>
          <View style={styles.priceInputContainer}>
            <TextInput
              style={[styles.input, styles.priceInput]}
              value={formData.price}
              onChangeText={(value) => handleInputChange('price', value)}
              placeholder="Enter amount"
              keyboardType="numeric"
            />
            <Text style={styles.currencyText}>{CURRENCIES[formData.country]}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location *</Text>
          <TextInput
            style={styles.input}
            value={formData.location}
            onChangeText={(value) => handleInputChange('location', value)}
            placeholder="e.g., City, District, or Specific location"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Additional Notes</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            value={formData.notes}
            onChangeText={(value) => handleInputChange('notes', value)}
            placeholder="Add any additional details about the price or service"
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Icon name="check-circle" size={20} color="#ffffff" />
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderRecentReports = () => (
    <ScrollView style={styles.contentArea}>
      <View style={styles.recentReportsCard}>
        <Text style={styles.sectionTitle}>Recent Reports</Text>
        <Text style={styles.emptyStateText}>No recent reports to display</Text>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'report' && styles.activeTab]}
          onPress={() => setActiveTab('report')}
        >
          <Icon name="plus-circle" size={20} color={activeTab === 'report' ? '#2563eb' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'report' && styles.activeTabText]}>
            Report Price
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'recent' && styles.activeTab]}
          onPress={() => setActiveTab('recent')}
        >
          <Icon name="clock-outline" size={20} color={activeTab === 'recent' ? '#2563eb' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'recent' && styles.activeTabText]}>
            Recent Reports
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'report' ? renderReportForm() : renderRecentReports()}
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
  formCard: {
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
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
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
  pickerWrapper: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
  },
  picker: {
    height: 50,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    marginRight: 10,
  },
  currencyText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  recentReportsCard: {
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
  emptyStateText: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 16,
    marginTop: 20,
  },
});

export default ReportPriceScreen; 