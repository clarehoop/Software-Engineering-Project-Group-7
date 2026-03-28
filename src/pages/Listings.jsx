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
        const subletsRef = collection(db, "listings");
        // Queries Firestore for documents where 'location' field matches
        const q = query(subletsRef, where("location", "==", locationQuery.toLowerCase()));
        
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

    if (locationQuery) fetchSublets();
  }, [locationQuery]);

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