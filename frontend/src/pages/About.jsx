import { Facebook, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { FaTwitter, FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
const About = () => {
  const [loading, setLoading] = useState();

  const onSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
  
    formData.append("access_key", "4b49186f-8bee-46dc-9122-f0bf6df7ea46");
  
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
  
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
  
      const res = await response.json();
  
      if (res.success) {
        toast.success("Message sent successfully!")
        // console.log("Success", res);
        
        form.reset(); // ✅ Clear the form after successful submission
      } else {
        toast.error("Submission failed", res);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }finally{
      setLoading(false)
    }
  };
  
  return (
    <div className="bg-zinc-900 px-12 py-8 min-h-screen text-zinc-300 space-y-5">
      {/* Store Info */}
      <section>
        <h1 className="text-3xl font-bold mb-2">About Us</h1>
        <p className="text-lg">
          Welcome to <strong>PageTurner Bookstore</strong>, your go-to place for the best in fiction, non-fiction, educational, and rare books.
          Located in the heart of the city, we’ve been connecting readers with great stories since 2001.
        </p>
      </section>

      {/* Contact Info */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
        <p><strong>Address:</strong> 123 Library Lane, Booktown, NY 10001</p>
        <p><strong>Phone:</strong> +977-9815041051</p>
        <p><strong>Email:</strong> yadavmithun291@gmail.com</p>
      </section>

      {/* Social Media Links */}
      <section>
        <h2 className="text-2xl font-semibold my-4">Follow Us</h2>
        <div className="flex space-x-4 justify-start items-center text-2xl">
          <a href="https://www.facebook.com/mithun.yadav.909848" target="_blank" rel="noreferrer" className="text-blue-600 bg-zinc-800 p-3 rounded-full hover:bg-blue-600 hover:text-zinc-800"><Facebook/></a>
          <a href="tel:9815041051" target="_blank" rel="noreferrer" className="text-blue-600 bg-zinc-800 p-3 rounded-full hover:bg-blue-600 hover:text-zinc-800"><FaWhatsapp/></a>
          <a href="mailto:yadavmithun291@gmail.com" target="_blank" rel="noreferrer" className="text-blue-600 bg-zinc-800 p-3 rounded-full hover:bg-blue-600 hover:text-zinc-800"><Mail/></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-blue-600 bg-zinc-800 p-3 text-2xl rounded-full hover:bg-blue-600 hover:text-zinc-800"><FaTwitter/></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-blue-600 bg-zinc-800 p-3 rounded-full hover:bg-blue-600 hover:text-zinc-800"><Instagram/></a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-blue-600 bg-zinc-800 p-3 rounded-full hover:bg-blue-600 hover:text-zinc-800"><Github/></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-blue-600 bg-zinc-800 p-3 rounded-full hover:bg-blue-600 hover:text-zinc-800"><Linkedin/></a>
        </div>
      </section>

      {/* Location Map */}
      <section>
        <h2 className="text-2xl font-semibold my-4">Our Location</h2>
        <div className="w-full h-auto ">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.9327190797953!2d87.70597140000001!3d26.4578976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e59d5186fc8153%3A0x93ad87b8e9209572!2sGita%20computer%20institute!5e0!3m2!1sen!2snp!4v1746502405974!5m2!1sen!2snp" 
         height="450"
        className='w-full' 
         allowfullscreen="" loading="lazy" 
         referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>

      {/* Contact Form */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* <input type="hidden" name="access_key" value="4b49186f-8bee-46dc-9122-f0bf6df7ea46"> */}
          <input
            type="text"
            name='name'
            placeholder="Your Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name='email'
            placeholder="Your Email"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Your Message"
            name='message'
            className="w-full p-2 border rounded"
            rows="5"
            required
          ></textarea>
          <button disabled={loading}
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
           {loading ? "sending..." : " Send Message"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default About;
