import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Upload, FileText, Camera, X, CircleCheck as CheckCircle } from 'lucide-react-native';

interface BillScannerProps {
  onDataExtracted: (consumption: string) => void;
}

export default function BillScanner({ onDataExtracted }: BillScannerProps) {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<string | null>(null);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Camera permission is needed to take photos of your electricity bill.'
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedFile(result.assets[0]);
        processBill(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedFile(result.assets[0]);
        processBill(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  };

  const processBill = async (file: any) => {
    setIsProcessing(true);
    
    // Simulate OCR processing
    setTimeout(() => {
      // Mock extracted data - in real implementation, this would use OCR
      const mockConsumption = Math.floor(Math.random() * 5000 + 3000).toString();
      setExtractedData(mockConsumption);
      setIsProcessing(false);
      
      Alert.alert(
        'Bill Processed',
        `Found annual consumption: ${mockConsumption} kWh\n\nPlease verify this value is correct.`,
        [
          {
            text: 'Use This Value',
            onPress: () => {
              onDataExtracted(mockConsumption);
            },
          },
          {
            text: 'Try Again',
            style: 'cancel',
            onPress: () => {
              setSelectedFile(null);
              setExtractedData(null);
            },
          },
        ]
      );
    }, 2000);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setExtractedData(null);
  };

  if (selectedFile) {
    return (
      <View style={styles.selectedFileContainer}>
        <View style={styles.filePreview}>
          {selectedFile.type?.startsWith('image/') ? (
            <Image source={{ uri: selectedFile.uri }} style={styles.previewImage} />
          ) : (
            <View style={styles.pdfPreview}>
              <FileText size={48} color="#6b7280" />
              <Text style={styles.fileName}>{selectedFile.name}</Text>
            </View>
          )}
          
          <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
            <X size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>

        {isProcessing && (
          <View style={styles.processingContainer}>
            <Text style={styles.processingText}>🔍 Scanning bill...</Text>
            <Text style={styles.processingSubtext}>Extracting consumption data</Text>
          </View>
        )}

        {extractedData && (
          <View style={styles.extractedDataContainer}>
            <CheckCircle size={20} color="#10b981" />
            <Text style={styles.extractedText}>
              Found: {extractedData} kWh annually
            </Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your Electricity Bill</Text>
      <Text style={styles.subtitle}>
        We'll automatically extract your annual consumption
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
          <Camera size={24} color="#3b82f6" />
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <Upload size={24} color="#3b82f6" />
          <Text style={styles.buttonText}>Choose File</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.supportedFormats}>
        <Text style={styles.formatsTitle}>Supported formats:</Text>
        <Text style={styles.formatsText}>JPEG, PNG, PDF</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
    marginLeft: 8,
  },
  supportedFormats: {
    alignItems: 'center',
  },
  formatsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  formatsText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  selectedFileContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filePreview: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 12,
  },
  previewImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  pdfPreview: {
    alignItems: 'center',
    padding: 20,
  },
  fileName: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  clearButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  processingContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  processingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
  },
  processingSubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  extractedDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0fdf4',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  extractedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
    marginLeft: 8,
  },
});