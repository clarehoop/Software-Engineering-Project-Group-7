import FormTextComponent from '../components/Input-Text/input-text';
import Checkbox from '../components/Check-Box/checkbox';
import { useSignUp } from '../hooks/useSignUp';
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
    onValueChange={(val) => handleChange('username', val)}
    placeholder='User Name'
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
    color= 'rgba(0, 0, 0, 1)'/>

    <FormTextComponent
    value={form.password}
    onValueChange={(val) => handleChange('password', val)}
    placeholder='Password'
    type='password'
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
     color= 'rgba(0, 0, 0, 1)'/>

    <FormTextComponent
    value={form.confirmPassword}
    onValueChange={(val) => handleChange('confirmPassword', val)}
    placeholder='Confirm Password'
    type="password"
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
     color= 'rgba(0, 0, 0, 1)'/>

    <FormTextComponent
    placeholder='First Name'
    value={form.first_name}
    onValueChange={(val) => handleChange('first_name', val)}
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
     color= 'rgba(0, 0, 0, 1)'/>

    <FormTextComponent
    placeholder='Last Name'
    value={form.last_name}
    onValueChange={(val) => handleChange('last_name', val)}
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
    color= 'rgba(0, 0, 0, 1)'/>

    <FormTextComponent
    label="Date of Birth"
    value={form.date_of_birth}
    onValueChange={(val) => handleChange('date_of_birth', val)}
    placeholder='Date of Birth'
    type="date"
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
    color= 'rgba(0, 0, 0, 1)'/>

    <FormTextComponent
    placeholder='Email'
    value={form.email}
    onValueChange={(val) => handleChange('email', val)}
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
    color= 'rgba(0, 0, 0, 1)'/>

    <FormTextComponent
    placeholder='Phone Number'
    value={form.phone_num}
    onValueChange={(val) => handleChange('phone_num', val)}
    border = "1px solid #000000"
    borderRadius='0px'
    minHeight="5rem"
    color= 'rgba(0, 0, 0, 1)'/>

    <div className='userTypeRow'>
    <div className='rememberMe'>
    <Checkbox
    checked={form.is_student}
    onChange={(checked) => handleChange('is_student', checked)}/>
    <p className='signUpSubHeaderText'>Student</p>
    </div>
    <div className='rememberMe'>
    <Checkbox
    checked={form.is_landlord}
    onChange={(checked) => handleChange('is_landlord', checked)}/>
    <p className='signUpSubHeaderText'>Landlord</p>
    </div>
    </div>

    {error && <p className='errorText'>{error}</p>} {/*TODO add errorText*/}

    <section className='section'>
    <div className="signInButtonRow">
     <BaseButton onClick={handleSubmit} 
     children="Submit"/>
     <BaseButton onClick = {() => window.history.back()}
     children="Cancel"/> 
    </div>

    </section>
    
    </div>
  )

}
export default SignUp;