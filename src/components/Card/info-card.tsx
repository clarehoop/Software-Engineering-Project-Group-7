import styles from './card.module.css';
import { ReactNode } from "react";  

interface InfoCardProps {
  image?:string;
  title?: ReactNode;
  description?: ReactNode;
}

function InfoCard({
    image = "src/images/platform.png",
    title = "Secure Platform",
    description = "Benefit from our highly robust and secure platform that allows you to focus on one thing—housing."

}: InfoCardProps) {
    return(
    
  
        <div className = {styles.infoCardContainer}>
        <div style ={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <img src ={image} className ={styles.largeMetaIcon} style ={{paddingLeft: "1.563rem"}}/>
        <div className={styles.infoCardTitle}>{title}</div>
        <div className={styles.infoCardText}>{description}</div>
        </div>

        </div>


    
    );
}
export default InfoCard;