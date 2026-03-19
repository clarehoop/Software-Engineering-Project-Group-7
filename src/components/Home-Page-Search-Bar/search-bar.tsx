import styles from './search-bar.module.css';
import DropdownComponent from '../Dropdown/dropdown';
import FormTextComponent from '../Input-Text/input-text';

function HomePageSearchBar() {
  return( 

  <div className={styles.container}>
    <div className={styles.contentContainer}>
        <div className={styles.item}>
    <DropdownComponent/>
    </div>
    <div className={styles.item}>
    <FormTextComponent/>
    </div>
    <div className={styles.item}>
    <FormTextComponent
    placeholder='Location'/>
    </div>
  </div>
  </div>
  );
}

export default HomePageSearchBar;