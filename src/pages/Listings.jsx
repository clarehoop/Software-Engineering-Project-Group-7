import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import PropertyCard from '../components/Card/property-card';
import './pages.css';

function Listings() {
  const [searchParams] = useSearchParams();
  const [sublets, setSublets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const locationQuery = searchParams.get('location');

  useEffect(() => {
    const fetchSublets = async () => {
      setLoading(true);
      try {
        const listingsRef = collection(db, "listings");
        let q;
  
        if (locationQuery) {
          // 🔍 Search mode: Filter by location
          // Note: Make sure your DB casing matches (e.g., "Clifton" vs "clifton")
          q = query(listingsRef, where("location", "==", locationQuery));
        } else {
          // 🏠 Default mode: Show all listings
          q = query(listingsRef); 
        }
  
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
  }, [locationQuery]); // Still triggers if the user searches while on the page

  // Handle clicking into a specific sublet (Zillow style)
  const handleCardClick = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="pageContent listingsPage">
      <div className="resultsContainer">
        <h2>{sublets.length} Sublets in {locationQuery}</h2>
        
        {loading ? (
          <div className="loader">Searching Database...</div>
        ) : (
          <div className="listingsGrid">
            {sublets.map((sublet) => (
              <div key={sublet.id} onClick={() => handleCardClick(sublet.id)} style={{cursor: 'pointer'}}>
                <PropertyCard 
                  title={sublet.title}
                  price={sublet.price}
                  address={sublet.address}
                  image={sublet.imageUrl}
                  beds={sublet.beds}
                  baths={sublet.baths}
                  showButton={false} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* This is where your Map component will eventually go */}
      <div className="mapContainer">
        <p style={{textAlign: 'center', marginTop: '50%'}}>Map View Loading...</p>
      </div>
    </div>
  );
}

export default Listings;