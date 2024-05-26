import { getFirestore, Firestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { app } from '../auth/firebaseConfig'; // Adjust the path based on your project structure

const db: Firestore = getFirestore(app);

export const setRole = async (userId: string, role: string): Promise<void> => {
  try {
    await setDoc(doc(db, 'users', userId), { role });
  } catch (error) {
    console.error('Error setting role', error);
  }
};

export const getRole = async (userId: string): Promise<string | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? (userDoc.data()?.role as string) : null;
  } catch (error) {
    console.error('Error getting role', error);
    return null;
  }
};
