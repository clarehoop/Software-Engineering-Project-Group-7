import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/Home';
import About from './pages/About';
import Help from './pages/Help';
import SignIn from './pages/Sign-In';
import SignUp from './pages/Sign-Up';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetail';
import PostListing from './pages/PostListing';
import { AuthProvider } from './context/Auth';
import './App.css'; 

function App() {
  return(
    <AuthProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path ="/sign-in" element ={<SignIn />}/>
        <Route path="/sign-up" element ={<SignUp />}/>
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/post" element={<PostListing />} />
        </Route>
    </Routes>
    </AuthProvider>
  )
}

export default App;
