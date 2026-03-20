import { Card } from "react-bootstrap";
import styles from './card.module.css';
import { ReactNode } from "react";

/* TO-DO: Format text for Card & work on responsiveness (mobile) */

interface ReviewCardProps {
  name?: ReactNode;
  location?: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  review?: string;
  headshot?: string;
}

function ReviewCard({ 
  name = "Sarah Nguyen", 
  location = "San Francisco",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  imageSrc = "src/images/review-image-sarah.png",
  review ="src/images/five-star-review.png",
  headshot="src/images/review-sarah-headshot.png"
}: ReviewCardProps) {
  return (
   <Card className={`bootstrap-scope ${styles.ReviewCardContainer}`}>
      <Card.Img variant="top" src={imageSrc} className={styles.ReviewCardImage} />
      <Card.Body style={{padding: '1rem'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.125rem'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem',justifyContent: 'space-between'}}>
          <img src={headshot} width={48} height={48} style={{ borderRadius: '50%', objectFit: 'cover'}}/>
          <div style={{display:'flex', flexDirection:'column',gap:'0.25rem',flex:'1'}}>
        <Card.Title>{name}</Card.Title>
        <Card.Title>{location}</Card.Title>
        </div>
        <img src={review} width={50} height={24}/>
        </div>
        </div>
        <Card.Text>{description}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ReviewCard;