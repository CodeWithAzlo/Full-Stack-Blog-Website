import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { databases, DATABASE_ID, COLLECTION_ID } from '../config/appwrite';
import { Query } from 'appwrite';
import { useAuth } from '../context/AuthContext';

function UserDashboard() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchUserBlogs();
    }, [user, navigate]);

    const fetchUserBlogs = async () => {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [
                    Query.equal('authorId', user.$id),
                    Query.orderDesc('createdAt')
                ]
            );
            console.log('Fetched user blogs:', response.documents);
            setBlogs(response.documents);
        } catch (error) {
            console.error('Error fetching user blogs:', error);
            setError('Failed to fetch your blogs');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="user-dashboard">
            <div className="dashboard-header">
                <h1>My Dashboard</h1>
                <Link to="/create-blog" className="create-btn">
                    Create New Blog
                </Link>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="blog-list">
                {blogs.length === 0 ? (
                    <div className="empty-state">
                        <p>You haven't created any blogs yet.</p>
                        <Link to="/create-blog" className="create-btn">
                            Create Your First Blog
                        </Link>
                    </div>
                ) : (
                    blogs.map(blog => (
                        <div key={blog.$id} className="blog-card">
                            {blog.image && (
                                <img 
                                    src={blog.image} 
                                    alt={blog.title} 
                                    className="blog-image"
                                />
                            )}
                            <div className="blog-content">
                                <h2 className="blog-title">{blog.title}</h2>
                                <div className="blog-meta">
                                    <p>Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
                                </div>
                                <p className="blog-excerpt">
                                    {blog.content.substring(0, 150)}...
                                </p>
                                <div className="blog-actions">
                                    <Link to={`/blog/${blog.slug}`} className="view-btn">
                                        View Post
                                    </Link>
                                    <Link to={`/edit-blog/${blog.$id}`} className="edit-btn">
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default UserDashboard; 