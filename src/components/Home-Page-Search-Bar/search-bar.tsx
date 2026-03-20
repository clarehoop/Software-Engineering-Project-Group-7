import styles from './search-bar.module.css';
import DropdownComponent from '../Dropdown/dropdown';
import PriceRangeComponent from '../Input-Text/price-range';
import FormTextComponent from '../Input-Text/input-text';

function HomePageSearchBar() {
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
    icon="src/images/location.png"/>
    </div>
  </div>
  </div>
  );
}

export default HomePageSearchBar;