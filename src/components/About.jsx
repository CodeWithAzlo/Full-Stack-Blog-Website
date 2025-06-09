import React from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import '../styles/About.css';

function About() {
    return (
        <div className="about-page animated-section">
            <div className="about-hero">
                <h1 className="about-title">
                    <Typewriter
                        options={{
                            strings: [
                                'About AzlanBlogs',
                                'Our Story',
                                'Our Mission',
                                'Join Our Journey'
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

            <div className="about-content">
                <div className="about-story animated-slideup">
                    <h2>Our Story</h2>
                    <p>
                        Founded with a passion for storytelling and technology, AzlanBlogs emerged from a vision to create a space where voices can be heard and stories can be shared. We believe that every person has a unique story to tell, and we're here to make that possible.
                    </p>
                    <div className="story-highlights">
                        <div className="highlight-card">
                            <span className="highlight-icon">🚀</span>
                            <h3>Started in 2024</h3>
                            <p>Born from a vision to revolutionize blogging</p>
                        </div>
                        <div className="highlight-card">
                            <span className="highlight-icon">💡</span>
                            <h3>Innovation First</h3>
                            <p>Constantly evolving with the latest technology</p>
                        </div>
                        <div className="highlight-card">
                            <span className="highlight-icon">🌍</span>
                            <h3>Global Reach</h3>
                            <p>Connecting writers and readers worldwide</p>
                        </div>
                    </div>
                </div>

                <div className="about-mission animated-slideup">
                    <h2>Our Mission</h2>
                    <p>
                        At AzlanBlogs, we're committed to empowering writers and enriching readers' lives through meaningful content. Our platform is designed to be more than just a blogging site – it's a community where ideas flourish and connections are made.
                    </p>
                    <div className="mission-features">
                        <div className="feature-item">
                            <h3>Empower Writers</h3>
                            <p>Providing tools and support for content creators</p>
                        </div>
                        <div className="feature-item">
                            <h3>Engage Readers</h3>
                            <p>Creating meaningful connections through content</p>
                        </div>
                        <div className="feature-item">
                            <h3>Foster Community</h3>
                            <p>Building a supportive and interactive environment</p>
                        </div>
                    </div>
                </div>

                <div className="about-values animated-slideup">
                    <h2>Our Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <span className="value-icon">✨</span>
                            <h3>Creativity</h3>
                            <p>Encouraging unique perspectives and innovative ideas</p>
                        </div>
                        <div className="value-card">
                            <span className="value-icon">🤝</span>
                            <h3>Community</h3>
                            <p>Building meaningful connections and support networks</p>
                        </div>
                        <div className="value-card">
                            <span className="value-icon">🔒</span>
                            <h3>Security</h3>
                            <p>Ensuring a safe and trusted environment for all</p>
                        </div>
                        <div className="value-card">
                            <span className="value-icon">🌱</span>
                            <h3>Growth</h3>
                            <p>Supporting continuous learning and development</p>
                        </div>
                    </div>
                </div>

                <div className="about-cta animated-slideup">
                    <h2>Join Our Community</h2>
                    <p>Be part of something special. Share your story, connect with others, and grow with us.</p>
                    <div className="cta-buttons">
                        <a href="/register" className="cta-button primary">Get Started</a>
                        <a href="/contact" className="cta-button secondary">Contact Us</a>
                    </div>
                </div>
            </div>

            <footer className="about-footer">
                <p>© 2025 AzlanBlogs - Where Stories Come to Life</p>
            </footer>
        </div>
    );
}

export default About; 