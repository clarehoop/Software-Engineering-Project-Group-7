import { db } from '../firebase'
import { getDocs, collection, collectionGroup, doc, deleteDoc, addDoc, query, where, getDoc } from 'firebase/firestore'
import { Listing } from 'types/user'

// Returns all listings
export const getListings = async (): Promise<Listing[]> => {
  const snapshot = await getDocs(collectionGroup(db, 'listing'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }) as Listing);
};

// Returns listing with corresponding id - legacy function
{/*export const getListingById = async (id: string): Promise<Listing | null> => {
  const snapshot = await getDoc(doc(db, 'listings', id));
    if (!snapshot.exists()) return null;
  
    return {id: id, ...snapshot.data()} as Listing;
}*/}

export const getListingById = async (id: string): Promise<Listing | null> => {
  const snapshot = await getDocs(collectionGroup(db, 'listing'));
  const match = snapshot.docs.find(d => d.id === id);
  if (!match) return null;

  const derivedLandlordId = match.ref.parent.parent?.id;


  return {
    ...match.data(),
    id: match.id,
    landlordId: derivedLandlordId,
  } as Listing;
};

// Creates listings and returns said listing
export const createListing = async (
  userId: string,
  address: string,
  city: string | null,
  country: string | null,
  state: string | null,
  status: string | null,
  type: string | null,
  apt_num: string | null,
  description: string,
  lease_terms: string | null,
  roomates: Number | null,
  beds: Number,
  baths: Number,
  title: string,
  price: Number): Promise<Listing> => {
  const listing = {
    landlordId: userId,
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
    title: title,
    createdAt: new Date(),
    // coordinates: null, //new GeolocationCoordinates() // TODO Implement logic here or in page?? //Collins: throwing null until implemented
  } as Omit<Listing, 'id'>;

  const listRef = await addDoc(collection(db, 'users', userId, 'listings'), listing);

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

// Returns stored inquiries by landlord

// Still needs to be tested - Collins

export const getInquiriesByLandlord = async (landlordId: string) => {
  const q = query(
    collection(db, 'inquiries'),
    where('landlordId', '==', landlordId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
};

export const deleteListing = async (listingId: string): Promise<void> => {
  const snapshot = await getDocs(
    query(collectionGroup(db, 'listing'), where('id', '==', listingId))
  );

  if (snapshot.empty) throw new Error('Application not found.');

  await deleteDoc(snapshot.docs[0].ref);
}