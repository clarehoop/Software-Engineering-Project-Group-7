import { Card } from "react-bootstrap";
import BaseButton from "../Button/button";
import { ReactNode } from "react";

interface BaseCardProps {
  title?: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  buttonText?: ReactNode;
  buttonVariant?: string;
  onButtonClick?: () => void;
}

function BaseCard({ 
  title = "Card Title", 
  description = "Some quick example text to build on the card title and make up the bulk of the card's content.",
  imageSrc = "holder.js/100px180",
  buttonText = "Go somewhere",
  buttonVariant = "primary",
  onButtonClick
}: BaseCardProps) {
  return (
    <Card style={{ width: '24rem', height: '33.375rem' }}>
      <Card.Img variant="top" src={imageSrc} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <BaseButton variant={buttonVariant} onClick={onButtonClick}>
          {buttonText}
        </BaseButton>
      </Card.Body>
    </Card>
  );
}

export default BaseCard;