import { Form } from 'react-router-dom';
import FormTextComponent from '../components/Input-Text/input-text';
import PropertyCard from '../components/Card/property-card';
import Checkbox from '../components/Check-Box/checkbox';
import'./pages.css'
import useRedirect from '../hooks/useRedirect';
import * as UserService from '../services/userService'; // Example service import
import BaseButton from '../components/Button/button';
import { useAuth } from '../context/Auth';
import { useState } from 'react';
import { useEffect } from 'react';
import { collectionGroup, getDocs, query, limit } from 'firebase/firestore';
import {db} from '../firebase';
import { getRandomListings } from '../services/listingService';


function SignIn() {

const {user, setUser} = useAuth();
const redirect = useRedirect();

// States for credentials & error feedback

const [email, setEmail] = useState(localStorage.getItem('rememberedEmail') || '');
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const [loading, setLoading] = useState(false);
const [rememberMe, setRememberMe] = useState(false);
const [randomListings, setRandomListings] = useState(null);

useEffect(() => {
  const loadRandom = async () => {
    try {
      const listings = await getRandomListings();
      if (listings && listings.length > 0){
        setRandomListings(listings[0]);
      }
    } catch (error) {
      console.error("Error fetching random listings:", error);
    }
  };
  loadRandom();
}, []);

const handleSignIn = async () => {
  setError(null);
  setLoading(true);
  const user = await UserService.signInUser(email, password);
  setLoading(false);

  if (user) {
    redirect('/')
    setUser(user)
    if (rememberMe) localStorage.setItem('rememberedEmail', email);
    else localStorage.removeItem('rememberedEmail');
  } else {
    setError('Incorrect email or password. Please try again')
  }
}

{/*const users = await UserService.getUsers(); // Example service function call
  users;*/}

  return (
    <div className="pageContent signInPage">
    <section className="section">
    <section className="rowSection">
    <div className="textContainer">
    <h1 className="headerText">Don't wait to get your sublet...</h1>
    <div className="inputGroup">
    <p className="signUpSubHeaderText" style={{opacity: '60%'}}>Welcome back! Please login to your account.</p>    
    <div className="inputFormContainer">

    <FormTextComponent
    placeholder='Email'
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
    type="email"
    value={email}
    onValueChange={setEmail}
    />

    <FormTextComponent
    placeholder='Password'
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
    type="password"
    value={password}
    onValueChange={setPassword}
    />
    </div>

    {error && (
      <p style={{color: 'red', fontSize:'0.875rem'}}>{error}</p>
    )}

    <div className='rememberForgotRow'>
    <div className='rememberMe'>
    <Checkbox
    onChange={setRememberMe}/>
    <p className='signUpSubHeaderText'>Remember Me</p>
    </div>
    <p className='signUpSubHeaderText'>Forgot Password?</p>
    </div>
    <div className="signInButtonRow">
    <BaseButton

    onClick={handleSignIn}
    disabled={loading}
    >
      {loading ? 'Signing in...': 'Sign In'}
    </BaseButton>

    <BaseButton
    children="Sign Up"
    onClick={()=> redirect("/sign-up")}/>
    </div>
    </div>
    </div>

    <div className='cardContainer'>
    {randomListings ? (
      <PropertyCard
        key={randomListings.id}
        propertyId={randomListings.id}
        title={randomListings.title}
        price={`$${randomListings.price}`}
        address={randomListings.address}
        imageSrc={randomListings.images?.length > 0 ? randomListings.images[0] : "src/images/example.png"}
        beds={`${randomListings.beds} Bed(s)`}
        baths={`${randomListings.baths} Bath(s)`}
        showButton={user == null}
        onButtonClick={() => redirect("/sign-in")}
        allowDelete={false}
    />
    ):(<p> Loading Featured Sublet...</p>)}
    <p className="signUpSubHeaderText">Hurry! Don't miss out on this sublet!</p>
    </div>
    </section>
    </section>



    </div>
  )
}
export default SignIn;