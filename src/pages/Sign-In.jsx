import { Form } from 'react-router-dom';
import FormTextComponent from '../components/Input-Text/input-text';
import PropertyCard from '../components/Card/property-card';
import Checkbox from '../components/Check-Box/checkbox';
import'./pages.css'

import * as UserService from 'services/userService'; // Example service import

async function SignIn() {
  const users = await UserService.getUsers(); // Example service function call
  users;

  return (
    <div className="pageContent signInPage">
    <section className="section">
    <section className="rowSection">
    <div className="textContainer">
    <h1 className="headerText">Don't wait to get your sublet...</h1>
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
    <div style ={{display: 'flex', justifyContent: 'space-between',opacity: '60%', gap: '0.75rem'}}>
    <div style={{display: 'flex', flexDirection: 'row', gap: '0.25rem', alignItems: 'center'}}>
    <Checkbox/>
    <p>Remember Me</p>
    </div>
    <p>Forgot Password?</p>
    </div>
    </div>
    <div style= {{display: 'flex',width: '100%', alignItems: 'center', flexDirection: 'column', gap: '2.5rem'}}>
    <PropertyCard
    showButton={false}/>
    <p className="signUpSubHeaderText" style={{opacity: '60%'}}>Hurry! Don't miss out on this sublet!</p>
    </div>
    </section>
    </section>



    </div>
  )
}
export default SignIn;