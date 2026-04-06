import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collectionGroup, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import PropertyCard from '../components/Card/property-card';
import MapView from '../components/Map';
import './pages.css';

function Admin() {
  const [searchParams] = useSearchParams();
  const [sublets, setSublets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const locationQuery = searchParams.get('location');

  useEffect(() => {
    const fetchSublets = async () => {
      setLoading(true);
      try {
        // We use collectionGroup to find all 'listing' subcollections across all users
        const baseRef = collectionGroup(db, 'listing');
        let constraints = [];
  
        if (locationQuery) {
          constraints.push(where("location", "==", locationQuery.toLowerCase()));
        }

        const q = query(baseRef, ...constraints);
        const querySnapshot = await getDocs(q);
        
        const results = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          // Store the full path so we know exactly which user/listing to delete
          docPath: doc.ref.path 
        })); 
        
        setSublets(results);
      } catch (error) {
        console.error("Firestore Error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSublets();
  }, [locationQuery]);

  // Function to handle deletion
  const handleDelete = async (e, docPath, id) => {
    // IMPORTANT: Prevents the PropertyCard's onClick (navigate) from firing
    e.stopPropagation();

    const confirmDelete = window.confirm("Are you sure you want to delete this listing permanently?");
    if (!confirmDelete) return;

    try {
      // Delete from Firestore using the stored path
      await deleteDoc(doc(db, docPath));
      
      // Update UI: remove the deleted item from the local state array
      setSublets(prev => prev.filter(item => item.id !== id));
      alert("Listing removed successfully.");
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Error deleting listing. Check console for details.");
    }
  };

  const handleCardClick = (id) => {
    navigate(`/properties/${id}`);
  };

  return (
    <div className="pageContent listingsPage">
      <div style={{ padding: '20px', backgroundColor: '#fdeaea', textAlign: 'center', marginBottom: '20px', borderRadius: '8px' }}>
        <h2 style={{ color: '#d32f2f', margin: 0 }}>Admin Management Mode</h2>
        <p style={{ margin: 0 }}>You have authority to remove listings from the database.</p>
      </div>

      <div className="splitView">
        {/* LEFT SIDE: SEARCH RESULTS */}
        <div className="resultsColumn">
          <h2>{sublets.length} Total Active Sublets</h2>
          
          {loading ? (
            <div className="loader">Accessing Secure Database...</div>
          ) : sublets.length === 0 ? (
            <p>No sublets currently in the system.</p>
          ) : (
            <div className="listingsGrid">
              {sublets.map((sublet) => (
                <div key={sublet.id} onClick={() => handleCardClick(sublet.id)}>
                  <PropertyCard 
                    title={sublet.title}
                    price={`$${sublet.price}`}
                    address={sublet.address}
                    imageSrc={sublet.images && sublet.images.length > 0 ? sublet.images[0] : "src/images/example.png"}
                    beds={`${sublet.beds} Bed(s)`}
                    baths={`${sublet.baths} Bath(s)`}
                    
                    /* Admin Specific Props */
                    showButton={true}
                    buttonText="DELETE LISTING"
                    buttonVariant="danger" // Ensure your BaseButton handles a "danger" variant (red)
                    onButtonClick={(e) => handleDelete(e, sublet.docPath, sublet.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE: THE MAP */}
        <div className="mapStickyContainer">
          <MapView listings={sublets} />
        </div>
      </div>
    </div>
  );
}

export default Admin;