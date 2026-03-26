import { Form } from 'react-router-dom';
import FormTextComponent from '../components/Input-Text/input-text';
import Checkbox from '../components/Check-Box/checkbox';
import { useSignUp } from 'hooks/useSignUp';
import'./pages.css'
import BaseButton from '../components/Button/button';

function SignUp() {

  const {form, handleChange, handleSubmit, loading, error } = useSignUp();

  return (
    <div className="pageContent signUpPage">
    <section className="section">
    <div className="textContainer">
    <p className="headerText">We just need some information to get started...</p>
    <p className="subHeaderText">Once you fill this out, log in, and enjoy your account!</p>
    </div>
    <div className="inputGroup">
    </div>

    </section>

    <FormTextComponent
    value={form.username}
    onChange={(val) => handleChange('username', val)}
    placeholder='User Name'
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
    color= 'rgba(0, 0, 0, 0.6)'/>

    <FormTextComponent
    value={form.password}
    onChange={(val) => handleChange('password', val)}
    placeholder='Password'
    type='password'
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
    color= 'rgba(0, 0, 0, 0.6)'/>

    <FormTextComponent
    value={form.confirmPassword}
    onChange={(val) => handleChange('confirmPassword', val)}
    placeholder='Confirm Password'
    type="password"
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
    color= 'rgba(0, 0, 0, 0.6)'/>

    <FormTextComponent
    placeholder='First Name'
    value={form.first_name}
    onChange={(val) => handleChange('first_name', val)}
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
    color= 'rgba(0, 0, 0, 0.6)'/>

    <FormTextComponent
    placeholder='Last Name'
    value={form.first_name}
    onChange={(val) => handleChange('last_name', val)}
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
    color= 'rgba(0, 0, 0, 0.6)'/>

    <FormTextComponent
    label="Date of Birth"
    value={form.date_of_birth}
    onChange={(val) => handleChange('last_name', val)}
    placeholder='Date of Birth'
    type="date"
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
    color= 'rgba(0, 0, 0, 0.6)'/>

    <FormTextComponent
    placeholder='Email'
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
    color= 'rgba(0, 0, 0, 0.6)'/>

    <FormTextComponent
    placeholder='Phone Number'
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
    color= 'rgba(0, 0, 0, 0.6)'/>

    <div className='userTypeRow'>
    <div className='rememberMe'>
    <Checkbox/>
    <p className='signUpSubHeaderText'>Student</p>
    </div>
    <div className='rememberMe'>
    <Checkbox/>
    <p className='signUpSubHeaderText'>Landlord</p>
    </div>
    </div>
    <section className='section'>
    <div className="signInButtonRow">
     <BaseButton
     children="Submit"/>
     <BaseButton
     children="Cancel"/> 
    </div>

    </section>
    
    </div>
  )

}
export default SignUp;