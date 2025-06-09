import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreateBlog from './components/CreateBlog';
import AdminDashboard from './components/AdminDashboard';
import LandingPage from './components/LandingPage';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import './App.css';

function Navigation() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            setIsMenuOpen(false);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && 
                menuRef.current && 
                !menuRef.current.contains(event.target) && 
                buttonRef.current && 
                !buttonRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <nav className="nav">
            <div className="nav-brand">
                <Link to="/">
                    <span className="nav-brand-icon">📝</span>
                    <span>AzlanBlogs</span>
                </Link>
            </div>
            <button 
                ref={buttonRef}
                className="menu-toggle" 
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                {isMenuOpen ? '✕' : '☰'}
            </button>
            <div 
                ref={menuRef}
                className={`nav-links ${isMenuOpen ? 'active' : ''}`}
            >
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                {user ? (
                    <>
                        {user.isAdmin && (
                            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
                        )}
                        <Link to="/create" onClick={() => setIsMenuOpen(false)}>Create Blog</Link>
                        <button onClick={handleLogout} className="logout-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                        <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

function AppContent() {
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <Router>
            <div className="app">
                <Navigation />
                <main>
                    <Routes>
                        <Route path="/" element={user ? <Home /> : <LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/create" element={<CreateBlog />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App; 