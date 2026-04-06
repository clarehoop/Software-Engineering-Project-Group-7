import { useState, useEffect } from "react";
import { collection, getDocs, query, where, collectionGroup } from "firebase/firestore";
import { db } from "../firebase";

interface Inquiry {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    number?: string;
    location?: string;
    description?: string;
    propertyId?: string;
    inquiryId?: string;
}

export function useInquiries(propertyId: string | null = null) {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchInquiries() {
            try {
                const colRef = collection(db, "inquiries");
                const q = propertyId
                    ? query(colRef, where("propertyId", "==", propertyId))
                    : query(colRef);

                const snapshot = await getDocs(q);

                const data: Inquiry[] = await Promise.all(
                    snapshot.docs.map(async (inquiryDoc) => {
                        const inquiry = { id: inquiryDoc.id, ...(inquiryDoc.data() as Omit<Inquiry, "id">) };

                        if (inquiry.propertyId) {
                            const listingSnap = await getDocs(collectionGroup(db, "listing"));

                            const matchingListing = listingSnap.docs.find(
                                d => d.id === inquiry.propertyId
                            );

                            if (matchingListing) {
                                inquiry.location = matchingListing.data().location;
                            }
                        }

                        return inquiry;
                    })
                );

                if (!cancelled) setInquiries(data);
            } catch (err) {
                if (!cancelled) setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchInquiries();
        return () => { cancelled = true; };
    }, [propertyId]);

    return { inquiries, loading, error };
}