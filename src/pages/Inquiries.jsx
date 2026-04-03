import { useInquiries } from "../hooks/useInquiries";
import InquiryCard from "../components/Inquiry-Card/InquiryCard";

function Inquiries() {

  const{inquiries, loading, error} = useInquiries();

  return (
    <div className="pageContent">
    <section className="section">
    <div className="textContainer">
    <h1 className="headerText">View Property Inquiries</h1>
    </div> 
    </section>

    {loading && <p>Loading inquiries...</p>}
    {error && <p>Error: {error}</p>}

    {!loading && !error && inquiries.length === 0 && 
    (<p>No inquiries found.</p>)
    }
    {inquiries.map((inquiry, index) => (
      <InquiryCard key={inquiry.id} inquiry={inquiry} index={index + 1} />
      ))}
    
    </div>
  )
}
export default Inquiries;