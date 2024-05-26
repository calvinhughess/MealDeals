import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface StepPreferencesProps {
  formData: {
    preferences: string[];
  };
  handleChange: (key: keyof { preferences: string[] }, value: string[]) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const restaurants = [
  { name: 'McDonalds', logo: require('../../assets/logos/mcdonalds.png') },
  { name: 'Chipotle', logo: require('../../assets/logos/chipotle.png') },
  { name: 'Taco Bell', logo: require('../../assets/logos/tacobell.png') },
  { name: 'Chick fil A', logo: require('../../assets/logos/chickfila.png') },
  { name: 'Little Blue Menu', logo: require('../../assets/logos/littlebluemenu.png') },
  { name: 'Panda Express', logo: require('../../assets/logos/pandaexpress.png') },
  { name: 'Five Guys', logo: require('../../assets/logos/fiveguys.png') },
  { name: '&Pizza', logo: require('../../assets/logos/andpizza.png') },
];

const StepPreferences: React.FC<StepPreferencesProps> = ({ formData, handleChange, handleNext, handleBack }) => {
  const toggleRestaurant = (restaurant: string) => {
    const preferences = [...formData.preferences];
    const index = preferences.indexOf(restaurant);
    if (index > -1) {
      preferences.splice(index, 1);
    } else {
      preferences.push(restaurant);
    }
    handleChange('preferences', preferences);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.box}>
          <Text style={styles.title}>Select your favorite restaurants 🍔</Text>
          <View style={styles.grid}>
            {restaurants.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.name}
                style={[
                  styles.restaurantBox,
                  formData.preferences.includes(restaurant.name) && styles.selectedRestaurantBox,
                ]}
                onPress={() => toggleRestaurant(restaurant.name)}
              >
                <Image source={restaurant.logo} style={styles.logo} />
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonBack]} onPress={handleBack}>
              <Text style={[styles.buttonText, styles.textBack]}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red', // Red background
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  restaurantBox: {
    width: '45%',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  selectedRestaurantBox: {
    backgroundColor: 'lightgreen',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Center align the text for better appearance
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '45%',
  },
  buttonBack: {
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textBack: {
    color: 'red',
  },
});

export default StepPreferences;
