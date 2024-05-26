// app/screens/ClaimedDealsScreen.tsx
import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { DealsContext, Deal } from '../context/DealsContext';

const ClaimedDealsScreen: React.FC = () => {
  const { claimedDeals } = useContext(DealsContext);

  const renderItem = ({ item }: { item: Deal }) => (
    <View style={styles.dealContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.restaurant}>Restaurant: {item.restaurant}</Text>
    </View>
  );

  return (
    <FlatList
      data={claimedDeals}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  dealContainer: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 10,
  },
  restaurant: {
    fontStyle: 'italic',
  },
});

export default ClaimedDealsScreen;
