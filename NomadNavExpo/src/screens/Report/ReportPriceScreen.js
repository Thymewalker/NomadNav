import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ReportPriceScreen() {
  const [activeTab, setActiveTab] = useState('report');
  const [formData, setFormData] = useState({
    country: '',
    category: '',
    item: '',
    price: '',
    location: '',
    notes: '',
  });

  const countries = [
    { name: 'Egypt', currency: 'EGP' },
    { name: 'Thailand', currency: 'THB' },
    { name: 'Vietnam', currency: 'VND' },
    { name: 'Indonesia', currency: 'IDR' },
  ];

  const categories = [
    'Transport',
    'Food',
    'Accommodation',
    'Activities',
    'Shopping',
    'Other',
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate form
    const requiredFields = ['country', 'category', 'item', 'price', 'location'];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      Alert.alert(
        'Missing Information',
        `Please fill in the following fields: ${missingFields.join(', ')}`
      );
      return;
    }

    // TODO: Submit to backend
    Alert.alert(
      'Success',
      'Price report submitted successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            setFormData({
              country: '',
              category: '',
              item: '',
              price: '',
              location: '',
              notes: '',
            });
          },
        },
      ]
    );
  };

  const renderReportForm = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Report a Price</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Country</Text>
        <View style={styles.pickerContainer}>
          <TouchableOpacity style={styles.picker}>
            <Text style={styles.pickerText}>
              {formData.country || 'Select Country'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
          <TouchableOpacity style={styles.picker}>
            <Text style={styles.pickerText}>
              {formData.category || 'Select Category'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Item/Service Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Taxi ride, Street food, Hotel room"
          value={formData.item}
          onChangeText={(value) => handleInputChange('item', value)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Price</Text>
        <View style={styles.priceInputContainer}>
          <TextInput
            style={[styles.input, styles.priceInput]}
            placeholder="0.00"
            value={formData.price}
            onChangeText={(value) => handleInputChange('price', value)}
            keyboardType="numeric"
          />
          <Text style={styles.currency}>
            {countries.find((c) => c.name === formData.country)?.currency || 'USD'}
          </Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., City, District, or Specific Location"
          value={formData.location}
          onChangeText={(value) => handleInputChange('location', value)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Additional Notes (Optional)</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Add any additional details about the price..."
          value={formData.notes}
          onChangeText={(value) => handleInputChange('notes', value)}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRecentReports = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Reports</Text>
      <View style={styles.emptyState}>
        <Ionicons name="document-text-outline" size={48} color="#ccc" />
        <Text style={styles.emptyStateText}>
          No recent reports available. Be the first to report a price!
        </Text>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'report':
        return renderReportForm();
      case 'recent':
        return renderRecentReports();
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
          style={[styles.tab, activeTab === 'report' && styles.activeTab]}
          onPress={() => setActiveTab('report')}
        >
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={activeTab === 'report' ? '#fff' : '#007AFF'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'report' && styles.activeTabText,
            ]}
          >
            Report Price
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'recent' && styles.activeTab]}
          onPress={() => setActiveTab('recent')}
        >
          <Ionicons
            name="time-outline"
            size={24}
            color={activeTab === 'recent' ? '#fff' : '#007AFF'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'recent' && styles.activeTabText,
            ]}
          >
            Recent Reports
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    marginRight: 10,
  },
  currency: {
    fontSize: 16,
    color: '#666',
    padding: 15,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
}); 