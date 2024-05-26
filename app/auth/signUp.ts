import { Auth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

const signUp = async (email: string, password: string): Promise<void> => {
  try {
    if (password.length < 8) {
      throw new Error('Password should be at least 8 characters');
    }
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) { // Using any type to handle the error type
    console.error(error.message);
  }
};

export default signUp;
