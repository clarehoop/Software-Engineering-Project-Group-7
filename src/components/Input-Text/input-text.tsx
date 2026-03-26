import Form from 'react-bootstrap/Form';
import styles from './input-text.module.css';

import { ReactNode, useState } from 'react';

interface FormTextComponentProps {
  placeholder?: string;
  image?: ReactNode;
  icon?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  border?: string;
  minHeight?: string;
  textOpacity?: string;
  type?: string;
  label?: string;
  fontWeight?: string;
  value?: string;
  onChange?: (val: string) => void;
}



function FormTextComponent({
    placeholder = "Price Range",
    image,
    icon,
    color,
    backgroundColor,
    borderRadius = "0px",
    width = "100%",
    height = 'auto',
    border,
    minHeight,
    type,
    label,
}: FormTextComponentProps){

  const [dateValue, setDateValue] = useState('');
  const [dateFocused, setDateFocused] = useState(false);


  return (
   <div style={{position: 'relative', display: 'inline-flex', width, height, overflow: 'visible'}}>


    {type === 'date' && label && !dateValue && !dateFocused && (
        <span style={{
          position: 'absolute',
          left: '0.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 1,
          fontWeight: 'bold',         
          fontSize: '1rem',
          color: color ?? '#000',
        }}>
          {label}
        </span>
      )}


    {/* Styling the container */}
      
      <Form.Control placeholder={placeholder}
      className = {`bootstrap-scope ${styles.container}`}
        type={type}
        value={type === 'date' ? dateValue : undefined}        
        onChange={e => { if (type === 'date') setDateValue(e.target.value); }}
        onFocus={() => { if (type === 'date') setDateFocused(true); }}
        onBlur={() => { if (type === 'date') setDateFocused(false); }}
        style={{
          "--input-color": color,
          "--input-bg": backgroundColor,
          height: "100%",
          width: "100%",
          paddingRight: icon ? '2.5rem' : undefined,
          color: type == 'date' && !dateValue ? 'transparent': undefined,
          boxSizing: 'border-box',
          border,
          borderRadius,
          minHeight
        } as React.CSSProperties}
      />

      {/* Styling the icon */}

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