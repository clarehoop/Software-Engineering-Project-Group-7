import BaseButton from '../components/Button/button';
import PropertyCard from '../components/Card/property-card'
import InfoCard from '../components/Card/info-card'  
import styles from '../components/Card/card.module.css';
import HomePageSearchBar from '../components/Home-Page-Search-Bar/search-bar';
import ReviewCard from '../components/Card/review-card';
import FormTextComponent from '../components/Input-Text/input-text';
import MapView from '../components/Map';
import useRedirect from '../hooks/useRedirect';
import'./pages.css'
import { useAuth } from '../context/Auth';
import { useEffect, useState } from 'react';
import { collectionGroup, getDocs, query, limit } from 'firebase/firestore';
import {db} from '../firebase';
import { getRandomListings } from '../services/listingService';

function Home(){
    const [mapListings, setMapListings] = useState([])
    const redirect = useRedirect();
    const { user } = useAuth();
    const [randomListings, setRandomListings] = useState([]);

    // To populate the home page property cards

    useEffect(() => {
      const loadRandom = async () => {
        try {
          const listings = await getRandomListings();
          setRandomListings(listings);
        } catch (error) {
          console.error("Error fetching random listings:", error);
        }
      };
      loadRandom();
    }, []);
    
    useEffect(() => {
      const fetchTopListings = async () => {
        try{
        const baseRef = collectionGroup(db, 'listing');
        const q = query(baseRef, limit(5));
        const snap = await getDocs(q);

        const listingData = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMapListings(listingData);

      }catch(error){
        console.error("Error fetching listings", error);
      }
      };
      fetchTopListings();
    }, []);

    return( 
      <div className = "pageContent" id="home">
      <section className = "section" style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
        <div className = "textContainer" style={{flex: 1}}>
        <h1 className = "headerText">Find a Sublet.<br />Today.</h1>
        <h2 className = "subHeaderText">Explore a list of student-listed sublets to <br />secure both short-term and semester long <br />housing.</h2>
          <div className='buttonRow'>
            {(user == null) && <BaseButton
            children = "Sign Up"
            onClick={()=> redirect("/sign-in")}/>}
            {user?.is_landlord && <BaseButton
            children = "Create a Listing"
            onClick={()=> redirect("/post")}/>}
          </div>
        
        <div style ={{marginTop: '1.125rem'}}>
        <HomePageSearchBar/>
        </div>
        </div>
      <div style={{
        flex: 1, 
        height: '400px',
        width: '100%', 
        borderRadius: '24px', 
        overflow: 'hidden', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginTop: '2rem'
      }}>
      <MapView listings={mapListings} />
          </div>
      </section>
<section className="section">
  <div className={styles.cardGrid} style={{ marginTop: '3.125rem' }}>
    {randomListings.map((sublet) => (
      <PropertyCard
        key={sublet.id}
        propertyId={sublet.id}
        title={sublet.title}
        price={`$${sublet.price}`}
        address={sublet.address}
        imageSrc={sublet.images?.length > 0 ? sublet.images[0] : "src/images/example.png"}
        beds={`${sublet.beds} Bed(s)`}
        baths={`${sublet.baths} Bath(s)`}
        showButton={user == null}
        onButtonClick={() => redirect("/sign-in")}
        allowDelete={false}
      />
    ))}
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
      description="This website seriously helped me out! Helped me secure housing for this upcoming Summer 2026 semester. Seamless, clean, and easy to use. Will certainly be considering this website for all sublet-related matters going forward!"
      review="src/images/four-and-half-star-review.png"
      headshot='src/images/review-michael-headshot.png'
      location='Clifton'/>
      <ReviewCard
      name="Emily Johnson"
      description="This website was a real life-saver. I recently just began my Masters at the University of Cincinnati, and considering the fact that I am from the West Coast, I wasn't initially sure where to live. Using this website, I was able to get a short-term sublet for the month, easing my fears and helping me get settled. Big thanks to this service for making it so simple and worry-free!"
      imageSrc='src/images/review-image-emily.png'
      headshot='src/images/review-emily-headshot.png'
      location="Clifton"/>
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