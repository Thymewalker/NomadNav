import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

export default function MapsScreen() {
  const [selectedMap, setSelectedMap] = useState('current');
  const [downloadedMaps, setDownloadedMaps] = useState([]);

  const renderMapControls = () => (
    <View style={styles.controls}>
      <TouchableOpacity
        style={[
          styles.controlButton,
          selectedMap === 'current' && styles.activeControl,
        ]}
        onPress={() => setSelectedMap('current')}
      >
        <Ionicons
          name="location"
          size={24}
          color={selectedMap === 'current' ? '#fff' : '#007AFF'}
        />
        <Text
          style={[
            styles.controlButtonText,
            selectedMap === 'current' && styles.activeControlText,
          ]}
        >
          Current Location
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.controlButton,
          selectedMap === 'offline' && styles.activeControl,
        ]}
        onPress={() => setSelectedMap('offline')}
      >
        <Ionicons
          name="download"
          size={24}
          color={selectedMap === 'offline' ? '#fff' : '#007AFF'}
        />
        <Text
          style={[
            styles.controlButtonText,
            selectedMap === 'offline' && styles.activeControlText,
          ]}
        >
          Offline Maps
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderOfflineMapsList = () => (
    <View style={styles.offlineMapsContainer}>
      {downloadedMaps.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="map-outline" size={64} color="#ccc" />
          <Text style={styles.emptyStateText}>No maps downloaded yet</Text>
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.downloadButtonText}>Download Maps</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView>
          {downloadedMaps.map((map, index) => (
            <View key={index} style={styles.mapItem}>
              <Text style={styles.mapItemTitle}>{map.name}</Text>
              <Text style={styles.mapItemSize}>{map.size}</Text>
              <TouchableOpacity style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={24} color="#ff3b30" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderMapControls()}
      
      {selectedMap === 'current' ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 30.0444,
            longitude: 31.2357,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: 30.0444,
              longitude: 31.2357,
            }}
            title="Cairo"
            description="Capital of Egypt"
          />
        </MapView>
      ) : (
        renderOfflineMapsList()
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  controls: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  activeControl: {
    backgroundColor: '#007AFF',
  },
  controlButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  activeControlText: {
    color: '#fff',
  },
  map: {
    flex: 1,
  },
  offlineMapsContainer: {
    flex: 1,
    padding: 15,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
  },
  downloadButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 10,
  },
  mapItemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapItemSize: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
  },
  deleteButton: {
    padding: 5,
  },
}); 