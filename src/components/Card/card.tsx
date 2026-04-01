import { Card } from "react-bootstrap";
import BaseButton from "../Button/button";
import { ReactNode } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface BaseCardProps {
  title?: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  buttonText?: ReactNode;
  buttonVariant?: string;
  propertyId?: string;
  onButtonClick?: () => void;
}

function BaseCard({ 
  title = "Card Title", 
  description = "Some quick example text to build on the card title and make up the bulk of the card's content.",
  imageSrc = "holder.js/100px180",
  buttonText = "Go somewhere",
  buttonVariant = "primary",
  onButtonClick,
  propertyId,
}: BaseCardProps) {

  const navigate = useNavigate();

  const handleClick = () => {
    if (propertyId){
      navigate(`/properties/${propertyId}`);
    } else {
      onButtonClick?.();
    }
  }

  return (
    <Card>
      <Card.Img src={imageSrc} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <BaseButton variant={buttonVariant} onClick={handleClick}>
          {buttonText}
        </BaseButton>
      </Card.Body>
    </Card>
  );
}

export default BaseCard;