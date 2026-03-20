import Form from 'react-bootstrap/Form';
import styles from './input-text.module.css';
import { useState } from 'react';
import { ReactNode } from 'react';

interface PriceRangeComponentProps {
  placeholder?: string;
  image?: ReactNode;
  icon?: string;
}
function PriceRangeComponent({
    placeholder = "Price Range",
    image,
    icon
}: PriceRangeComponentProps){
  const [value, setValue] = useState('');

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/[^0-9]/g, '');
    const formatted = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        setValue(digits ? `$${formatted}` : '');
   };

  return (
    <div style={{position: 'relative', display: 'inline-block', width: '100%'}}>
      <Form.Control placeholder={placeholder}
      className = {`bootstrap-scope ${styles.container}`}
        type="text"
        value={value}
        onChange={handleChange}
      />
      {icon && (
        <div style={{
          position: 'absolute',
          right: '0.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none'
        }}>
          <img src={icon} width={16} height={16} />
    </div>
      )}
      </div>
  );
}

export default PriceRangeComponent;