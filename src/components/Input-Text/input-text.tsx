import Form from 'react-bootstrap/Form';
import styles from './input-text.module.css';
import { ReactNode } from 'react';

interface FormTextComponentProps {
  placeholder?: string;
  image?: ReactNode;
}
function FormTextComponent({
    placeholder = "Price Range"
}: FormTextComponentProps){
  return (
    <>
      <Form.Control placeholder={placeholder}
      className = {`bootstrap-scope ${styles.container}`}
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
      />
    </>
  );
}

export default FormTextComponent;