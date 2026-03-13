import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    image: null
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await axios.post('https://checkirpala.onrender.com/api/contact', 
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        setTicketId(response.data.data._id.slice(-6).toUpperCase());
        setShowPopup(true);
        setResponseMsg('Message sent successfully! ✅');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          image: null
        });
        document.getElementById('imageUpload').value = '';
      }
    } catch (error) {
      setResponseMsg('Failed to send message ❌');
    } finally {
      setLoading(false);
      setTimeout(() => setResponseMsg(''), 3000);
    }
  };
  
  return (
    <div className="contact-section" id="contact">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <h2>
            <span className="header-icon">📞</span>
            Contact Us
            <span className="header-icon">🌾</span>
          </h2>
          <p className="header-subtitle">We're here to help - आपकी सेवा में हम हैं</p>
        </div>

        <div className="contact-wrapper">
          {/* Left Side - Contact Info & Social */}
          <div className="contact-info-side">
            {/* Contact Info */}
            <div className="info-section">
              <h4><span className="section-icon">📇</span> Contact Information</h4>
              <div className="info-details">
                <p className="info-item">
                  <span className="info-icon">📍</span>
                  <span>Gram Panchayat Office, Village Road, District - 713212</span>
                </p>
                <p className="info-item">
                  <span className="info-icon">📞</span>
                  <span>Helpline: <strong>1800-XXX-XXXX</strong> (Toll Free)</span>
                </p>
                <p className="info-item">
                  <span className="info-icon">✉️</span>
                  <span>Email: <strong>panchayat@gram.gov.in</strong></span>
                </p>
                <p className="info-item">
                  <span className="info-icon">⏰</span>
                  <span>Office Hours: <strong>10 AM - 5 PM</strong> (Monday - Saturday)</span>
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-section">
              <h4><span className="section-icon">🤝</span> Connect With Us</h4>
              <div className="social-icons">
                <a href="/" className="social-btn facebook" aria-label="Facebook">
                  <i className="fab fa-facebook-f">f</i>
                </a>
                <a href="/" className="social-btn twitter" aria-label="Twitter">
                  <i className="fab fa-twitter">𝕏</i>
                </a>
                <a href="/" className="social-btn youtube" aria-label="YouTube">
                  <i className="fab fa-youtube">▶</i>
                </a>
                <a href="/" className="social-btn whatsapp" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp">📱</i>
                </a>
                <a href="/" className="social-btn instagram" aria-label="Instagram">
                  <i className="fab fa-instagram">📷</i>
                </a>
              </div>
            </div>

            {/* Digital India */}
            <div className="digital-india-section">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Digital_India_Logo.svg/2560px-Digital_India_Logo.svg.png" 
                alt="Digital India" 
                className="digital-logo"
              />
              <span>Powered by Digital India Initiative</span>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form-side">
            <div className="form-section">
              <h4><span className="section-icon">📝</span> Send us a Message</h4>
              
              {responseMsg && (
                <div className={`response-msg ${responseMsg.includes('✅') ? 'success' : 'error'}`}>
                  {responseMsg}
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                {/* Name - Mandatory */}
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *" 
                    required 
                  />
                </div>

                {/* Email - Optional */}
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email (Optional)" 
                  />
                </div>

                {/* Phone - Mandatory */}
                <div className="form-group">
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number *" 
                    required 
                  />
                </div>

                {/* Subject - Mandatory */}
                <div className="form-group">
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Subject *</option>
                    <option value="certificate">Certificate Related</option>
                    <option value="scheme">Scheme Related</option>
                    <option value="complaint">Complaint</option>
                    <option value="water">Water Supply Issue</option>
                    <option value="road">Road Problem</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message - Mandatory */}
                <div className="form-group">
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message *" 
                    rows="4" 
                    required
                  ></textarea>
                </div>

                {/* Image Upload - Optional */}
                <div className="form-group upload-group">
                  <label htmlFor="imageUpload" className="upload-label">
                    <span className="upload-icon">📎</span>
                    Attach Image (Optional - JPG, PNG)
                  </label>
                  <input 
                    type="file" 
                    id="imageUpload"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/jpeg, image/png, image/jpg"
                    className="upload-input"
                  />
                  <small className="upload-hint">Max size: 5MB. You can upload photo of problem/document</small>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'} 
                  <span className="btn-icon">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="contact-footer">
          <div className="footer-bottom">
            <p className="copyright">
              © 2024 Gram Panchayat Portal. All rights reserved. | 
              <a href="/">Terms of Service</a> | 
              <a href="/">Accessibility</a> | 
              <a href="/">Sitemap</a>
            </p>
            <p className="developed-by">
              Developed with <span className="heart">❤️</span> for Rural India
            </p>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-icon">✅</div>
            <h3>Thank You!</h3>
            <p>Your issue has been registered successfully.</p>
            <p className="popup-id">Ticket ID: /{ticketId}</p>
            <p className="popup-msg">We will contact you soon.</p>
            <button className="popup-btn" onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;