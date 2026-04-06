import { Card } from "react-bootstrap";
import styles from './card.module.css';
import { ReactNode } from "react";

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
  location = "Clifton",
  description = "Would absolutely recommend this service again! I'm a visiting student from the The Ohio State University, who spent Summer 2025 as in intern in Cincinnati. This service was seamless! Super easy to navigate, contact a sublettor, and secure accomdation, supported by a safe and friendly platform.",
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