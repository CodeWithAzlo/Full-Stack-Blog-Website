import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import '../styles/LandingPage.css';

function LandingPage() {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="landing-page">
            {!showContent ? (
                <div className="splash-screen">
                    <h1 className="splash-title">Welcome to Blogs Website</h1>
                    <div className="loader"></div>
                    <p className="splash-message">Welcome to my website</p>
                </div>
            ) : (
                <>
                    <div className="landing-hero">
                        <div className="hero-content">
                            <h1 className="landing-title">
                                <Typewriter
                                    options={{
                                        strings: [
                                            'Full Stack Blogs Website',
                                            'Share Your Stories',
                                            'Connect With Writers',
                                            'Discover New Content'
                                        ],
                                        autoStart: true,
                                        loop: true,
                                        cursor: '|',
                                        delay: 50,
                                        deleteSpeed: 30,
                                    }}
                                />
                            </h1>
                            <p className="landing-description">A modern blogging platform where users can create, share, and explore engaging content.</p>
                            <Link to="/login" className="login-link">Get Started</Link>
                        </div>
                    </div>
                    <div className="landing-features">
                        <div className="feature-card">
                            <h2>Create & Share</h2>
                            <p>Write and publish your thoughts with our easy-to-use editor</p>
                        </div>
                        <div className="feature-card">
                            <h2>Connect</h2>
                            <p>Join a community of writers and readers</p>
                        </div>
                        <div className="feature-card">
                            <h2>Discover</h2>
                            <p>Explore trending topics and find new perspectives</p>
                        </div>
                    </div>
                    <div className="landing-cta">
                        <h2>Ready to Start Your Journey?</h2>
                        <p>Join our community of writers and readers today</p>
                        <Link to="/register" className="register-link">Sign Up Now</Link>
                    </div>
                    <footer className="landing-footer">
                        <p>© 2025 AzlanBlogs</p>
                    </footer>
                </>
            )}
        </div>
    );
}

export default LandingPage; 