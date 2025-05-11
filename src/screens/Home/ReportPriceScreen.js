// File Location: NomadNav/src/screens/Home/ReportPriceScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
// import { Picker } from '@react-native-picker/picker'; // If you want a picker for currency/category here

// --- Configuration ---
const DEFAULT_CURRENCY = 'EGP'; // Example, should ideally be dynamic based on selected country
const CATEGORIES = [
  'Taxi/Transport',
  'Food & Drink (Cafe/Restaurant)',
  'Food & Drink (Market/Street)',
  'Souvenirs',
  'Activities',
  'Groceries (Basic)',
  'Other',
];

const ReportPriceScreen = ({ navigation, route }) => {
  // route.params might contain pre-filled info if navigated with params
  const [itemName, setItemName] = useState('');
  const [pricePaid, setPricePaid] = useState('');
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [locationNotes, setLocationNotes] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');

  const handleSubmitPrice = () => {
    if (!itemName.trim()) {
      Alert.alert('Missing Info', 'Please enter the item or service name.');
      return;
    }
    if (!pricePaid.trim() || isNaN(parseFloat(pricePaid))) {
      Alert.alert('Invalid Price', 'Please enter a valid price.');
      return;
    }

    const priceData = {
      itemName,
      pricePaid: parseFloat(pricePaid),
      currency,
      category: selectedCategory,
      location: {
        description: locationNotes.trim(),
      },
      notes: generalNotes.trim(),
      reportedAt: new Date().toISOString(),
      // country: route.params?.country || 'Unknown' // Example if country context is passed
    };

    console.log('Submitting Price Data:', priceData);
    Alert.alert(
      'Price Reported (Mock)',
      `Item: ${itemName}\nPrice: ${pricePaid} ${currency}\nCategory: ${selectedCategory}`
    );

    // Optionally navigate back or clear form
    // navigation.goBack();
    setItemName('');
    setPricePaid('');
    setLocationNotes('');
    setGeneralNotes('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* The header is now provided by react-navigation as configured in App.js */}
        {/* <Text style={styles.header}>Report a Price</Text> */}

        <Text style={styles.instructions}>
          Help fellow travelers by sharing what you paid.
        </Text>

        <Text style={styles.label}>Item/Service Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Taxi to airport, Koshary meal"
          value={itemName}
          onChangeText={setItemName}
        />

        <View style={styles.row}>
          <View style={styles.priceInputContainer}>
            <Text style={styles.label}>Price Paid*</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 150"
              value={pricePaid}
              onChangeText={setPricePaid}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.currencyInputContainer}>
            <Text style={styles.label}>Currency*</Text>
            <TextInput
                style={styles.input}
                value={currency}
                onChangeText={setCurrency}
                placeholder="e.g., EGP"
            />
          </View>
        </View>

        <Text style={styles.label}>Category*</Text>
        <View style={styles.categorySelector}>
            {CATEGORIES.map((cat) => (
                <TouchableOpacity
                    key={cat}
                    style={[
                        styles.categoryButton,
                        selectedCategory === cat && styles.categoryButtonSelected
                    ]}
                    onPress={() => setSelectedCategory(cat)}
                >
                    <Text style={[
                        styles.categoryButtonText,
                        selectedCategory === cat && styles.categoryButtonTextSelected
                    ]}>{cat}</Text>
                </TouchableOpacity>
            ))}
        </View>

        <Text style={styles.label}>Location Details / Shop Name (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Khan el-Khalili shop #3"
          value={locationNotes}
          onChangeText={setLocationNotes}
          multiline
          numberOfLines={2}
        />

        <Text style={styles.label}>Other Notes (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Haggled hard, included free drink"
          value={generalNotes}
          onChangeText={setGeneralNotes}
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPrice}>
          <Text style={styles.submitButtonText}>Submit Price</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  scrollContainer: {
    padding: 20,
  },
  // Header text style removed as header is now from react-navigation
  instructions: {
    fontSize: 16,
    color: '#5c6a7d',
    marginBottom: 25,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    color: '#1e293b',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceInputContainer: {
    flex: 0.6,
    marginRight: 10,
  },
  currencyInputContainer: {
    flex: 0.38,
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryButtonSelected: {
    backgroundColor: '#3b82f6',
  },
  categoryButtonText: {
    color: '#334155',
    fontSize: 14,
  },
  categoryButtonTextSelected: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReportPriceScreen;
