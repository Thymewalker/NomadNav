import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PricesToolsScreen() {
  const [selectedTool, setSelectedTool] = useState('converter');
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EGP');

  const renderCurrencyConverter = () => (
    <View style={styles.toolContainer}>
      <Text style={styles.toolTitle}>Currency Converter</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        
        <View style={styles.currencySelector}>
          <TouchableOpacity style={styles.currencyButton}>
            <Text style={styles.currencyButtonText}>{fromCurrency}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.swapButton}>
            <Ionicons name="swap-horizontal" size={24} color="#007AFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.currencyButton}>
            <Text style={styles.currencyButtonText}>{toCurrency}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Converted Amount</Text>
          <Text style={styles.resultValue}>0.00 {toCurrency}</Text>
        </View>
      </View>
    </View>
  );

  const renderBudgetPlanner = () => (
    <View style={styles.toolContainer}>
      <Text style={styles.toolTitle}>Budget Planner</Text>
      <Text style={styles.comingSoon}>Coming Soon</Text>
    </View>
  );

  const renderPriceHistory = () => (
    <View style={styles.toolContainer}>
      <Text style={styles.toolTitle}>Price History</Text>
      <Text style={styles.comingSoon}>Coming Soon</Text>
    </View>
  );

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'converter':
        return renderCurrencyConverter();
      case 'planner':
        return renderBudgetPlanner();
      case 'history':
        return renderPriceHistory();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.toolSelector}
      >
        <TouchableOpacity
          style={[
            styles.toolButton,
            selectedTool === 'converter' && styles.activeTool,
          ]}
          onPress={() => setSelectedTool('converter')}
        >
          <Ionicons
            name="calculator-outline"
            size={24}
            color={selectedTool === 'converter' ? '#fff' : '#007AFF'}
          />
          <Text
            style={[
              styles.toolButtonText,
              selectedTool === 'converter' && styles.activeToolText,
            ]}
          >
            Converter
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toolButton,
            selectedTool === 'planner' && styles.activeTool,
          ]}
          onPress={() => setSelectedTool('planner')}
        >
          <Ionicons
            name="wallet-outline"
            size={24}
            color={selectedTool === 'planner' ? '#fff' : '#007AFF'}
          />
          <Text
            style={[
              styles.toolButtonText,
              selectedTool === 'planner' && styles.activeToolText,
            ]}
          >
            Budget Planner
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toolButton,
            selectedTool === 'history' && styles.activeTool,
          ]}
          onPress={() => setSelectedTool('history')}
        >
          <Ionicons
            name="time-outline"
            size={24}
            color={selectedTool === 'history' ? '#fff' : '#007AFF'}
          />
          <Text
            style={[
              styles.toolButtonText,
              selectedTool === 'history' && styles.activeToolText,
            ]}
          >
            Price History
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView style={styles.content}>
        {renderToolContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolSelector: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTool: {
    backgroundColor: '#007AFF',
  },
  toolButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  activeToolText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  toolContainer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
  },
  toolTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  currencyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  currencyButtonText: {
    fontSize: 16,
    color: '#333',
  },
  swapButton: {
    padding: 10,
  },
  resultContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  comingSoon: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
}); 