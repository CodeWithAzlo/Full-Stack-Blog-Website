import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { databases, DATABASE_ID, COLLECTION_ID } from '../config/appwrite';
import { ID } from 'appwrite';
import { useAuth } from '../context/AuthContext';
import Typewriter from 'typewriter-effect';
import '../styles/CreateBlog.css';

function CreateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [url, setUrl] = useState('');
    const [slug, setSlug] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(generateSlug(newTitle));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title || !content) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const blogData = {
                title: title.trim(),
                content: content.trim(),
                authorId: user.$id,
                authorName: user.name || user.email,
                slug: slug.trim() || generateSlug(title),
            };

            try {
                const response = await databases.createDocument(
                    DATABASE_ID,
                    COLLECTION_ID,
                    ID.unique(),
                    blogData
                );
                
                if (user.isAdmin) {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } catch (dbError) {
                console.error('Database error:', dbError);
                setError(`Database error: ${dbError.message}`);
            }
        } catch (error) {
            console.error('Error creating blog:', error);
            setError(`Failed to create blog: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="error-message">
                Please login to create a blog post.
            </div>
        );
    }

    return (
        <div className="create-blog-page">
            <div className="create-blog-container">
                <h1 className="create-blog-title">
                    <Typewriter
                        options={{
                            strings: ['Create New Blog Post', 'Share Your Story', 'Express Yourself'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </h1>
                <div className="blog-image" style={{textAlign: 'center', marginBottom: '2rem'}}>
                    <lord-icon
                        src="https://cdn.lordicon.com/qhgmphtg.json"
                        trigger="loop"
                        colors="primary:#121331,secondary:#08a88a"
                        style={{width:"180px",height:"180px"}}
                    />
                </div>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="blog-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Enter blog title"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="slug">Slug</label>
                        <input
                            type="text"
                            id="slug"
                            className="form-control"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="Enter URL slug (auto-generated from title)"
                        />
                        <small className="form-text">
                            This will be used in the URL. Auto-generated from title, but you can customize it.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">External URL (Optional)</label>
                        <input
                            type="url"
                            id="url"
                            className="form-control"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                        />
                        <small className="form-text">
                            Add an external URL if this post links to another website
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            className="form-control"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your blog content here..."
                            required
                            rows="10"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="loading-spinner"></div>
                                Creating...
                            </>
                        ) : (
                            <>
                                Create Blog Post
                                <span className="send-icon">→</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateBlog; 