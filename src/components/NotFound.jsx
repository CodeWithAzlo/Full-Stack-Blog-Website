import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="not-found-page">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">Oops! The page you are looking for does not exist.</p>
            <Link to="/" className="home-link">Go Home</Link>
            <footer className="not-found-footer">
                <p>© 2025 AzlanBlogs</p>
            </footer>
        </div>
    );
}

export default NotFound; 