import { db } from '../auth/firebaseConfig';
import { getUserData } from './secureStorageUtils'; // The file where SecureStore functions are
import { doc, setDoc } from 'firebase/firestore'; // Import the necessary Firestore functions

export const syncUserDataToFirestore = async (userId: string): Promise<void> => {
  try {
    const userData = await getUserData();
    if (userData) {
      const userDocRef = doc(db, 'users', userId);
      await setDoc(userDocRef, userData, { merge: true });
      console.log('User data synced to Firestore');
    } else {
      console.log('No user data found in local storage');
    }
  } catch (error) {
    console.error('Error syncing user data to Firestore', error);
  }
};
