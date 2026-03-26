import { Form } from 'react-router-dom';
import FormTextComponent from '../components/Input-Text/input-text';
import PropertyCard from '../components/Card/property-card';
import Checkbox from '../components/Check-Box/checkbox';
import'./pages.css'
import useRedirect from '../hooks/useRedirect';
import * as UserService from '../services/userService'; // Example service import
import BaseButton from '../components/Button/button';


function SignIn() {

const redirect = useRedirect();

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
    placeholder='User Name'
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"/>

    <FormTextComponent
    placeholder='Password'
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"/>
    </div>
    <div className='rememberForgotRow'>
    <div className='rememberMe'>
    <Checkbox/>
    <p className='signUpSubHeaderText'>Remember Me</p>
    </div>
    <p className='signUpSubHeaderText'>Forgot Password?</p>
    </div>
    <div className="signInButtonRow">
    <BaseButton
    children="Sign In"/>
    <BaseButton
    children="Sign Up"
    onClick={()=> redirect("/sign-up")}/>
    </div>
    </div>
    </div>

    <div className='cardContainer'>
    <PropertyCard
    showButton={false}/>
    <p className="signUpSubHeaderText">Hurry! Don't miss out on this sublet!</p>
    </div>
    </section>
    </section>



    </div>
  )
}
export default SignIn;