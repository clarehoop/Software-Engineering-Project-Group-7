import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import Button from 'react-bootstrap/Button';
import styles from './button.module.css';


interface BaseButtonProps {
  children?: ReactNode;
  variant?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

function BaseButton({ children = 'Click to load', onClick, type = 'button' }: BaseButtonProps) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => {
    if (type === 'submit') return;
    setLoading(true);
    onClick?.();
  };

  return (
    <Button
      type={type}
      className = {styles.button}
      disabled={isLoading}
      onClick={!isLoading ? handleClick : undefined}
      style = {{whiteSpace: 'nowrap', position: 'relative'}}
    >
      <span style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        {children}
      </span>

      {isLoading && (
        <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Loading…
        </span>
      )}
    </Button>
  );
}

export default BaseButton


