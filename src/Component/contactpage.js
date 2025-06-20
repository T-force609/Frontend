import React from "react";
import ContactForm from "./contactform";

const ContactPage = () => {
    return (
        <div className="container">
            <main>
                <div>
                    <h1>Get in Touch</h1>
                    <p> interested in my 3D, web development, or Machine Learning service?
                        Fill out the form below and I'll get back to within 24 hours.
                    </p>
                </div>
                <div>
                    <ContactForm />
                </div>
            </main>
        </div>
    )
}

export default ContactPage