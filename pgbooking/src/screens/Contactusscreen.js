import React  , {useState} from 'react'
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap"
import { contactConfig } from "../screens/Contactoptionscreen";
import Swal from 'sweetalert2'


export default function ContactUs() {
 
  // eslint-disable-next-line
  const[loading, setloading] = useState(false)
  const[name , setname] = useState('')
  const[email , setemail] = useState('')
  const[message , setmessage] = useState('')

  async function contactUs(e) {
    e.preventDefault();
    if (!email.includes("@gmail.com")) {
      Swal.fire("Invalid email", "Please enter a valid Email address", "error");
      return;
    }
    const newcontact = {
        name,
        email,
        message
    }

    try {
        setloading(true)
        console.log(newcontact)
        const result = await (await axios.post('/api/contact/contactUs' , newcontact)).data
        console.log(result)
        setloading(false)
        Swal.fire('Congrats' , "Your Message submitted Successfully" , 'success').then(result=>{
            window.location.href='/home'
        })
    } catch (error) {
        console.log(error)
        setloading(false)
        Swal.fire('Oops' , 'Something Went Wrong' , 'error')
    }

    
}
  return (
    <Container>
     
    <Row className="mb-5 mt-3">
      <Col lg="12">
        <h4 className="display-4 mb-4 text-center bs" style={{fontSize:'50px'}}>Contact Us</h4>
        <hr className="t_border my-4 ml-0 text-left" />
      </Col>
    </Row>
    <Row className="sec_sp">
      <Col lg="5" className="mb-5">
        <h3 className="color_sec py-4">Get in Touch</h3>
        <address>
          <strong>Email:contact@homestayx.com</strong>{" "}
          <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
            {contactConfig.YOUR_EMAIL}
          </a>
          <br />
          <br />
          {contactConfig.hasOwnProperty("YOUR_FONE") ? (
            <p>
              <strong>Phone:</strong> {contactConfig.YOUR_FONE}
            </p>
          ) : (
            ""
          )}
        </address>
        <p>{contactConfig.description}</p>
      </Col>
      <Col lg="7" className="d-flex align-items-center">
        <form  className="contact__form w-100">
          <Row>
            <Col lg="6" className="form-group">
              <input
                className="form-control"
                id="name"
                name="name"
                placeholder="Name" 
                type="text"
                required 
                value={name} onChange={(e)=>{setname(e.target.value)}}
              />
            </Col>
            <Col lg="6" className="form-group">
              <input
                className="form-control rounded-0"
                id="email"
                name="email"
                placeholder="Email"
                type="email" 
                required 
                value={email} onChange={(e)=>{setemail(e.target.value)}}
              />
            </Col>
          </Row>
          <br/>
          <br/>
          <textarea
            className="form-control rounded-0"
            id="message"
            name="message"
            placeholder="Message"
            rows="5" 
            required
            value={message} onChange={(e)=>{setmessage(e.target.value)}}
          ></textarea>
          <br />
          <Row>
            <Col lg="12" className="form-group">
              <button className="btn ac_btn" type="submit" onClick={contactUs}> 
                Send
              </button>
            </Col>
          </Row>
        </form>
      </Col>
    </Row>
  </Container>
  )
}