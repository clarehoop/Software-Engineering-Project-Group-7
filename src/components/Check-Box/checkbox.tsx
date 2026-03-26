import Form from 'react-bootstrap/Form';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (val: boolean) => void;
}

function Checkbox() {
  return (
    <>
      <Form.Check aria-label="Remember Me" />
    </>
  );
}

export default Checkbox;