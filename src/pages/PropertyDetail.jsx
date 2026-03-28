import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function PropertyDetail() {
  const { id } = useParams(); // Gets the ID from the URL (/property/ABC123)
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const docRef = doc(db, "listings", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProperty(docSnap.data());
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) return <div>Loading details...</div>;

  return (
    <div>
      <h1>{property.title}</h1>
      <img src={property.imageUrl} alt={property.title} />
      <p>{property.description}</p>
      {/* ... rest of your UI */}
    </div>
  );
}

export default PropertyDetail;