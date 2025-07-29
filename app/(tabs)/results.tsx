import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sun, Zap, Grid2x2 as Grid, DollarSign, Calendar, TrendingUp, Settings } from 'lucide-react-native';

export default function Results() {
  // These would normally come from your calculation logic
  const results = {
    totalPanels: 16,
    systemSize: '6.4 kW',
    panelsInSeries: 8,
    panelsInParallel: 2,
    recommendedPanel: {
      brand: 'Canadian Solar',
      model: 'CS3W-400P',
      power: '400W',
      efficiency: '20.3%',
      dimensions: '2.11m × 1.05m',
    },
    inverter: {
      brand: 'SolarEdge',
      model: 'SE6000H',
      power: '6000W',
      efficiency: '97.6%',
    },
    financials: {
      totalCost: 18500,
      paybackPeriod: 7.2,
      annualSavings: 1440,
      roi25Years: '340%',
    },
    performance: {
      annualProduction: '9,200 kWh',
      offsetPercentage: '95%',
      co2Reduction: '4.1 tons/year',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#059669', '#10b981']}
        style={styles.header}>
        <TrendingUp size={32} color="#ffffff" />
        <Text style={styles.headerTitle}>System Recommendation</Text>
        <Text style={styles.headerSubtitle}>Your optimized solar solution</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* System Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>System Overview</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewItem}>
              <Sun size={24} color="#f59e0b" />
              <Text style={styles.overviewValue}>{results.totalPanels}</Text>
              <Text style={styles.overviewLabel}>Solar Panels</Text>
            </View>
            <View style={styles.overviewItem}>
              <Zap size={24} color="#3b82f6" />
              <Text style={styles.overviewValue}>{results.systemSize}</Text>
              <Text style={styles.overviewLabel}>System Size</Text>
            </View>
            <View style={styles.overviewItem}>
              <Grid size={24} color="#8b5cf6" />
              <Text style={styles.overviewValue}>{results.panelsInSeries}×{results.panelsInParallel}</Text>
              <Text style={styles.overviewLabel}>Configuration</Text>
            </View>
          </View>
        </View>

        {/* Recommended Components */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Components</Text>
          
          <View style={styles.componentCard}>
            <View style={styles.componentHeader}>
              <Sun size={20} color="#f59e0b" />
              <Text style={styles.componentTitle}>Solar Panel</Text>
            </View>
            <Text style={styles.componentBrand}>{results.recommendedPanel.brand}</Text>
            <Text style={styles.componentModel}>{results.recommendedPanel.model}</Text>
            <View style={styles.componentSpecs}>
              <Text style={styles.specItem}>Power: {results.recommendedPanel.power}</Text>
              <Text style={styles.specItem}>Efficiency: {results.recommendedPanel.efficiency}</Text>
              <Text style={styles.specItem}>Size: {results.recommendedPanel.dimensions}</Text>
            </View>
          </View>

          <View style={styles.componentCard}>
            <View style={styles.componentHeader}>
              <Settings size={20} color="#3b82f6" />
              <Text style={styles.componentTitle}>Inverter</Text>
            </View>
            <Text style={styles.componentBrand}>{results.inverter.brand}</Text>
            <Text style={styles.componentModel}>{results.inverter.model}</Text>
            <View style={styles.componentSpecs}>
              <Text style={styles.specItem}>Power: {results.inverter.power}</Text>
              <Text style={styles.specItem}>Efficiency: {results.inverter.efficiency}</Text>
            </View>
          </View>
        </View>

        {/* Financial Analysis */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <DollarSign size={20} color="#10b981" />
            <Text style={styles.sectionTitle}>Financial Analysis</Text>
          </View>
          
          <View style={styles.financialGrid}>
            <View style={styles.financialItem}>
              <Text style={styles.financialValue}>${results.financials.totalCost.toLocaleString()}</Text>
              <Text style={styles.financialLabel}>Total Investment</Text>
            </View>
            <View style={styles.financialItem}>
              <Text style={styles.financialValue}>{results.financials.paybackPeriod} years</Text>
              <Text style={styles.financialLabel}>Payback Period</Text>
            </View>
            <View style={styles.financialItem}>
              <Text style={styles.financialValue}>${results.financials.annualSavings.toLocaleString()}</Text>
              <Text style={styles.financialLabel}>Annual Savings</Text>
            </View>
            <View style={styles.financialItem}>
              <Text style={styles.financialValue}>{results.financials.roi25Years}</Text>
              <Text style={styles.financialLabel}>25-Year ROI</Text>
            </View>
          </View>
        </View>

        {/* Performance Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Metrics</Text>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Annual Energy Production</Text>
            <Text style={styles.metricValue}>{results.performance.annualProduction}</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Energy Offset</Text>
            <Text style={styles.metricValue}>{results.performance.offsetPercentage}</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>CO₂ Reduction</Text>
            <Text style={styles.metricValue}>{results.performance.co2Reduction}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={['#1e40af', '#3b82f6']}
            style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Get Professional Quote</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  overviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  overviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overviewItem: {
    alignItems: 'center',
  },
  overviewValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 8,
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
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
  componentCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  componentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  componentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  componentBrand: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  componentModel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  componentSpecs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specItem: {
    fontSize: 12,
    color: '#374151',
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  financialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  financialItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  financialValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10b981',
  },
  financialLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
  metricCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  metricTitle: {
    fontSize: 16,
    color: '#374151',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  actionButton: {
    borderRadius: 16,
    marginTop: 8,
    shadowColor: '#1e40af',
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
});