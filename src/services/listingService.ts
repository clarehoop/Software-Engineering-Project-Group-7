import { db } from '../firebase'
import { getDocs, collection, collectionGroup, doc, getDoc, setDoc, addDoc } from 'firebase/firestore'
import { Listing } from 'types/user'

// Returns all listings
export const getListings = async (): Promise<Listing[]> => {
  const snapshot = await getDocs(collectionGroup(db, 'listings'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }) as Listing);
};

// Returns listing with corresponding id
export const getListingById = async (id: string): Promise<Listing | null> => {
  const snapshot = await getDoc(doc(db, 'listings', id));
    if (!snapshot.exists()) return null;
  
    return {id: id, ...snapshot.data()} as Listing;
}

// Creates listings and returns said listing
export const createListing = async (
  userId: string,
  address: string,
  city: string,
  country: string,
  state: string,
  status: string,
  type: string,
  apt_num: string,
  description: string,
  lease_terms: string,
  roomates: Number,
  beds: Number,
  baths: Number,
  price: Number): Promise<Listing> => {
  const listing = {
    address: address,
    city: city,
    country: country,
    state: state,
    status: status,
    type: type,
    apt_num: apt_num,
    description: description,
    lease_terms: lease_terms,
    roomates: roomates,
    beds: beds,
    baths: baths,
    price: price,
    coordinates: new GeolocationCoordinates() // TODO Implement logic here or in page??
  } as Omit<Listing, 'id'>;

  const listRef = await addDoc(collection(db, 'users', userId, 'listing'), listing);

  return getListingById(listRef.id);
};

// Returns all listings tied to specific user
export const getListingsByUser = async (userId: string): Promise<Listing[]> => {
  const snapshot = await getDocs(collection(db, 'users', userId, 'listings'));
  return snapshot.docs.map(doc => ({...doc.data()}) as Listing);
}

// Returns 3 Featured Listings
export const getFeaturedListings = async (): Promise<Listing[]> => {
  const listings = await getListings();
  // TODO for now returns 3 random listings
  const rand1 = Math.floor(Math.random() * listings.length);
  const rand2 = Math.floor(Math.random() * listings.length);
  const rand3 = Math.floor(Math.random() * listings.length);
  return [ listings[rand1], listings[rand2], listings[rand3] ];
};