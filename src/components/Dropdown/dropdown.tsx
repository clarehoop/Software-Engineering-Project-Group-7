import Dropdown from 'react-bootstrap/Dropdown';
import styles from './dropdown.module.css';


function DropdownComponent() {
  return (
    <div className="bootstrap-scope">
    <Dropdown
    className = {`bootstrap-scope ${styles.container}`}>
      <Dropdown.Toggle id="dropdown">
        Type
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Apartment</Dropdown.Item>
        <Dropdown.Item href="#/action-2">House</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Other</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
  );
}

export default DropdownComponent;