import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';

const WelcomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ImageBackground source={require('../../assets/images/background.png')} style={styles.background}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.slantedBackground} />
          <View style={styles.box}>
            <Text style={styles.title}>Welcome to MealDeals! 🍟</Text>
            <Text style={styles.subtitle}>Do you have an account with us? 🤔</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonYes]}
                onPress={() => navigation.navigate('SignIn')}
              >
                <Text style={[styles.buttonText, styles.textYes]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonNo]}
                onPress={() => navigation.navigate('SignUpForm')}
              >
                <Text style={[styles.buttonText, styles.textNo]}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slantedBackground: {
    position: 'absolute',
    top: '10%', // Adjust this to change the start position of the slant
    left: 0,
    right: 0,
    height: 550, // Adjust this to change the height of the slant
    backgroundColor: '#fff',
    transform: [{ skewY: '-10deg' }],
    zIndex: -1, // Ensure this stays behind the box
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

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
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    marginVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonYes: {
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 2,
  },
  buttonNo: {
    backgroundColor: 'red',
    
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textYes: {
    color: 'red',
  },
  textNo: {
    color: 'white',
  },
});

export default WelcomeScreen;
