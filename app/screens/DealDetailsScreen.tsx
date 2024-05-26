// app/screens/DealDetailsScreen.tsx
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DealsContext, Deal } from '../context/DealsContext';

const DealDetailsScreen: React.FC = () => {
  const { deals, claimDeal } = useContext(DealsContext);

  const renderItem = ({ item }: { item: Deal }) => (
    <View style={styles.dealContainer}>
      {item.isClaimed && (
        <View style={styles.overlay}>
          <Image source={require('../../assets/images/checkmark.png')} style={styles.checkmark} />
        </View>
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.restaurant}>Restaurant: {item.restaurant}</Text>
      {!item.isClaimed && (
        <TouchableOpacity
          style={styles.claimButton}
          onPress={() => claimDeal(item.id)}
        >
          <Text style={styles.claimButtonText}>Claim Deal</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <FlatList
      data={deals}
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
    position: 'relative', // Required for overlay positioning
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 255, 0, 0.5)', // Green overlay with opacity
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  checkmark: {
    width: 50,
    height: 50,
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
  claimButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  claimButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DealDetailsScreen;
