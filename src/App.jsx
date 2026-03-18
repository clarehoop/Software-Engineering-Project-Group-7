import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import BaseButton from './components/Button/button'
import BaseCard from './components/Card/card'
import PropertyCard from './components/Card/property-card'
import InfoCard from './components/Card/info-card'  
import navBarStyles from './components/NavBar/navbar.module.css'
import styles from './components/Card/card.module.css';
import NavBar from './components/NavBar/navbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    /* Ignore for now, testing out components */
     
     <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div className ={navBarStyles.navBar}>
      <NavBar/>
      </div>
      <div className={styles.cardGrid} style ={{marginTop: '3.125rem'}}>
      <PropertyCard/>
      <PropertyCard/>
      <PropertyCard/>
      </div>
       <div className={styles.infoCardGrid}>
      <InfoCard/>
      <InfoCard

    image = "src/images/service.png"
    title = "Personalized Service"
    description = "This service was built by students, for students, by students, taking into account your needs and experiences."
      />
      <InfoCard

    image = "src/images/process.png"
    title = "Transparent Process"
    description = "Stay informed with our clear and honest approach to buying your home."
      />
      <InfoCard

    image = "src/images/exceptional-service.png"
    title = "Exceptional Support"
    description = "Providing peace of mind with our responsive and attentive customer service."
      />
      </div>

  </div>
  )
}

export default App
