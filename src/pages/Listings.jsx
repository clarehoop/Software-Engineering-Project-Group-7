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
  
        if (locationQuery) {
          //Search mode: Filter by location, price, and type
          // Note: Make sure your DB casing matches (e.g., "Clifton" vs "clifton")
          constraints.push(where("location", "==", locationQuery));
        } 
        if (typeQuery && typeQuery !== "Type"){
          constraints.push(where("type", "==", typeQuery));
        }
        if (priceQuery){
          constraints.push(where("price", "<=", Number(priceQuery)));
        }
        const q = query(baseRef, ...constraints);
  
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })); 
        
        setSublets(results);
      } catch (error) {
        console.error("Firestore Error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSublets();
  }, [locationQuery, typeQuery, priceQuery]); // Still triggers if the user searches while on the page

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
              <div key={sublet.id} onClick={() => handleCardClick(sublet.id)}>
                <PropertyCard 
                title={sublet.title}
                price={`$${sublet.price}`}
                address={sublet.address}
                imageSrc={sublet.images && sublet.images.length > 0 ? sublet.images[0] : "src/images/example.png"}
                beds={`${sublet.beds} Bed(s)`}
                baths={`${sublet.baths} Bath(s)`}
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