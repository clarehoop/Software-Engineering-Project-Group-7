import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/Home';
import PropertyPage from './pages/PropertyPage';
import Help from './pages/Help';
import SignIn from './pages/Sign-In';
import SignUp from './pages/Sign-Up';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetail';
import PostListing from './pages/PostListing';
import { AuthProvider } from './context/Auth';
import Inquiries from './pages/Inquiries';
import ProtectedRoute from './components/Protected-Route/Protected-Route';
import './App.css'; 
import LandlordRoute from './components/Protected-Route/Landlord-Route';


function App() {
  return(
    <AuthProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/properties/:propertyId" element={<PropertyPage />} />
        <Route path="/inquiries" element={<Inquiries />} />
        <Route path ="/sign-in" element ={<SignIn />}/>
        <Route path="/sign-up" element ={<SignUp />}/>
        <Route element={<ProtectedRoute />}>
        {/*<Route path="/property/:id" element={<PropertyDetail />} />*/}
        </Route>
        <Route path="/listings" element={<Listings />} />
        <Route element={<LandlordRoute />}>
        <Route path="/post" element={<PostListing />} />
        </Route>
        </Route>
    </Routes>
    </AuthProvider>
  )
}

export default App;
