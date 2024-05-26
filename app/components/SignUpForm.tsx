import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StepName from './StepName';
import StepEmail from './StepEmail';
import StepPhone from './StepPhone';
import StepPassword from './StepPassword';
import StepPreferences from './StepPreferences';
import { validateEmail, validatePhone, sanitizeInput } from '../utils/validation';

type RestaurantName = 'McDonalds' | 'Chipotle' | 'TacoBell' | 'ChickFilA' | 'LittleBlueMenu' | 'PandaExpress' | 'FiveGuys' | 'andPizza';

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  preferences: RestaurantName[];
}

const SignUpForm: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    preferences: [],
  });

  const handleNext = (): void => {
    if (step === 0 && !formData.name) {
      alert('Name is required');
      return;
    }
    if (step === 1 && !validateEmail(formData.email)) {
      alert('Invalid email');
      return;
    }
    if (step === 2 && !validatePhone(formData.phone)) {
      alert('Invalid phone number');
      return;
    }
  
    if (step === 4) {
    // Navigate to the home screen after the last step
      navigation.navigate('AppNavigator');
      return;
    }
    setStep(step + 1);
  };

  const handleBack = (): void => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigation.navigate('Welcome');
    }
  };

  const handleChange = (key: keyof FormData, value: any): void => {
    if (key === 'preferences') {
      setFormData({ ...formData, [key]: value.map((item: RestaurantName) => sanitizeInput(item)) });
    } else {
      const sanitizedValue = sanitizeInput(value, key === 'email' ? 'email' : undefined);
      setFormData({ ...formData, [key]: sanitizedValue });
    }
  };

  const steps = [
    <StepName key="name" formData={formData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />,
    <StepEmail key="email" formData={formData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />,
    <StepPhone key="phone" formData={formData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />,
    <StepPassword key="password" formData={formData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />,
    <StepPreferences key="preferences" formData={formData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />,
  ];

  return (
    <View style={styles.container}>
      {steps[step]}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SignUpForm;
