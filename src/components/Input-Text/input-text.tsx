import Form from 'react-bootstrap/Form';
import styles from './input-text.module.css';

import { ReactNode, useState } from 'react';

interface FormTextComponentProps {
  name?: string;
  placeholder?: string;
  image?: ReactNode;
  icon?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  width?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  height?: string;
  border?: string;
  minHeight?: string;
  textOpacity?: string;
  type?: string;
  label?: string;
  fontWeight?: string;
}

function FormTextComponent({
  name,
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
  value,
  onChange,
  onValueChange
}: FormTextComponentProps) {

  const isDate = type === 'date';

  const [isFocused, setIsFocused] = useState(false);

  const resolvedType = type === 'date' && !isFocused && !value ? 'text' : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  onChange?.(e);
  onValueChange?.(e.target.value); 
};

  return (
    <div style={{ position: 'relative', display: 'inline-flex', width, height, overflow: 'visible' }}>
      <Form.Control
        name={name}
        placeholder={placeholder}
        className={`bootstrap-scope ${styles.container}`}
        type={resolvedType}
        value={value ?? ''}
        onChange={handleChange}
        onFocus={()=>{
          if (type === 'date') setIsFocused(true);
        }}
        onBlur={()=> {
          if (type === 'date' && !value) setIsFocused(false);
        }}
        style={{
          "--input-color": color,
          "--input-bg": backgroundColor,
          height: "100%",
          width: "100%",
          paddingRight: icon ? '2.5rem' : undefined,
          boxSizing: 'border-box',
          border,
          borderRadius,
          minHeight,
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