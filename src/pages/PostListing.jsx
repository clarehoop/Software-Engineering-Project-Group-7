import {useState } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../components/Button/button';
import FormTextComponent from '../components/Input-Text/input-text';
import { useAuth } from '../context/Auth';
import './pages.css'; 

import styles from '../components/Card/card.module.css';


// TO-DO: Refactor this code to use css classes for styling & modularize functions for improved readability 
// TO-DO:  Apply constraints on each input form (i.e price range for price field, location constraints for address form, etc)



// Image & file size cap

const MAX_IMAGES = 4;
const MAX_FILE_SIZE_KB = 200;

function PostListing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', location: '', address: '',
    price: '', beds: '', baths: '',
    description: ''
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imageError, setImageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Convert file to base 64 & store base64 string in firebase

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    })

  const handleImageChange = async (e) => {
    setImageError('');
    const selected = Array.from(e.target.files);
  
    const totalAfterAdd = imageFiles.length + selected.length;
    if (totalAfterAdd > MAX_IMAGES) {
      setImageError(`You can upload a maximum of ${MAX_IMAGES} images.`);
      e.target.value = '';
      return;
    }

    for (const file of selected) {
      if (!file.type.startsWith('image/')) {
        setImageError(`"${file.name}" is not a valid image file.`);
        e.target.value = '';
        return;
      }

      if (file.size > MAX_FILE_SIZE_KB * 1024) {
        setImageError(`"${file.name}" exceeds the ${MAX_FILE_SIZE_KB} size limit.`);
        e.target.value = '';
        return;
      }
    }

    // Function to convert to base64 and generate preview URLs

    const newEntries = await Promise.all(
      selected.map(async (file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
        base64: await fileToBase64(file),
      }))
    );

    setImageFiles((prev) => [...prev, ...newEntries]);
    e.target.value = '';
  };

  const removeImage = (index) => {
    setImageFiles((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const base64Images = imageFiles.map((img) => img.base64);
    console.log('number of images:', base64Images.length);
console.log('total size KB:', JSON.stringify(base64Images).length / 1024);
base64Images.forEach((img, i) => console.log(`image ${i} size KB:`, img.length / 1024));
    console.log(user)
    if (!user){
      alert('Must be logged in to post a listing.');
      return;
    }
    if (imageFiles.length === 0) {
      setImageError('Please upload at least one image');
      return;
    }
    setIsSubmitting(true);

    try {
      const listingsRef = collection(db, "users", user.uid, "listing");
      const docRef = await addDoc(listingsRef, {
        ...formData,
        price: Number(formData.price),
        beds: Number(formData.beds),
        baths: Number(formData.baths),
        location: formData.location.toLowerCase(),
        images: imageFiles.map((img) => img.base64),
        createdAt: new Date()
      });
      alert("Listing posted successfully!");
      navigate('/');
    } catch (error) {
      console.error("Error:", error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
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
          <FormTextComponent name="title" placeholder="Listing Title" value={formData.title} onChange={handleChange} required backgroundColor="#FBF5F1" />
          <FormTextComponent name="location" placeholder="City (e.g. Clifton)" value={formData.location} onChange={handleChange} required backgroundColor="#FBF5F1" />
          <FormTextComponent name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} required backgroundColor="#FBF5F1" />
          
          <div style={{ display: 'flex', gap: '1rem' }}>
             <FormTextComponent name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required backgroundColor="#FBF5F1" />
             <FormTextComponent name="beds" type="number" placeholder="Beds" value={formData.beds} onChange={handleChange} required backgroundColor="#FBF5F1" />
          </div>

          <div>
            <label
            htmlFor="imageUpload"
            style ={{
              display: 'block', marginBottom: '0.5rem',
              fontSize: '0.875rem', color: '#543E32'
            }}
            >
              Photos (max {MAX_IMAGES}, each under {MAX_FILE_SIZE_KB}KB)
            </label>
            <input
            id="imageUpload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            disabled={imageFiles.length >= MAX_IMAGES}
            style={{
              width: '100%', padding: '8px',
              backgroundColor: '#FBF5F1', border: '1px solid #e0e0e0',
              color: '#543E32', cursor: 'pointer'
            }}/>

            {imageError && (
              <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.25rem' }}>{imageError}</p>
            )}

            {/* Image Previews */}
            {imageFiles.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                {imageFiles.map((img, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img
                      src={img.previewUrl}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: '100px', height: '100px',
                        objectFit: 'cover', border: '1px solid #e0e0e0'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      style={{
                        position: 'absolute', top: '2px', right: '2px',
                        background: 'rgba(0,0,0,0.55)', color: '#fff',
                        border: 'none', borderRadius: '50%',
                        width: '20px', height: '20px',
                        fontSize: '0.7rem', cursor: 'pointer',
                        lineHeight: '20px', textAlign: 'center', padding: 0
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

            
          {}
          <textarea 
            name="description" 
            placeholder="Description..."
            value={formData.description} 
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