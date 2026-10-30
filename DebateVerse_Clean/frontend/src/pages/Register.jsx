import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, User, Mail, Lock, School, ArrowRight, AlertCircle } from 'lucide-react';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [interests, setInterests] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await register({
        name,
        email,
        college,
        interests: interests.split(',').map(s => s.trim()).filter(Boolean),
        password,
        confirmPassword
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: 540 }}>
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3" style={{ width: 44, height: 44, backgroundColor: '#4F46E5', color: '#FFFFFF' }}>
            <MessageSquare size={22} />
          </div>
          <h2 className="fw-bold text-dark mb-1">Student Registration</h2>
          <p className="text-muted small">Join DebateVerse to participate in debates and earn points.</p>
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
              <label className="form-label fw-semibold text-dark small mb-1">Full Name *</label>
              <div className="position-relative">
                <User size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type="text"
                  className="form-control dv-input ps-5"
                  placeholder="e.g., Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label fw-semibold text-dark small mb-1">Student Email *</label>
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
              <label className="form-label fw-semibold text-dark small mb-1">College or School *</label>
              <div className="position-relative">
                <School size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type="text"
                  className="form-control dv-input ps-5"
                  placeholder="e.g., Delhi University, IIT..."
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label fw-semibold text-dark small mb-1">Interests (optional)</label>
              <input
                type="text"
                className="form-control dv-input"
                placeholder="e.g., Technology, Environment, Gaming, History"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>

            <div className="row g-2">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark small mb-1">Password *</label>
                <div className="position-relative">
                  <Lock size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                  <input
                    type="password"
                    className="form-control dv-input ps-5"
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark small mb-1">Confirm Password *</label>
                <div className="position-relative">
                  <Lock size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                  <input
                    type="password"
                    className="form-control dv-input ps-5"
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-dv-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2 mt-2"
            >
              <span>{loading ? 'Creating Account...' : 'Complete Registration (+20 pts)'}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <div className="text-center text-muted small">
          Already have an account?{' '}
          <Link to="/login" className="text-dark fw-semibold text-decoration-none">
            Sign In here &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
