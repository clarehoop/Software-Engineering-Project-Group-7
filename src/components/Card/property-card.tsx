import styles from './card.module.css';
import { Card } from "react-bootstrap";
import BaseButton from "../Button/button";
import { ReactNode } from "react";  

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
  onButtonClick?: () => void;
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
  onButtonClick
}: BaseCardProps) {
  return (
    <Card className = {styles.PropertyCardContainer}>
      <Card.Img variant="top" src={imageSrc} className = {styles.propertyCardImage} />
      <Card.Body style ={{display: "flex", flexDirection: "column", gap: "0px"}}>
        <div style ={{display: 'flex',padding: '0.625rem'}}>
          <div style ={{display: 'flex', gap: '0.625rem', alignItems: 'center'}}> 
          <img src={locationIcon} className ={styles.metaIcon}/>
        <Card.Title className = {styles.PropertyCardTitle}>{title}</Card.Title>
        </div>
        </div>
        <div style ={{display: 'flex', flexDirection: 'row', gap: '6.25rem', paddingLeft: '0.625rem'}}>
        <div style ={{display: 'flex', gap: '0.625rem', alignItems: 'center'}}>
        <img src={roomsIcon} className={styles.metaIcon}/>
        <Card.Text className = {styles.PropertyCardText}>{rooms}</Card.Text>
        </div>
        <div style ={{display: 'flex', gap: '0.625rem', alignItems: 'center'}}>
        <img src={sqftIcon} className={styles.metaIcon}/>
        <Card.Text className = {styles.PropertyCardText}>{sqFeet}</Card.Text>
        </div>
        </div>
        <div style ={{display: 'flex', alignItems: 'center', paddingLeft: '0.625rem', flexDirection: "row", gap: "150px", paddingRight: '0.625rem'}}>
        <BaseButton variant={buttonVariant} onClick={onButtonClick}>
          {buttonText}
        </BaseButton>
        <div style ={{marginLeft: 'auto'}}>
        <Card.Text className = {styles.PropertyCardText}>{price}</Card.Text>
        </div>
        </div>
      </Card.Body>
    </Card>
  );
}   

export default PropertyCard;