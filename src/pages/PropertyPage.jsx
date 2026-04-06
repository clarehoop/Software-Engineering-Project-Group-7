// Using to testing the individual listing page
import { useState, useEffect } from "react";
import FormTextComponent from "../components/Input-Text/input-text";
import BaseButton from "../components/Button/button";
import { useSendInquiry } from "../hooks/useSendInquiry";
import { getListingById, getInquiriesByLandlord } from "../services/listingService";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
// Images
import locationIcon from '../images/location.png'
import arrowIcon from '../images/arrow_icon.png'
import reverseArrowIcon from '../images/reverse-arrow.png'


function PropertyPage(){

  const { propertyId } = useParams();
  const location = useLocation();
  const passedListing = location.state?.listing ?? null;
  const [listing, setListing] = useState(passedListing);
  const { form, handleChange, handleSubmit, loading, error, success } = useSendInquiry();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (passedListing||!propertyId) return;
    const fetchListing = async () => {
      try{
      const data = await getListingById(propertyId);
      setListing(data);

      if(data?.landlordId){
        const inquiries = await getInquiriesByLandlord(data.landlordId);
      }
    } catch (err) {
      console.error('Failed to fetch listing:', err);
    }
    };
    fetchListing();
  }, [propertyId]);


  return (
    <div className= "pageContent">
    <section className="section">
    <div className="textContainer">
    <h1 className="headerText">{listing?.title ?? "Loading..."}</h1>
    <div className="locationRow">
    <img src={locationIcon}/>
    <h2 className="subHeaderText">{listing?.location}</h2>
    </div>
    </div>
    </section>
    <section className="section">
      {/* Thumbnail image section */}
    <div className="imageContainer">
    <div className="imageSelector" style={{display: 'flex', gap: '8px', overflowX: 'auto'}}>
      {listing?.images?.map((img, index) => (
        <img
        key={index}
        src={img}
        onClick={() => setCurrentIndex(index)}
        style={{
          width: '60px',
          height: '60px',
          objectFit: 'cover',
          cursor: 'pointer',
          opacity: currentIndex === index ? 1:0.5,
          border: currentIndex === index ? '2px solid black' : 'none'
        }}
        />
      ))}
    </div>  
    {/* Main Image */}
    <img src={listing?.images?.[currentIndex]} style ={{width: '100%', objectFit: 'cover'}} />
    
    {/* Arrow Button */}
    <div style ={{display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px'}}>
    <div className="arrowButton" onClick={() => setCurrentIndex(i => Math.max(0,i-1))}>
      <img src={arrowIcon}/>
    </div>
    <div className="arrowButton arrowButton--reverse" onClick={() => setCurrentIndex(i => Math.min(listing.images.length - 1, i + 1))}>
      <img src={arrowIcon} />
    </div>
    </div>
    

    </div>
    </section>
    <section className="section">
    <div className="textContainer textContainer--center">
    <h1 className="subHeaderText subHeaderText--nonBold">
    {listing?.description}
    </h1>

    </div>
    </section>

    <section>
    <div className="rowSection">
    <div className="textContainer--propertyDesc">
    <div className="headerText headerText--inquiryPage">
    <h1>Interested?</h1> 
    </div>
    <div className="subHeaderText subHeaderText--nonBold-noLine">
    Interested in this property? Fill out the form below, and the owner of the property
    will get back to you with more details, 
    including scheduling a viewing, answering any questions, and helping you secure this property.  
    </div>
    </div>
    <div className="inputFormContainer" style={{gap: '50px', marginTop: "25px"}}>
    <div className="inputRow">
    <FormTextComponent
    backgroundColor="#FBF5F1"
    placeholder="First Name"
    borderRadius="12px"
    height="50px"
    border="1px solid #000000"
    value={form.firstName}
    onValueChange={(val) => handleChange('firstName', val)}
    />
    <FormTextComponent 
    backgroundColor="#FBF5F1"
    placeholder="Last Name"
    borderRadius="12px"
    height="50px"
    border="1px solid #000000"
    value={form.lastName}
    onValueChange={(val) => handleChange('lastName', val)}/>
    </div>
    <div className="inputRow">
    <FormTextComponent
    backgroundColor="#FBF5F1"
    placeholder="Email"
    borderRadius="12px"
    height="50px"
    border="1px solid #000000"
    value={form.email}
    onValueChange={(val) => handleChange('email', val)}
    />
    <FormTextComponent
    backgroundColor="#FBF5F1"
    placeholder="Phone Number"
    borderRadius="12px"
    height="50px"
    border="1px solid #000000" 
    value={form.phoneNumber}
    onValueChange={(val) => handleChange('phoneNumber', val)}/>
    </div>
    <FormTextComponent
    backgroundColor="#FBF5F1"
    placeholder="Leave a brief message"
    borderRadius="12px"
    multiline
    rows={5}
    height="100px"
    border="1px solid #000000"
    value={form.message}
    onValueChange={(val) => handleChange('message', val)}/>
  </div>
    </div>
    <BaseButton
    children="Submit"
    onClick={() => {
  console.log('listing state at click:', listing);
  console.log('listing.id:', listing?.id);
  console.log('listing.landlordId:', listing?.landlordId);
  handleSubmit({
    propertyId: listing?.id,
    landlordId: listing?.landlordId
  });
}}/>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {success && <p style={{ color: 'green' }}>Inquiry sent successfully!</p>}
    </section>
    






    </div>
  
  )
}
  export default PropertyPage;