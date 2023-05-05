import React from 'react'

function Aboutusscreen() {
  return (
    <div className="container">
    <header>
      <h4  className='text-center bs' style={{fontSize:'50px'}}>About Us</h4>
      <hr className="t_border my-4 ml-0 text-left" />
    </header>
    <main>
      <section>
        <h2>Our Story</h2>
        <p>We started our HomeStayX with a simple goal: to provide safe, comfortable, and affordable accommodation to people who are away from home. As frequent travelers ourselves, we know how important it is to have a home away from home, and we strive to create that for our guests.</p>
      </section>
      <section>
        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>Safe and Secure:</strong> We understand that safety is a top concern for our guests, and we take it seriously. Our properties are equipped with security systems and are located in safe neighborhoods.</li>
          <li><strong>Comfortable and Clean:</strong> We want our guests to feel comfortable during their stay, which is why we provide clean and well-maintained accommodations with all the necessary amenities.</li>
          <li><strong>Affordable:</strong> We believe that everyone should have access to quality accommodation, which is why we offer our services at an affordable price.</li>
          <li><strong>Excellent Customer Service:</strong> We are dedicated to providing our guests with the best possible experience, which is why we offer 24/7 customer support and are always available to help with any questions or concerns.</li>
        </ul>
      </section>
    </main>
  </div>
  )
}

export default Aboutusscreen