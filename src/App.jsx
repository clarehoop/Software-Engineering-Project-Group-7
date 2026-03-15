import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import BaseButton from './components/Button/button'
import BaseCard from './components/Card/card'
import PropertyCard from './components/Card/property-card'
import InfoCard from './components/Card/info-card'
import styles from './components/Card/card.module.css';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    /* Ignore for now, testing out components */
     
     <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: "50px"}}>


      <div className={styles.cardGrid}>
      <PropertyCard/>
      <PropertyCard/>
      <PropertyCard/>
      </div>
       <div className={styles.infoCardGrid}>
      <InfoCard/>
      <InfoCard/>
      <InfoCard/>
      <InfoCard/>
      </div>

  </div>
  )
}

export default App
