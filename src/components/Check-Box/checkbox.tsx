import Form from 'react-bootstrap/Form';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (val: boolean) => void;
}

function Checkbox({ checked, onChange}: CheckboxProps) {
  return (
    <>
      <Form.Check aria-label="Remember Me" 
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
      />
    </>
  );
}

export default Checkbox;