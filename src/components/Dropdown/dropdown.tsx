import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './dropdown.module.css';

interface DropdownComponentProps {
  icon?: string;
}


function DropdownComponent({
    icon
}: DropdownComponentProps){
    const [selected, setSelected] = useState('Type');
  return (
    <div style={{position: 'relative', display: 'inline-block', width: '100%'}}>
    <div className="bootstrap-scope">
    <Dropdown
    className = {`bootstrap-scope ${styles.container}`}>
      <Dropdown.Toggle id="dropdown">
        {selected}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>(setSelected('Apartment'))}>Apartment</Dropdown.Item>
        <Dropdown.Item  onClick={()=>(setSelected('House'))}>House</Dropdown.Item>
        <Dropdown.Item  onClick={()=>(setSelected('Other'))}>Other</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
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
  </div>
  );
}

export default DropdownComponent;