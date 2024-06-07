import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

interface DealModalProps {
  visible: boolean;
  onClose: () => void;
  deal: {
    id: string;
    title: string;
    description: string;
    isClaimed: boolean;
  };
  onClaimDeal: (dealId: string) => void;
}

const DealModal: React.FC<DealModalProps> = ({ visible, onClose, deal, onClaimDeal }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{deal.title}</Text>
          <Text style={styles.description}>{deal.description}</Text>
          <TouchableOpacity
            style={[styles.button, deal.isClaimed ? styles.buttonClaimed : styles.buttonClaim]}
            onPress={() => onClaimDeal(deal.id)}
          >
            <Text style={styles.buttonText}>{deal.isClaimed ? 'Claimed' : 'Claim Deal'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonClaim: {
    backgroundColor: 'green',
  },
  buttonClaimed: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DealModal;
