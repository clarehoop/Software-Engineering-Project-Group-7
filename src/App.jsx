import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Help from './pages/Help';
import './App.css';

function App() {
  return(
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        </Route>
    </Routes>
  )
}

export default App;
