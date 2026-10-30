import React, { useState } from 'react';
import { feedbackApi } from '../services/api';
import { MessageSquare, Send, CheckCircle, ExternalLink } from 'lucide-react';

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await feedbackApi.submit({ name, email, subject, message });
      if (res.success) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: 840 }}>
        {/* Banner */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 dv-badge-primary mb-2">
            <MessageSquare size={14} />
            <span>Student Support & Community Feedback</span>
          </div>
          <h1 className="display-6 fw-bold text-dark mb-2">Contact & Feedback</h1>
          <p className="text-muted fs-6">
            Suggest a new debate topic, share feedback about the platform, or reach out to the DebateVerse team.
          </p>
        </div>

        {/* Angular Module Information */}
        <div className="dv-card p-4 mb-4 section-alt border">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
              <span className="dv-badge-lavender small mb-1 d-inline-block">Angular Feedback Form</span>
              <h5 className="fw-bold text-dark mb-1">Standalone Angular Form Available</h5>
              <p className="text-muted small mb-0">
                A dedicated Angular application with reactive forms is available in <code>angular-contact/</code> and can run on port 4200.
              </p>
            </div>
            <a
              href="http://localhost:4200"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dv-secondary btn-sm d-flex align-items-center gap-1 text-nowrap"
            >
              <span>Launch Angular Form</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Form Card */}
        <div className="dv-card p-4 p-md-5">
          <h4 className="fw-bold text-dark mb-2">Send Us a Message</h4>
          <p className="text-muted small mb-4">Have an idea for a debate topic or want to suggest an improvement? Let us know below.</p>

          {submitted && (
            <div className="alert alert-success d-flex align-items-center gap-2 small py-3 mb-4" role="alert">
              <CheckCircle size={18} />
              <span>Thank you! Your feedback has been received.</span>
            </div>
          )}

          {error && (
            <div className="alert alert-danger small py-2 mb-4" role="alert">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark small mb-1">Your Name *</label>
                <input
                  type="text"
                  className="form-control dv-input"
                  placeholder="e.g., Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark small mb-1">Email Address *</label>
                <input
                  type="email"
                  className="form-control dv-input"
                  placeholder="e.g., aarav@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label fw-semibold text-dark small mb-1">Subject *</label>
              <input
                type="text"
                className="form-control dv-input"
                placeholder="e.g., Topic Suggestion: School Uniforms..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="form-label fw-semibold text-dark small mb-1">Message *</label>
              <textarea
                className="form-control dv-input"
                rows="5"
                placeholder="Enter your suggestion or message (minimum 10 characters)..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="pt-2 d-flex justify-content-end">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-dv-primary d-inline-flex align-items-center gap-2 px-4 py-2"
              >
                <Send size={15} />
                <span>{loading ? 'Sending...' : 'Submit Message'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
