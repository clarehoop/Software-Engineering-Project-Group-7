import "../../pages/pages.css"
import FormTextComponent from "../Input-Text/input-text"
function InquiryCard({inquiry, index}) {
    return(
        <>
            <div className="textContainer">
            <h1 className="headerText">Inquiry #{index}</h1>  
            </div>
            <div className="inputRowContainer" style={{display: 'flex', flexDirection: 'column' ,gap: '0.625rem', border: '1px solid #000', borderRadius:'12px', padding: '2.5rem', width: '75%'}}>
            <div className="inputRow">
            <FormTextComponent
            placeholder="First Name"
            backgroundColor="#FBF5F1"
            borderRadius="12px"
            readOnly/>
        
            <FormTextComponent
            placeholder="Last Name"
            value={inquiry.lastName}
            backgroundColor="#FBF5F1"
            borderRadius="12px"
            readOnly/>
        
            </div>
                <div className="inputRow">
        
            <FormTextComponent
            placeholder="Email"
            value={inquiry.email}
            backgroundColor="#FBF5F1"
            borderRadius="12px"
            readOnly
            />
            <FormTextComponent
            placeholder="Phone Number"
            value={inquiry.phoneNumber}
            backgroundColor="#FBF5F1"
            borderRadius="12px"
            readOnly
            />
            </div>
            <FormTextComponent
            placeholder="Location"
            value={inquiry.location}
            backgroundColor="#FBF5F1"
            borderRadius="12px"
            readOnly
            />
            <FormTextComponent
            placeholder="Message"
            value={inquiry.message}
            backgroundColor="#FBF5F1"
            borderRadius="12px"
            multiline
            rows={4}
            readOnly
            />
            </div>
        </>
    )
}

export default InquiryCard