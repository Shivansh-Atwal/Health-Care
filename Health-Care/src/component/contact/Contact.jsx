import React from 'react'
import './Contact.css'
import Swal from 'sweetalert2';



function Contact() {

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "c4d3f7b5-6f98-4013-8247-c3abe1d09b1a");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
          Swal.fire({
            title: "Message Sent Successfully!",
            icon: "success",
            draggable: true
          });
        }
      };

  return (
    <div className='contact w-full min-h-screen flex justify-center items-center pt-16'>
        <form onSubmit={onSubmit} className='form'>
            <h1>Contact Form</h1>
            <div className="input-box">
                <label>Full Name</label>
                <input type='text' className='field' placeholder='Enter Your Name' name='name' required/>
            </div>

            <div className="input-box">
                <label>Email Address</label>
                <input type='email' className='field' placeholder='Enter Your Email' name='email' required/>
            </div>

            <div className="input-box">
                <label>Message</label>
                <textarea name='message' className='field-mess' placeholder='Enter your message ' required/>
            </div>
            <button type="submit">Send Message</button>
        </form>
    </div>
  )
}

export default Contact