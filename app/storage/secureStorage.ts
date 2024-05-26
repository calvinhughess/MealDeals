import * as SecureStore from 'expo-secure-store';

interface UserData {
  name: string;
  email: string;
  phone: string;
  password: string;
  preferences: string;
}

export const storeUserData = async (userData: UserData): Promise<void> => {
  try {
    await SecureStore.setItemAsync('user_data', JSON.stringify(userData));
  } catch (error) {
    console.error('Error storing data', error);
  }
};

export const getUserData = async (): Promise<UserData | null> => {
  try {
    const userData = await SecureStore.getItemAsync('user_data');
    if (userData) {
      return JSON.parse(userData) as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving data', error);
    return null;
  }
};
