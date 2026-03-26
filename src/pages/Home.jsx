import BaseButton from '../components/Button/button';
import PropertyCard from '../components/Card/property-card'
import InfoCard from '../components/Card/info-card'  
import styles from '../components/Card/card.module.css';
import HomePageSearchBar from '../components/Home-Page-Search-Bar/search-bar';
import ReviewCard from '../components/Card/review-card';
import FormTextComponent from '../components/Input-Text/input-text';
import useRedirect from '../hooks/useRedirect';
import'./pages.css'

function Home(){

    const redirect = useRedirect();

    return( 
      <div className = "pageContent" id="home">
      <section className = "section">
      <div className = "textContainer">
      <h1 className = "headerText">Find a Sublet.<br />Today.</h1>
      <h2 className = "subHeaderText">Explore a list of student-listed sublets to <br />secure both short-term and semester long <br />housing.</h2>
      <BaseButton
      children = "Sign Up"
      onClick={()=> redirect("/sign-in")}/>
      </div>
      <div style ={{marginTop: '2.5rem'}}>
      <HomePageSearchBar/>
      </div>
      </section>
      <section className = "section">
      <div className={styles.cardGrid} style ={{marginTop: '3.125rem'}}>
      <PropertyCard/>
      <PropertyCard/>
      <PropertyCard/>
      </div>
      </section>  

      <section className = "section" style={{display: 'flex', flexDirection: 'column',gap: '3.75rem'}}>
        <div style={{textAlign: 'center'}}>
        <h1 className="headerText">Why Choose Us</h1>
        <h2 className="subHeaderText">Ensuring your subletting experience, whether subleaser or <br />sublease, is seamless, secure, and stress-free.</h2>
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
      </section>
      <section className="section">
      <div style={{textAlign: 'center'}}>
      <h1 className="headerText">What People Say</h1>
      </div>
      <div className={styles.cardGrid}>
      <ReviewCard/>
      <ReviewCard
      name="Michael Rodriguez"
      imageSrc="src/images/review-image-michael.png"
      review="src/images/four-and-half-star-review.png"
      headshot='src/images/review-michael-headshot.png'
      location='San Diego'/>
      <ReviewCard
      name="Emily Johnson"
      imageSrc='src/images/review-image-emily.png'
      headshot='src/images/review-emily-headshot.png'
      location="Los Angeles"/>
      </div>

      </section>
      <section className="section" style = {{textAlign:'center'}}>
        <h1 className="headerText">Do You Have Any Questions? <br />Get Help From Us</h1>
        <div style={{margin: "100px"}}>
        <div style ={{display: 'flex',justifyContent: "center", margin: '0 auto ', gap: '1.125rem'}}>
        <FormTextComponent
        backgroundColor="#FBF5F1"
        placeholder='Enter your email address...'
        color='#543E32'
        borderRadius='0'
        width='35%'
        height='50px'
        icon="src/images/email.png"/>
        <BaseButton
        children="Submit"/>
        </div>
        </div>
      </section>
      </div>
    );
}

export default Home;