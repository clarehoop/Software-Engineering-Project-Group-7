import {useEffect, useState} from 'react';
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
      <p><strong>Description: </strong>{property.description}</p>
      <p><strong>Address: </strong>{property.address}</p>
      <p><strong>Price: </strong>{property.price}</p>
      <p><strong>Baths: </strong>{property.baths}</p>
      <p><strong>Beds: </strong>{property.beds}</p>
    </div>
  );
}

export default PropertyDetail;