import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: 480 }}>
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3" style={{ width: 44, height: 44, backgroundColor: '#4F46E5', color: '#FFFFFF' }}>
            <MessageSquare size={22} />
          </div>
          <h2 className="fw-bold text-dark mb-1">Welcome Back</h2>
          <p className="text-muted small">Sign in to participate in debates and track your rank.</p>
        </div>

        <div className="dv-card p-4 p-md-5 mb-4">
          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 small py-2 mb-3" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div>
              <label className="form-label fw-semibold text-dark small mb-1">Email Address</label>
              <div className="position-relative">
                <Mail size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type="email"
                  className="form-control dv-input ps-5"
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label fw-semibold text-dark small mb-1">Password</label>
              <div className="position-relative">
                <Lock size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type="password"
                  className="form-control dv-input ps-5"
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-dv-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2 mt-2"
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Demo Login Credentials */}
          <div className="mt-4 pt-3 border-top">
            <span className="text-muted small fw-medium d-block mb-2">1-Click Demo Accounts:</span>
            <div className="d-flex gap-2">
              <button
                type="button"
                onClick={() => fillDemoAccount('aarav@debateverse.edu', 'password123')}
                className="btn btn-dv-secondary btn-sm flex-grow-1"
                style={{ fontSize: '0.78rem' }}
              >
                Student (Aarav)
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('admin@debateverse.edu', 'password123')}
                className="btn btn-dv-secondary btn-sm flex-grow-1"
                style={{ fontSize: '0.78rem' }}
              >
                Admin User
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-muted small">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-dark fw-semibold text-decoration-none">
            Register here &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
