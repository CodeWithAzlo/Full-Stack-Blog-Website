import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { databases, DATABASE_ID, COLLECTION_ID } from '../config/appwrite';
import { Query } from 'appwrite';
import { useAuth } from '../context/AuthContext';

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, isAdmin } = useAuth();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [Query.orderDesc('$createdAt')]
            );
            
            if (response.documents.length > 0) {
                console.log('Fetched blogs:', response.documents); // Debug log
                setBlogs(response.documents);
            } else {
                setError('No blogs found');
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setError(`Error fetching blogs: ${error.message}`);
            setBlogs([]);
        }
        setLoading(false);
    };

    const handleDelete = async (blogId) => {
        if (!isAdmin()) {
            setError('Only admins can delete blogs');
            return;
        }

        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                blogId
            );
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
            setError(`Error deleting blog: ${error.message}`);
        }
    };

    if (loading) {
        return <div className="loading">Loading blogs...</div>;
    }

    return (
        <div className="blog-list">
            <h2>Blog Posts</h2>
            {error && <div className="error">{error}</div>}
            {blogs.length === 0 ? (
                <p>No blogs found. Be the first to create one!</p>
            ) : (
                blogs.map((blog) => (
                    <div key={blog.$id} className="blog-card">
                        <h3>{blog.title}</h3>
                        <p className="author">By: {blog.authorName || 'Anonymous'}</p>
                        <p className="content">{blog.content}</p>
                        {isAdmin() && (
                            <div className="admin-controls">
                                <button 
                                    onClick={() => handleDelete(blog.$id)}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default BlogList; 