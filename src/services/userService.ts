import { db } from '../firebase'
import { collection, doc, getDoc, getDocs, addDoc, deleteDoc } from 'firebase/firestore'
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
export const createUser = async (
  username: string,
  password: string,
  first_name: string,
  last_name: string,
  date_of_birth: Date,
  email: string,
  phone_num: string,
  is_landlord: Boolean,
  is_admin: Boolean,
  date_created: Date): Promise<AppUser> => {
  const user = {
    username: username,
    password: password,
    first_name: first_name,
    last_name: last_name,
    date_of_birth: date_of_birth,
    email: email,
    phone_num: phone_num,
    is_landlord: is_landlord,
    is_admin: is_admin,
    date_created: date_created,
  } as AppUser;
  
  const userRef = await addDoc(collection(db, 'users'), user);

  return getUserById(userRef.id);
}

// Deletes a user and all its listings
export const removeUserById = async (userId: string): Promise<void> => {
  const user = await getUserById(userId);
  
  if (user.listings?.length) {
    await Promise.all(user.listings.map(listing => {
      deleteDoc(doc(db, 'users', userId, 'listings', listing.id))
    }))
  }

  const userSnapshot = await deleteDoc(doc(db, 'users', userId));
}
