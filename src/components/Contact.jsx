import React, { useState, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';

function Contact() {
    const form = useRef();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await emailjs.sendForm(
                'service_bs12qwv',
                'template_oor2qoa',
                form.current,
                '9DypuiYqj0_u5sdFb'
            );
            
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            
            // Show success popup
            const popup = document.createElement('div');
            popup.className = 'success-popup';
            popup.innerHTML = `
                <div class="success-popup-content">
                    <div class="success-icon">✓</div>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. We'll get back to you soon.</p>
                </div>
            `;
            document.body.appendChild(popup);

            // Remove popup after 3 seconds
            setTimeout(() => {
                popup.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(popup);
                }, 500);
            }, 3000);

        } catch (error) {
            setSubmitStatus('error');
            console.error('EmailJS error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-page animated-section">
            <div className="contact-hero">
                <h1 className="contact-title">
                    <Typewriter
                        options={{
                            strings: [
                                'Contact Us',
                                'Get in Touch',
                                'Let\'s Connect',
                                'Reach Out'
                            ],
                            autoStart: true,
                            loop: true,
                            cursor: '|',
                            delay: 50,
                            deleteSpeed: 30,
                        }}
                    />
                </h1>
            </div>

            <div className="contact-content">
                <div className="contact-info-section animated-slideup">
                    <div className="contact-info-card">
                        <h2>Let's Connect</h2>
                        <p>Have questions or want to collaborate? We'd love to hear from you!</p>
                        
                        <div className="contact-methods">
                            <div className="contact-method">
                                <span className="method-icon">📧</span>
                                <div className="method-details">
                                    <h3>Email Us</h3>
                                    <p>codewithazlo@gmail.com</p>
                                </div>
                            </div>
                            <div className="contact-method">
                                <span className="method-icon">💬</span>
                                <div className="method-details">
                                    <h3>Social Media</h3>
                                    <p>@azlo980</p>
                                </div>
                            </div>
                            <div className="contact-method">
                                <span className="method-icon">📱</span>
                                <div className="method-details">
                                    <h3>Phone</h3>
                                    <p>+92 (349) 6372662</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-form-section animated-slideup">
                    <div className="contact-form-card">
                        <h2>Send us a Message</h2>
                        <form ref={form} onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group floating-label">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="name">Your Name</label>
                            </div>

                            <div className="form-group floating-label">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="email">Your Email</label>
                            </div>

                            <div className="form-group floating-label">
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="subject">Subject</label>
                            </div>

                            <div className="form-group floating-label">
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                    rows="5"
                                ></textarea>
                                <label htmlFor="message">Your Message</label>
                            </div>

                            <button 
                                type="submit" 
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="loading-spinner"></span>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>

                        {submitStatus === 'error' && (
                            <div className="error-message">
                                <span className="error-icon">⚠️</span>
                                Failed to send message. Please try again.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="contact-3d-section animated-slideup">
                <div className="contact-3d-card">
                    <div className="3d-content">
                        <h2>Visit Our Office</h2>
                        <p>Currently i don't have an office you can reach me on my whatsapp number or email</p>
                        <div className="3d-map">
                            {/* Placeholder for 3D map or image */}
                            <div className="map-placeholder">
                                <span className="map-icon">🗺️</span>
                                <p>Interactive Map Coming Soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="contact-footer">
                <p>© 2025 AzlanBlogs - We're here to help!</p>
            </footer>
        </div>
    );
}

export default Contact; 