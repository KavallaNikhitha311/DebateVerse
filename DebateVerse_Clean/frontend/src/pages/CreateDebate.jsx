import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debatesApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Clock, AlertCircle, ArrowLeft } from 'lucide-react';

export const CreateDebate = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [statement, setStatement] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Education & Schools');
  const [durationMinutes, setDurationMinutes] = useState('15');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Education & Schools',
    'Technology & AI',
    'Society & Life',
    'Environment & Nature',
    'Culture & Gaming'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!title || !statement || !description) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await debatesApi.create({
        title,
        statement,
        description,
        category,
        durationMinutes: parseInt(durationMinutes, 10)
      });

      if (res.success && res.debate) {
        navigate(`/debates/${res.debate._id}`);
      }
    } catch (err) {
      setError(err.message || 'Failed to create debate topic.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <button onClick={() => navigate(-1)} className="btn btn-link text-muted p-0 d-flex align-items-center gap-1 mb-3 text-decoration-none">
          <ArrowLeft size={16} /> Back to Debates
        </button>

        <div className="dv-card p-4 p-md-5">
          <div className="d-flex align-items-center gap-2 dv-badge-primary mb-3">
            <Clock size={14} />
            <span>Create a Debate Topic (+20 Points)</span>
          </div>

          <h2 className="fw-bold text-dark mb-2">Start a New Debate</h2>
          <p className="text-muted small mb-4">
            Pose a clear question or motion that students can easily debate with Support or Oppose.
          </p>

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 small mb-4" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
            <div>
              <label className="form-label fw-semibold text-dark small mb-1">Debate Question / Title *</label>
              <input
                type="text"
                className="form-control dv-input"
                placeholder="e.g., Should homework be banned in primary and middle schools?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="form-label fw-semibold text-dark small mb-1">The Motion / Core Statement *</label>
              <textarea
                className="form-control dv-input"
                rows="2"
                placeholder="e.g., Schools should eliminate daily homework to give students more family time and reduce stress."
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                required
              />
              <div className="text-muted small mt-1">This is the statement that debaters will Support or Oppose.</div>
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark small mb-1">Category *</label>
                <select
                  className="form-select dv-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark small mb-1">Debate Duration (Timed Round) *</label>
                <select
                  className="form-select dv-input"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value)}
                >
                  <option value="15">15 Minutes (Quick Session)</option>
                  <option value="30">30 Minutes (Standard)</option>
                  <option value="60">1 Hour (Extended Discussion)</option>
                  <option value="1440">24 Hours (Full-Day Round)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="form-label fw-semibold text-dark small mb-1">Context & Summary *</label>
              <textarea
                className="form-control dv-input"
                rows="4"
                placeholder="Add a short explanation of why this topic is important, interesting, or controversial..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="pt-3 border-top d-flex align-items-center justify-content-end gap-2">
              <button type="button" onClick={() => navigate(-1)} className="btn btn-dv-secondary">Cancel</button>
              <button type="submit" disabled={loading} className="btn btn-dv-primary">
                {loading ? 'Creating Topic...' : 'Publish Debate'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
