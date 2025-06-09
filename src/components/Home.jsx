import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { databases, DATABASE_ID, COLLECTION_ID, storage } from '../config/appwrite';
import { Query } from 'appwrite';
import { useAuth } from '../context/AuthContext';
import Typewriter from 'typewriter-effect';
import '../styles/Home.css';

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [
                    Query.orderDesc('$createdAt')
                ]
            );
            setBlogs(response.documents);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setError('Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading amazing content...</p>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="home-page">
            <div className="home-hero">
                <h1 className="home-title">
                    <Typewriter
                        options={{
                            strings: [
                                'Welcome to AzlanBlogs',
                                'Discover Amazing Stories',
                                'Share Your Thoughts',
                                'Join Our Community'
                            ],
                            autoStart: true,
                            loop: true,
                            cursor: '|',
                            delay: 50,
                            deleteSpeed: 30,
                        }}
                    />
                </h1>
                <p className="home-subtitle">Explore our collection of insightful articles and engaging stories</p>
            </div>

            <div className="blogs-grid">
                {blogs.map((blog) => (
                    <div key={blog.$id} className="blog-card animated-slideup">
                        <div className="blog-image">
                            {blog.imageUrl ? (
                                <img src={blog.imageUrl} alt={blog.title} />
                            ) : (
                                <div className="default-image">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/iltqorsz.json"
                                        trigger="loop"
                                        colors="primary:#121331,secondary:#08a88a"
                                        style={{width:"120px",height:"120px"}}
                                    />
                                </div>
                            )}
                            <div className="blog-category">{blog.category || 'Uncategorized'}</div>
                        </div>
                        <div className="blog-content">
                            <h2 className="blog-title">{blog.title}</h2>
                            <p className="blog-excerpt">
                                {blog.content ? blog.content.substring(0, 150) + '...' : 'No content available.'}
                            </p>
                            <div className="blog-meta">
                                <span className="blog-author">
                                    <span className="author-icon">👤</span>
                                    {blog.authorName || 'Anonymous'}
                                </span>
                                <span className="blog-date">
                                    <span className="date-icon">📅</span>
                                    {blog.$createdAt ? new Date(blog.$createdAt).toLocaleDateString() : 'Unknown'}
                                </span>
                            </div>
                            <Link to={`/blog/${blog.$id}`} className="read-more-btn">
                                Read More
                                <span className="arrow-icon">→</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="create-blog-cta">
                <h2>Share Your Story</h2>
                <p>Have something interesting to share? Create your own blog post!</p>
                <Link to="/create" className="create-blog-btn">
                    Create New Blog
                    <span className="plus-icon">+</span>
                </Link>
            </div>
        </div>
    );
}

export default Home; 