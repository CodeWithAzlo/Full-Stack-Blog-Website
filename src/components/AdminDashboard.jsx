import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Typewriter from 'typewriter-effect';
import { databases, DATABASE_ID, COLLECTION_ID } from '../config/appwrite';
import { ID, Query } from 'appwrite';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
    const { currentUser } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingBlog, setEditingBlog] = useState(null);
    const [showBlogList, setShowBlogList] = useState(false);

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
            setBlogs(response.documents);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching blogs:', err);
            setError('Failed to load blogs');
            setLoading(false);
        }
    };

    const handleDelete = async (blogId) => {
        if (!window.confirm('Are you sure you want to delete this blog post?')) {
            return;
        }

        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                blogId
            );
            setBlogs(blogs.filter(blog => blog.$id !== blogId));
        } catch (err) {
            console.error('Error deleting blog:', err);
            setError('Failed to delete blog');
        }
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                title: editingBlog.title,
                content: editingBlog.content,
                imageUrl: editingBlog.imageUrl,
                updatedAt: new Date().toISOString()
            };

            await databases.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                editingBlog.$id,
                updatedData
            );

            setBlogs(blogs.map(blog => 
                blog.$id === editingBlog.$id ? { ...blog, ...updatedData } : blog
            ));
            setEditingBlog(null);
        } catch (err) {
            console.error('Error updating blog:', err);
            setError('Failed to update blog');
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1 className="admin-title">
                    <Typewriter
                        options={{
                            strings: [
                                'Admin Dashboard',
                                'Manage Your Content',
                                'Control Your Blog',
                                'Welcome Back'
                            ],
                            autoStart: true,
                            loop: true,
                            cursor: '|',
                            delay: 50,
                            deleteSpeed: 30,
                        }}
                    />
                </h1>
                <p className="admin-subtitle">Logged in as: {currentUser?.email}</p>
            </div>

            <div className="admin-content">
                <div className="admin-card">
                    <h2>Manage Blog Posts</h2>
                    <p>Create, edit, and manage your blog posts with our intuitive interface.</p>
                    <div className="admin-stats">
                        <div className="stat-item">
                            <div className="stat-value">{blogs.length}</div>
                            <div className="stat-label">Total Posts</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">5</div>
                            <div className="stat-label">Draft Posts</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">1.2k</div>
                            <div className="stat-label">Total Views</div>
                        </div>
                    </div>
                    <div className="admin-actions">
                        <button className="action-btn" onClick={() => setShowBlogList(!showBlogList)}>
                            {showBlogList ? 'Hide Posts' : 'View All Posts'}
                        </button>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                {editingBlog && (
                    <div className="admin-card edit-form">
                        <h2>Edit Blog Post</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label htmlFor="edit-title">Title</label>
                                <input
                                    type="text"
                                    id="edit-title"
                                    className="form-control"
                                    value={editingBlog.title}
                                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-content">Content</label>
                                <textarea
                                    id="edit-content"
                                    className="form-control"
                                    value={editingBlog.content}
                                    onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                                    required
                                    rows="10"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-image">Image URL</label>
                                <input
                                    type="url"
                                    id="edit-image"
                                    className="form-control"
                                    value={editingBlog.imageUrl || ''}
                                    onChange={(e) => setEditingBlog({ ...editingBlog, imageUrl: e.target.value })}
                                />
                            </div>

                            <div className="admin-actions">
                                <button type="submit" className="action-btn">Save Changes</button>
                                <button 
                                    type="button" 
                                    className="action-btn"
                                    onClick={() => setEditingBlog(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {showBlogList && (
                    <div className="admin-card blog-list">
                        <h2>All Blog Posts</h2>
                        {loading ? (
                            <div className="loading-spinner"></div>
                        ) : (
                            <div className="blog-grid">
                                {blogs.map((blog) => (
                                    <div key={blog.$id} className="blog-card">
                                        {blog.imageUrl && (
                                            <img
                                                src={blog.imageUrl}
                                                alt={blog.title}
                                                className="blog-image"
                                            />
                                        )}
                                        <div className="blog-content">
                                            <h3 className="blog-title">{blog.title}</h3>
                                            <p className="blog-author">By {blog.authorName || 'Anonymous'}</p>
                                            <p className="blog-date">
                                                Created: {blog.$createdAt ? new Date(blog.$createdAt).toLocaleDateString() : 'Unknown'}
                                            </p>
                                            <div className="admin-actions">
                                                <button
                                                    onClick={() => handleEdit(blog)}
                                                    className="action-btn"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog.$id)}
                                                    className="action-btn delete-btn"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard; 