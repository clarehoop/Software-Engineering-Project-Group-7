import {useEffect, useState } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../components/Button/button';
import FormTextComponent from '../components/Input-Text/input-text';
import './pages.css'; 

import styles from '../components/Card/card.module.css';

function PostListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', location: '', address: '',
    price: '', beds: '', baths: '',
    imageUrl: '', description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const listingsRef = collection(db, "listings");
      const docRef = await addDoc(listingsRef, {
        ...formData,
        price: Number(formData.price),
        beds: Number(formData.beds),
        baths: Number(formData.baths),
        location: formData.location.toLowerCase(),
        createdAt: new Date()
      });
      alert("Listing posted successfully!");
      navigate('/listings');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pageContent" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      
      {}
      <div className={styles.propertyCard} style={{ width: '100%', maxWidth: '600px', padding: '40px', cursor: 'default' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="headerText" style={{ fontSize: '2rem' }}>Post a Sublet</h1>
          <p className="subHeaderText">Fill out the details to reach students</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <FormTextComponent name="title" placeholder="Listing Title" onChange={handleChange} required backgroundColor="#FBF5F1" />
          <FormTextComponent name="location" placeholder="City (e.g. Clifton)" onChange={handleChange} required backgroundColor="#FBF5F1" />
          <FormTextComponent name="address" placeholder="Full Address" onChange={handleChange} required backgroundColor="#FBF5F1" />
          
          <div style={{ display: 'flex', gap: '1rem' }}>
             <FormTextComponent name="price" type="number" placeholder="Price" onChange={handleChange} required backgroundColor="#FBF5F1" />
             <FormTextComponent name="beds" type="number" placeholder="Beds" onChange={handleChange} required backgroundColor="#FBF5F1" />
          </div>

          <FormTextComponent name="imageUrl" placeholder="Image URL" onChange={handleChange} required backgroundColor="#FBF5F1" />

          {}
          <textarea 
            name="description" 
            placeholder="Description..." 
            onChange={handleChange} 
            required 
            style={{
                width: '100%', height: '120px', padding: '12px', 
                backgroundColor: '#FBF5F1', border: '1px solid #e0e0e0',
                fontFamily: 'inherit', color: '#543E32'
            }}
          />
          
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <BaseButton children="Submit Listing" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostListing;