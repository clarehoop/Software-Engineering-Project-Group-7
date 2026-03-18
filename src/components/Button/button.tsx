import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import Button from 'react-bootstrap/Button';

// Button component that accepts children and shows loading state while an API/request is loading
// Will need to be integrated with the actual APIs that we use

interface BaseButtonProps {
  children?: ReactNode;
  variant?: string;
  onClick?: () => void;
}

function BaseButton({ children = 'Click to load', variant = 'primary', onClick }: BaseButtonProps) {
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
    setLoading(true);
    onClick?.();
  };

  return (
    <Button
      variant={variant}
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


