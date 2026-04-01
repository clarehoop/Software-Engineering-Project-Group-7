import styles from './card.module.css';
import { Card } from "react-bootstrap";
import BaseButton from "../Button/button";
import { ReactNode } from "react";  
import { Navigate, useNavigate } from 'react-router-dom';

interface BaseCardProps {
  title?: ReactNode;
  rooms?: ReactNode;
  sqFeet?: ReactNode;
  imageSrc?: string;
  price?: ReactNode;
  locationIcon?: string;
  sqftIcon?: string;
  roomsIcon?: string;
  buttonText?: ReactNode;
  buttonVariant?: string;
  showButton?: boolean;
  onButtonClick?: () => void;
  propertyId?: string;
}

function PropertyCard({ 
  title = "2222 Euclid Avenue", 
  rooms = "4 Rooms",
  sqFeet = "3,500 sq ft",
  imageSrc = "src/images/example.png",
  buttonText = "Sign Up",
  price = "$2,500,000",
  sqftIcon = "src/images/size.png",
  roomsIcon = "src/images/rooms.png",
  locationIcon = "src/images/location.png",
  buttonVariant = "primary",
  showButton = true,
  onButtonClick,
  propertyId
}: BaseCardProps) {

  const navigate = useNavigate();

  const handleClick = () => {
    if (propertyId) {
      navigate(`/properties/${propertyId}`);
    } else {
      onButtonClick?.();
    }
  };

  return (
    <Card className = {styles.PropertyCardContainer} onClick={handleClick} style ={{cursor: 'pointer'}}>
      <Card.Img variant="top" src={imageSrc} className = {styles.PropertyCardImage} />
      <Card.Body style ={{display: "flex", flexDirection: "column", gap: "0px"}}>
        <div style ={{display: 'flex',padding: '0.625rem'}}>
          <div style ={{display: 'flex', gap: '0.625rem', alignItems: 'center'}}> 
          <img src={locationIcon} className ={styles.metaIcon}/>
        <Card.Title className = {styles.PropertyCardTitle}>{title}</Card.Title>
        </div>
        </div>
        <div style ={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: '0.625rem', paddingLeft: '0.625rem'}}>
        <div style ={{display: 'flex', gap: '0.625rem', alignItems: 'center'}}>
        <img src={roomsIcon} className={styles.metaIcon}/>
        <Card.Text className = {styles.PropertyCardText}>{rooms}</Card.Text>
        </div>
        <div style ={{display: 'flex', gap: '0.625rem', alignItems: 'center', paddingRight: '0.625rem'}}>
        <img src={sqftIcon} className={styles.metaIcon}/>
        <Card.Text className = {styles.PropertyCardText}>{sqFeet}</Card.Text>
        </div>
        </div>
        <div style ={{display: 'flex', alignItems: 'center', paddingLeft: '0.625rem', paddingRight: '0.625rem', justifyContent: 'space-between'}}>
          {showButton && (
        <BaseButton variant={buttonVariant} onClick={onButtonClick}>
          {buttonText}
        </BaseButton>
          )}
        <div style ={{marginLeft: 'auto'}}>
        <Card.Text className = {styles.PropertyCardText}>{price}</Card.Text>
        </div>
        </div>
      </Card.Body>
    </Card>
  );
}   

export default PropertyCard;