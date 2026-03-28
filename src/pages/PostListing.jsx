import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styles from '../components/Card/card.module.css';

function PostListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '', // Make sure they type "Clifton" or "Downtown"
    address: '',
    price: '',
    beds: '',
    baths: '',
    imageUrl: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ⚡️ This adds the data to your "listings" collection
      const docRef = await addDoc(collection(db, "listings"), {
        ...formData,
        price: Number(formData.price), // Ensure numbers stay numbers
        beds: Number(formData.beds),
        baths: Number(formData.baths),
        createdAt: new Date() // Good for sorting by "newest"
      });
      
      alert("Listing posted successfully!");
      navigate('/listings'); // Take them to see their new post
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error posting listing. Check console.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h2>Post a New Sublet</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="title" placeholder="Listing Title (e.g. Cozy Studio)" onChange={handleChange} required />
        <input name="location" placeholder="City/Neighborhood (e.g. Clifton)" onChange={handleChange} required />
        <input name="address" placeholder="Full Address" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price per Month" onChange={handleChange} required />
        <div className={styles.row}>
          <input name="beds" type="number" placeholder="Beds" onChange={handleChange} required />
          <input name="baths" type="number" placeholder="Baths" onChange={handleChange} required />
        </div>
        <input name="imageUrl" placeholder="Image URL (Link to a photo)" onChange={handleChange} required />
        <textarea name="description" placeholder="Describe the sublet..." onChange={handleChange} required />
        
        <button type="submit" className={styles.submitBtn}>Post Listing</button>
      </form>
    </div>
  );
}

export default PostListing;