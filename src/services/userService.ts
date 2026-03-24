import { db } from '../firebase'
import { collection, doc, getDoc, getDocs, addDoc } from 'firebase/firestore'
import { AppUser, Listing } from 'types/user'

// Returns a list of all users
export const getUsers = async (): Promise<AppUser[]> => {
  const snapshot = await getDocs(collection(db, 'users'));
  return Promise.all(snapshot.docs.map(async doc =>
    {
      const userListings = await getListings(doc.data().username);
      return {listings: userListings, ...doc.data()} as AppUser;
    })
  );
}

// Returns a list of one user
export const getUserById = async (userId: string): Promise<AppUser | null> => {
  const snapshot = await getDoc(doc(db, 'users', userId));
  if (!snapshot.exists()) return null;

  const userListings = await getListings(userId);
  return {listings: userListings, ...snapshot.data()} as AppUser;
}

export const getListings = async (userId: string): Promise<Listing[]> => {
  const snapshot = await getDocs(collection(db, 'users', userId, 'listings'));
  return snapshot.docs.map(doc => ({...doc.data()}) as Listing);
}

// Creates a user
export const createUser = async (user: AppUser): Promise<AppUser> => {
  const { listings, ...userData } = user;
  
  const userRef = await addDoc(collection(db, 'users'), userData);

  if (userData.is_landlord && listings?.length) {
    await Promise.all(listings.map(async listing => 
      addDoc(collection(db, 'users', userRef.id, 'listings'), listing)
    ));
  };

  return getUserById(userRef.id);
}

