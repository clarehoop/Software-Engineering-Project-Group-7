import { useState, useRef, useEffect } from 'react';

function SearchButton(){
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);


      useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    return (
    <div ref={containerRef} style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src="src/images/navbar-search.png"
        alt="Search"
        onClick={() => setIsOpen(prev => !prev)}
        style={{ cursor: 'pointer' }}
      />
      {isOpen && (
        <input
          type="text"
          placeholder="Search..."
          autoFocus
          style={{ marginLeft: '8px' }}
        />
      )}
    </div>
  );
}

export default SearchButton;



