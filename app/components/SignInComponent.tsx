// components/SignInComponent.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const SignInComponent: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Handle sign-in logic here
    console.log('Sign in with', email, password);
    navigation.navigate('AppNavigator'); // Navigate to the main app
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.box}>
          <Text style={styles.title}>Sign In to MealDeals</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSignIn]}
              onPress={handleSignIn}
            >
              <Text style={[styles.buttonText, styles.textSignIn]}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonBack]}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.buttonText, styles.textBack]}>Back</Text>
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
    backgroundColor: '#fff', // Static background color
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
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
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
  buttonSignIn: {
    backgroundColor: 'red',
  },
  buttonBack: {
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textSignIn: {
    color: 'white',
  },
  textBack: {
    color: 'red',
  },
});

export default SignInComponent;
