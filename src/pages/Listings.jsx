import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collectionGroup, query, where, getDocs } from 'firebase/firestore';
import PropertyCard from '../components/Card/property-card';
import './pages.css';
import MapView from '../components/Map';

function Listings() {
  const [searchParams] = useSearchParams();
  const [sublets, setSublets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const locationQuery = searchParams.get('location');
  const typeQuery = searchParams.get('type');
  const priceQuery = searchParams.get('maxPrice');

  useEffect(() => {
    const fetchSublets = async () => {
      setLoading(true);
      try {
        const baseRef = collectionGroup(db, 'listing');
        let constraints = [];
  
        // Keep location and price filters in the Firestore query
        if (locationQuery) {
          constraints.push(where("location", "==", locationQuery));
        } 
        if (priceQuery) {
          constraints.push(where("price", "<=", Number(priceQuery)));
        }
  
        const q = query(baseRef, ...constraints);
        const querySnapshot = await getDocs(q);
        
        // Map the raw Firestore data to an array
        let results = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })); 
  
        // --- KEYWORD SEARCH LOGIC ---
        if (typeQuery && typeQuery.trim() !== "" && typeQuery !== "Type") {
          const keyword = typeQuery.toLowerCase();
          
          results = results.filter(sublet => {
            // Fallback to empty string if field is missing to avoid errors
            const title = (sublet.title || "").toLowerCase();
            const description = (sublet.description || "").toLowerCase();
            
            // Returns true if keyword exists in either the title OR the description
            return title.includes(keyword) || description.includes(keyword);
          });
        }
        // ----------------------------
  
        setSublets(results);
      } catch (error) {
        console.error("Firestore Error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSublets();
  }, [locationQuery, typeQuery, priceQuery]);
  const handleDeleted = (deletedId) => {
    setSublets(prev => prev.filter(s => s.id !== deletedId))
  };

  // Handle clicking into a specific sublet 
  const handleCardClick = (id) => {
    navigate(`/properties/${id}`);
  };

// Listings.jsx
return (
  <div className="pageContent listingsPage">
    <div className="splitView">
      {/* LEFT SIDE: SEARCH RESULTS */}
      <div className="resultsColumn">
        <h2>{sublets.length} {locationQuery ? `${locationQuery} ` : ""}Sublets</h2>
        
        {loading ? (
          <div className="loader">Searching Database...</div>
        ) : sublets.length === 0 ? (
          <p>No sublets found.</p>
        ) : (
          <div className="listingsGrid">
            {sublets.map((sublet) => (
              <div key={sublet.id}>
                <PropertyCard 
                  title={sublet.title}
                  price={`$${sublet.price}`}
                  address={sublet.address}
                  imageSrc={sublet.images && sublet.images.length > 0 ? sublet.images[0] : "src/images/example.png"}
                  beds={`${sublet.beds} Bed(s)`}
                  baths={`${sublet.baths} Bath(s)`}
                  propertyId={sublet.id}
                  onDeleted={handleDeleted}
                  showButton={false} 
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

export default Listings;