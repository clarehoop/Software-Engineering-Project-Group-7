import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/Home';
import Contact from './pages/Listings';
import About from './pages/About';
import Help from './pages/Help';
import SignIn from './pages/Sign-In';
import Listings from './pages/Listings';
import './App.css';

function App() {
  return(
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path ="/sign-in" element ={<SignIn />}/>
        </Route>
    </Routes>
  )
}

export default App;
