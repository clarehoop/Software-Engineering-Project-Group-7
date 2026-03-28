import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import styles from './search-bar.module.css';
import DropdownComponent from '../Dropdown/dropdown';
import PriceRangeComponent from '../Input-Text/price-range';
import FormTextComponent from '../Input-Text/input-text';
import BaseButton from '../Button/button';

function HomePageSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchTerm.trim()){
      navigate(`/listings?location=${searchTerm}`);
    }
  };
  return( 

  <div className={styles.container}>
    <div className={styles.contentContainer}>
        <div className={styles.item}>
    <DropdownComponent
    icon="src/images/type-icon.png"/>
    </div>
    <div className={styles.item}>
    <PriceRangeComponent
    icon='src/images/price-range-icon.png'
    />
    </div>
    <div className={styles.item}>
    <FormTextComponent
    placeholder='Location'
    borderRadius="12px"
    icon="src/images/location.png"
    value={searchTerm}
    onChange={(e)=> setSearchTerm(e.target.value)}
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