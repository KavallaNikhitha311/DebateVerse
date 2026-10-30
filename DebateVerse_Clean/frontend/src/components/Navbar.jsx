import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Award, Sparkles, BookOpen, CheckSquare, BarChart2, User, LogOut, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="dv-navbar sticky-top">
      <div className="container py-2">
        <div className="d-flex align-items-center justify-content-between">
          {/* Brand Logo */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: 36, height: 36, backgroundColor: '#4F46E5', color: '#FFFFFF' }}>
              <MessageSquare size={19} strokeWidth={2.2} />
            </div>
            <div>
              <span className="fw-bold fs-5 tracking-tight text-dark">Debate<span style={{ color: '#4F46E5' }}>Verse</span></span>
              <span className="d-none d-sm-block text-muted" style={{ fontSize: '0.72rem', marginTop: -4 }}>Online Student Debate Arena</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="d-none d-lg-flex align-items-center gap-1">
            <Link to="/debates" className={`px-3 py-2 rounded-3 text-decoration-none fw-medium transition ${isActive('/debates') ? 'bg-light text-dark fw-semibold' : 'text-secondary'}`} style={{ fontSize: '0.92rem' }}>
              Debates
            </Link>
            <Link to="/blog" className={`px-3 py-2 rounded-3 text-decoration-none fw-medium transition ${isActive('/blog') ? 'bg-light text-dark fw-semibold' : 'text-secondary'}`} style={{ fontSize: '0.92rem' }}>
              Knowledge Hub
            </Link>
            <Link to="/resources" className={`px-3 py-2 rounded-3 text-decoration-none fw-medium transition ${isActive('/resources') ? 'bg-light text-dark fw-semibold' : 'text-secondary'}`} style={{ fontSize: '0.92rem' }}>
              Library
            </Link>
            <Link to="/leaderboard" className={`px-3 py-2 rounded-3 text-decoration-none fw-medium transition ${isActive('/leaderboard') ? 'bg-light text-dark fw-semibold' : 'text-secondary'}`} style={{ fontSize: '0.92rem' }}>
              Leaderboard
            </Link>
            <Link to="/ai-lab" className={`px-3 py-2 rounded-3 text-decoration-none fw-medium transition ${isActive('/ai-lab') ? 'bg-light text-dark fw-semibold' : 'text-secondary'}`} style={{ fontSize: '0.92rem' }}>
              <span className="d-flex align-items-center gap-1">
                <Sparkles size={14} style={{ color: '#6366F1' }} /> AI Lab
              </span>
            </Link>
            <Link to="/todo" className={`px-3 py-2 rounded-3 text-decoration-none fw-medium transition ${isActive('/todo') ? 'bg-light text-dark fw-semibold' : 'text-secondary'}`} style={{ fontSize: '0.92rem' }}>
              Prep Checklist
            </Link>
            <Link to="/contact" className={`px-3 py-2 rounded-3 text-decoration-none fw-medium transition ${isActive('/contact') ? 'bg-light text-dark fw-semibold' : 'text-secondary'}`} style={{ fontSize: '0.92rem' }}>
              Feedback
            </Link>
          </div>

          {/* User Controls */}
          <div className="d-flex align-items-center gap-2">
            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-2">
                <div className="d-none d-md-flex align-items-center gap-1 dv-badge-primary">
                  <Award size={14} />
                  <span>{user?.totalPoints || 0} pts</span>
                </div>
                <Link to="/dashboard" className="btn btn-dv-secondary btn-sm d-flex align-items-center gap-2">
                  <User size={15} />
                  <span className="d-none d-sm-inline">{user?.name?.split(' ')[0] || 'Dashboard'}</span>
                </Link>
                <button onClick={handleLogout} className="btn btn-link text-muted p-1" title="Log out">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link to="/login" className="btn btn-dv-secondary btn-sm">Log in</Link>
                <Link to="/register" className="btn btn-dv-primary btn-sm">Register</Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              className="btn btn-link text-dark p-1 d-lg-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="d-lg-none pt-3 pb-2 border-top mt-2">
            <div className="d-flex flex-column gap-1">
              <Link to="/debates" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-decoration-none text-dark rounded-2">Debates</Link>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-decoration-none text-dark rounded-2">Knowledge Hub</Link>
              <Link to="/resources" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-decoration-none text-dark rounded-2">Resources Library</Link>
              <Link to="/leaderboard" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-decoration-none text-dark rounded-2">Leaderboard</Link>
              <Link to="/ai-lab" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-decoration-none text-dark rounded-2">AI Argument Analyzer</Link>
              <Link to="/todo" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-decoration-none text-dark rounded-2">Prep Checklist</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-decoration-none text-dark rounded-2">Feedback</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-decoration-none text-dark rounded-2">About Platform</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
