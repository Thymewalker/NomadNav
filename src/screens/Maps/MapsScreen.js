import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MapsScreen = () => {
  const [selectedMap, setSelectedMap] = useState('current');
  const [downloadedMaps, setDownloadedMaps] = useState([]);

  const renderMapControls = () => (
    <View style={styles.controlsContainer}>
      <TouchableOpacity
        style={[styles.controlButton, selectedMap === 'current' && styles.activeControlButton]}
        onPress={() => setSelectedMap('current')}
      >
        <Icon name="map-marker" size={20} color={selectedMap === 'current' ? '#fff' : '#64748b'} />
        <Text style={[styles.controlButtonText, selectedMap === 'current' && styles.activeControlButtonText]}>
          Current Location
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.controlButton, selectedMap === 'offline' && styles.activeControlButton]}
        onPress={() => setSelectedMap('offline')}
      >
        <Icon name="download" size={20} color={selectedMap === 'offline' ? '#fff' : '#64748b'} />
        <Text style={[styles.controlButtonText, selectedMap === 'offline' && styles.activeControlButtonText]}>
          Offline Maps
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderOfflineMapsList = () => (
    <ScrollView style={styles.offlineMapsList}>
      <Text style={styles.sectionTitle}>Downloaded Maps</Text>
      {downloadedMaps.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="map-marker-off" size={40} color="#94a3b8" />
          <Text style={styles.emptyStateText}>No offline maps downloaded yet</Text>
          <TouchableOpacity style={styles.downloadButton}>
            <Icon name="download" size={20} color="#fff" />
            <Text style={styles.downloadButtonText}>Download Maps</Text>
          </TouchableOpacity>
        </View>
      ) : (
        downloadedMaps.map((map, index) => (
          <TouchableOpacity key={index} style={styles.mapItem}>
            <Icon name="map" size={24} color="#2563eb" />
            <View style={styles.mapItemInfo}>
              <Text style={styles.mapItemTitle}>{map.name}</Text>
              <Text style={styles.mapItemSize}>{map.size}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton}>
              <Icon name="delete" size={20} color="#ef4444" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
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
          {/* Add markers here */}
        </MapView>
      ) : (
        renderOfflineMapsList()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  controlsContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  activeControlButton: {
    backgroundColor: '#2563eb',
  },
  controlButtonText: {
    marginLeft: 5,
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  activeControlButtonText: {
    color: '#ffffff',
  },
  map: {
    flex: 1,
  },
  offlineMapsList: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyStateText: {
    color: '#64748b',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  downloadButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  mapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
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
  mapItemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  mapItemTitle: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  mapItemSize: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  deleteButton: {
    padding: 5,
  },
});

export default MapsScreen; 