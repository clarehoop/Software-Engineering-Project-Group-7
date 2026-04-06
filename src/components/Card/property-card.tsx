import styles from './card.module.css';
import { Card } from "react-bootstrap";
import BaseButton from "../Button/button";
import { ReactNode, useState } from "react";  
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import { deleteListing } from '../../services/listingService';

interface BaseCardProps {
  title?: ReactNode;
  rooms?: ReactNode;
  beds?: ReactNode;
  baths?: ReactNode;
  sqFeet?: ReactNode;
  imageSrc?: string;
  price?: ReactNode;
  locationIcon?: string;
  sqftIcon?: string;
  bathIcon?: string;
  roomsIcon?: string;
  buttonText?: ReactNode;
  buttonVariant?: string;
  showButton?: boolean;
  onButtonClick?: () => void;
  propertyId?: string;
  onDeleted?: (id: string) => void;
}

function PropertyCard({ 
  title = "2222 Euclid Avenue", 
  beds = "2 Baths",
  baths = "3 baths",
  sqFeet = "3,500 sq ft",
  imageSrc = "src/images/example.png",
  buttonText = "Sign Up",
  price = "$2,500,000",
  sqftIcon = "src/images/size.png",
  roomsIcon = "src/images/rooms.png",
  bathIcon = "src/images/bath-icon.jpg",
  locationIcon = "src/images/location.png",
  buttonVariant = "primary",
  showButton = true,
  onButtonClick,
  propertyId,
  onDeleted
}: BaseCardProps) {

  const navigate = useNavigate();
  const { user } = useAuth();

  console.log('Auth user:', user);
  console.log('is_admin value:', user?.is_admin);

  const isAdmin = user?.is_admin === true;

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    if (propertyId) {
      navigate(`/properties/${propertyId}`);
    } else {
      onButtonClick?.();
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handleConfirmDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!propertyId) return;

    setDeleting(true);
    setError(null);

    try {
      await deleteListing(propertyId);
      setShowConfirm(false);
      onDeleted?.(propertyId);
    } catch (err: any) {
      setError('Failed to delete listing. Please try again.')
    } finally {
      setDeleting(false);
    }
  };

    const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(false);
    setError(null);
  };

  return (
    <>
    {/* Confirmation Screen */}
    {showConfirm && (
      <div
      onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050,
          }}
          >

          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >

            <h5 style={{ margin: 0, fontWeight: 700 }}>Delete Listing?</h5>
            <p style={{ margin: 0, color: '#555' }}>
              Are you sure you want to delete <strong>{title}</strong>? This action cannot be undone.
              </p>
              {error && (
              <p style={{ color: '#dc3545', margin: 0, fontSize: '0.875rem' }}>{error}</p>
            )}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={handleCancelDelete}
                disabled={deleting}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  background: '#f8f9fa',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#dc3545',
                  color: '#fff',
                  cursor: deleting ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  opacity: deleting ? 0.7 : 1,
                }}
              >
              {deleting ? 'Deleting...' : 'Delete'}
              </button>
          </div>   
          </div>
          </div>
    )}

    {/* Property Card */}

    <Card className = {styles.PropertyCardContainer} onClick={handleClick} style ={{cursor: 'pointer', position: 'relative'}}>


      {/* Delete Button */}
      {isAdmin && propertyId && (
          <button
            onClick={handleDeleteClick}
            title="Delete listing"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              zIndex: 10,
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(220, 53, 69, 0.9)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 700,
              lineHeight: 1,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
              transition: 'background-color 0.15s ease, transform 0.1s ease',
            }}
             onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(185, 28, 28, 1)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(220, 53, 69, 0.9)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            ✕
          </button>
      )}


      <Card.Img variant="top" src={imageSrc} className = {styles.PropertyCardImage} />
      <Card.Body style ={{display: "flex", flexDirection: "column", gap: "0px"}}>
        <div style ={{display: 'flex',padding: '0.625rem'}}>
          <div style ={{display: 'flex', gap: '0.625rem', alignItems: 'center'}}> 
          <img src={locationIcon} className ={styles.metaIcon}/>
        <Card.Title className = {styles.PropertyCardTitle}>{title}</Card.Title>
        </div>
        </div>
        <div style ={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: '0.8rem', paddingLeft: '0.8rem'}}>
        <div style ={{display: 'flex', gap: '0.4rem', alignItems: 'center'}}>
        <Card.Text className = {styles.PropertyCardText}>{price}</Card.Text>
        </div>
        <div style ={{display: 'flex', gap: '0.4rem', alignItems: 'center'}}>
        <img src={roomsIcon} className={styles.metaIcon}/>
        <Card.Text className = {styles.PropertyCardText}>{beds}</Card.Text>
        </div>
        <div style ={{display: 'flex', gap: '0.4rem', alignItems: 'center', paddingRight: '0.625rem'}}>
        <img src={bathIcon} className={styles.metaIcon}/>
        <Card.Text className = {styles.PropertyCardText}>{baths}</Card.Text>
        </div>
        </div>
        <div style ={{display: 'flex', alignItems: 'center', paddingLeft: '0.625rem', paddingRight: '0.625rem', justifyContent: 'space-between'}}>
          {showButton && (
        <BaseButton variant={buttonVariant} onClick={onButtonClick}>
          {buttonText}
        </BaseButton>
          )}
        
        </div>
      </Card.Body>
    </Card>

    </>
  );
}   

export default PropertyCard;