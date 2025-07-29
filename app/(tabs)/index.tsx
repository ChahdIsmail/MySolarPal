import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sun, MapPin, Zap, DollarSign } from 'lucide-react-native';
import { router } from 'expo-router';
import BillScanner from '@/components/BillScanner';

interface FormData {
  annualConsumption: string;
  electricityBill: string;
  availableArea: string;
  latitude: string;
  longitude: string;
}

export default function Calculator() {
  const [formData, setFormData] = useState<FormData>({
    annualConsumption: '',
    electricityBill: '',
    availableArea: '',
    latitude: '',
    longitude: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const { annualConsumption, electricityBill, availableArea, latitude, longitude } = formData;
    
    if (!annualConsumption || !electricityBill || !availableArea || !latitude || !longitude) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return false;
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    
    if (isNaN(lat) || lat < -90 || lat > 90) {
      Alert.alert('Invalid Latitude', 'Please enter a valid latitude between -90 and 90.');
      return false;
    }
    
    if (isNaN(lng) || lng < -180 || lng > 180) {
      Alert.alert('Invalid Longitude', 'Please enter a valid longitude between -180 and 180.');
      return false;
    }

    return true;
  };

  const handleCalculate = () => {
    if (!validateForm()) return;

    // Store calculation data globally or in context
    // For now, we'll navigate to results
    router.push('/results');
  };

  const handleBillDataExtracted = (consumption: string) => {
    updateField('annualConsumption', consumption);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1e40af', '#3b82f6']}
        style={styles.header}>
        <Sun size={32} color="#ffffff" />
        <Text style={styles.headerTitle}>My Solar Pal</Text>
        <Text style={styles.headerSubtitle}>Size your perfect solar system</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Zap size={20} color="#1e40af" />
            <Text style={styles.sectionTitle}>Energy Consumption</Text>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Annual Electricity Consumption (kWh)</Text>
            <BillScanner onDataExtracted={handleBillDataExtracted} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Monthly Electricity Bill (USD)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 120"
              value={formData.electricityBill}
              onChangeText={(value) => updateField('electricityBill', value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color="#1e40af" />
            <Text style={styles.sectionTitle}>Location & Space</Text>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Available Horizontal Area (m²)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 45"
              value={formData.availableArea}
              onChangeText={(value) => updateField('availableArea', value)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Latitude</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 40.7128"
                value={formData.latitude}
                onChangeText={(value) => updateField('latitude', value)}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Longitude</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., -74.0060"
                value={formData.longitude}
                onChangeText={(value) => updateField('longitude', value)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
          <LinearGradient
            colors={['#10b981', '#059669']}
            style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Calculate System Size</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Pro Tip</Text>
          <Text style={styles.tipText}>
            You can find your exact coordinates using Google Maps. Right-click on your location and select the coordinates that appear.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 32,
    paddingTop: 60,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#1f2937',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  calculateButton: {
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  tipCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
});