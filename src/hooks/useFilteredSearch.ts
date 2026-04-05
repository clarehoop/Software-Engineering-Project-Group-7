import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const useFilteredSearch = () => {

  const fetchListings = async ({ location, maxPrice, subletType }: {
    location: string;
    maxPrice: string;
    subletType: string;
  }) => {
    let constraints = [];

    // TODO: Add subletType

    if (maxPrice) {
      constraints.push(where("price", "<=", Number(maxPrice)));
    }

    if (location.trim()) {
      constraints.push(where("location", "==", location.trim()));
    }

    const q = query(collection(db, "listings"), ...constraints);
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  return { fetchListings };
};
