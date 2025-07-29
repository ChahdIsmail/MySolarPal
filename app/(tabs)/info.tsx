import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Info, 
  BookOpen, 
  Calculator,
  Sun,
  Zap,
  DollarSign,
  ExternalLink,
  Mail
} from 'lucide-react-native';

export default function InfoScreen() {
  const handleEmailContact = () => {
    Linking.openURL('mailto:support@mysolarpal.com');
  };

  const handleExternalLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#7c3aed', '#a855f7']}
        style={styles.header}>
        <Info size={32} color="#ffffff" />
        <Text style={styles.headerTitle}>My Solar Pal Guide</Text>
        <Text style={styles.headerSubtitle}>Everything you need to know</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BookOpen size={20} color="#7c3aed" />
            <Text style={styles.sectionTitle}>How It Works</Text>
          </View>
          
          <View style={styles.stepCard}>
            <Text style={styles.stepNumber}>1</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Energy Assessment</Text>
              <Text style={styles.stepDescription}>
                Enter your annual electricity consumption and monthly bill to understand your energy needs.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <Text style={styles.stepNumber}>2</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Location Analysis</Text>
              <Text style={styles.stepDescription}>
                Your coordinates help us determine solar irradiance and optimal system sizing for your area.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <Text style={styles.stepNumber}>3</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>System Design</Text>
              <Text style={styles.stepDescription}>
                Available space determines panel layout and configuration options for maximum efficiency.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calculator size={20} color="#7c3aed" />
            <Text style={styles.sectionTitle}>Key Metrics Explained</Text>
          </View>

          <View style={styles.metricExplanation}>
            <Sun size={16} color="#f59e0b" />
            <View style={styles.metricContent}>
              <Text style={styles.metricTitle}>System Size (kW)</Text>
              <Text style={styles.metricDescription}>
                Total power capacity of your solar panel array under standard test conditions.
              </Text>
            </View>
          </View>

          <View style={styles.metricExplanation}>
            <Zap size={16} color="#3b82f6" />
            <View style={styles.metricContent}>
              <Text style={styles.metricTitle}>Series vs Parallel</Text>
              <Text style={styles.metricDescription}>
                Series increases voltage, parallel increases current. Both affect system performance and inverter compatibility.
              </Text>
            </View>
          </View>

          <View style={styles.metricExplanation}>
            <DollarSign size={16} color="#10b981" />
            <View style={styles.metricContent}>
              <Text style={styles.metricTitle}>Payback Period</Text>
              <Text style={styles.metricDescription}>
                Time needed to recover your initial investment through electricity bill savings.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Notes</Text>
          
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>⚡ Grid-Tied Systems Only</Text>
            <Text style={styles.noteText}>
              This calculator is designed for grid-connected PV systems without battery storage.
            </Text>
          </View>

          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>📍 Location Accuracy</Text>
            <Text style={styles.noteText}>
              Precise coordinates improve calculation accuracy. Use GPS or Google Maps for best results.
            </Text>
          </View>

          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>🏠 Professional Installation</Text>
            <Text style={styles.noteText}>
              Always consult with certified solar installers for final system design and installation.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          
          <TouchableOpacity 
            style={styles.linkCard}
            onPress={() => handleExternalLink('https://www.nrel.gov/gis/solar.html')}>
            <ExternalLink size={16} color="#3b82f6" />
            <Text style={styles.linkText}>NREL Solar Resource Maps</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkCard}
            onPress={() => handleExternalLink('https://www.energy.gov/eere/solar/homeowners-guide-federal-tax-credit-solar-photovoltaics')}>
            <ExternalLink size={16} color="#3b82f6" />
            <Text style={styles.linkText}>Federal Solar Tax Credits</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.contactButton} onPress={handleEmailContact}>
          <LinearGradient
            colors={['#7c3aed', '#a855f7']}
            style={styles.buttonGradient}>
            <Mail size={20} color="#ffffff" />
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>My Solar Pal v1.0</Text>
          <Text style={styles.footerSubtext}>
            Built for solar professionals and enthusiasts
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 8,
  },
  stepCard: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7c3aed',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 32,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  metricExplanation: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
  },
  metricContent: {
    flex: 1,
    marginLeft: 12,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  metricDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  noteCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    marginBottom: 12,
  },
  linkText: {
    fontSize: 16,
    color: '#3b82f6',
    marginLeft: 12,
  },
  contactButton: {
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  footerSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
});