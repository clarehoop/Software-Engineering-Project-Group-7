import Form from 'react-bootstrap/Form';
import styles from './input-text.module.css';
import { ReactNode } from 'react';

interface FormTextComponentProps {
  placeholder?: string;
  image?: ReactNode;
  icon?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
}
function FormTextComponent({
    placeholder = "Price Range",
    image,
    icon,
    color,
    backgroundColor,
    borderRadius = "12px",
    width = "100%",
    height = 'auto'
}: FormTextComponentProps){
  return (
   <div style={{position: 'relative', display: 'inline-flex', width, height, overflow: 'visible'}}>
      <Form.Control placeholder={placeholder}
      className = {`bootstrap-scope ${styles.container}`}
        type="text"
        style={{
          "--input-color": color,
          "--input-bg": backgroundColor,
          height: "100%",
          width: "100%",
          paddingRight: icon ? '2.5rem' : undefined
        } as React.CSSProperties}
      />
      {icon && (
        <div style={{
          position: 'absolute',
          right: '0.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}>
          <img src={icon} width={16} height={16} />
    </div>
      )}
    </div>
  );
}

export default FormTextComponent;