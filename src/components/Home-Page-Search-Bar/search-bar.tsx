import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import styles from './search-bar.module.css';
import DropdownComponent from '../Dropdown/dropdown';
import PriceRangeComponent from '../Input-Text/price-range';
import FormTextComponent from '../Input-Text/input-text';
import BaseButton from '../Button/button';

function HomePageSearchBar() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location.trim()) params.append('location', location);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (type) params.append('type', type);
    
    navigate(`/listings?${params.toString()}`);
    
  };
  return( 

  <div className={styles.container}>
    <div className={styles.contentContainer}>
        <div className={styles.item}>
    <DropdownComponent
    icon="src/images/type-icon.png"
    onSelect={(val) => setType(val)}
    />
    </div>
    <div className={styles.item}>
    <PriceRangeComponent
    icon='src/images/price-range-icon.png'
    onValueChange={(val) => setMaxPrice(val)}
    />
    </div>
    <div className={styles.item}>
    <FormTextComponent
    placeholder='Location'
    borderRadius="12px"
    icon="src/images/location.png"
    value={location}
    onValueChange={(val) => setLocation(val)}
    />
    </div>
    <BaseButton
      onClick={handleSearch}>
        Search
        </BaseButton>
      </div>
  </div>
 
  );
}

export default HomePageSearchBar;