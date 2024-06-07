import React, { useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DealsContext, Deal } from '../context/DealsContext';
import DealModal from './DealModal';

const DealDetailsScreen: React.FC = () => {
  const { deals, claimDeal } = useContext(DealsContext);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setModalVisible(true);
  };

  const handleClaimDeal = (dealId: string) => {
    claimDeal(dealId);
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: Deal }) => (
    <TouchableOpacity style={styles.dealContainer} onPress={() => handleSelectDeal(item)}>
      {item.isClaimed && (
        <View style={styles.overlay}>
          <Image source={require('../../assets/images/checkmark.png')} style={styles.checkmark} />
        </View>
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.restaurant}>Restaurant: {item.restaurant}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={deals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      {selectedDeal && (
        <DealModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          deal={selectedDeal}
          onClaimDeal={handleClaimDeal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
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
});

export default DealDetailsScreen;
