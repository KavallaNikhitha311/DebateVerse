import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/StatCard';
import { Award, MessageSquare, CheckSquare, Plus, Edit3, School, ThumbsUp } from 'lucide-react';

export const Dashboard = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [college, setCollege] = useState(user?.college || '');
  const [interests, setInterests] = useState(user?.interests?.join(', ') || '');
  const [msg, setMsg] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await updateProfile({
        name,
        college,
        interests: interests.split(',').map(s => s.trim()).filter(Boolean)
      });
      setMsg('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      setMsg(err.message || 'Update failed.');
    }
  };

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: 940 }}>
        {/* Profile Card Header */}
        <div className="dv-card p-4 p-md-5 mb-4">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4">
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center justify-content-center rounded-circle fs-3 fw-bold" style={{ width: 68, height: 68, backgroundColor: '#EEF2FF', color: '#4F46E5', border: '2px solid #C7D2FE' }}>
                {user?.name?.charAt(0) || 'S'}
              </div>
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h3 className="fw-bold text-dark mb-0">{user?.name}</h3>
                  <span className="dv-badge-lavender text-capitalize small">{user?.role || 'Student'}</span>
                </div>
                <div className="text-muted small d-flex flex-wrap align-items-center gap-3">
                  <span className="d-flex align-items-center gap-1">
                    <School size={14} /> {user?.college}
                  </span>
                  <span>&bull;</span>
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button onClick={() => setEditing(!editing)} className="btn btn-dv-secondary d-flex align-items-center gap-1">
                <Edit3 size={15} />
                <span>{editing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
              <Link to="/debates/create" className="btn btn-dv-primary d-flex align-items-center gap-1">
                <Plus size={15} />
                <span>Create Debate</span>
              </Link>
            </div>
          </div>

          {/* Interests Pills */}
          {user?.interests && user.interests.length > 0 && (
            <div className="d-flex flex-wrap align-items-center gap-2 mt-4 pt-3 border-top">
              <span className="text-muted small fw-medium">Interests:</span>
              {user.interests.map((int, i) => (
                <span key={i} className="dv-badge-primary small">{int}</span>
              ))}
            </div>
          )}

          {/* Edit Profile Form */}
          {editing && (
            <form onSubmit={handleUpdate} className="mt-4 pt-4 border-top">
              <h6 className="fw-bold text-dark mb-3">Update Profile Information</h6>
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-4">
                  <label className="form-label small text-muted">Full Name</label>
                  <input type="text" className="form-control dv-input" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label small text-muted">College / Institution</label>
                  <input type="text" className="form-control dv-input" value={college} onChange={(e) => setCollege(e.target.value)} required />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label small text-muted">Interests (comma separated)</label>
                  <input type="text" className="form-control dv-input" value={interests} onChange={(e) => setInterests(e.target.value)} />
                </div>
              </div>
              <button type="submit" className="btn btn-dv-primary btn-sm">Save Changes</button>
            </form>
          )}

          {msg && <div className="alert alert-info small py-2 mt-3 mb-0">{msg}</div>}
        </div>

        {/* Stats Grid */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <StatCard title="Total Points" value={user?.totalPoints || 0} subtitle="Debate score" icon={Award} color="indigo" />
          </div>
          <div className="col-6 col-md-3">
            <StatCard title="Debates Created" value="4" subtitle="Active and completed" icon={MessageSquare} color="lavender" />
          </div>
          <div className="col-6 col-md-3">
            <StatCard title="Arguments Posted" value="12" subtitle="Contributions" icon={MessageSquare} color="mint" />
          </div>
          <div className="col-6 col-md-3">
            <StatCard title="Peer Votes Won" value="28" subtitle="Convincing arguments" icon={ThumbsUp} color="blue" />
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div className="dv-card p-4 h-100">
              <h5 className="fw-bold text-dark mb-2">Debate Preparation Checklist</h5>
              <p className="text-muted small mb-4">Track research points, articles, and counterarguments to prepare before speaking.</p>
              <Link to="/todo" className="btn btn-dv-secondary btn-sm d-inline-flex align-items-center gap-1">
                <CheckSquare size={14} /> Open Prep Checklist
              </Link>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="dv-card p-4 h-100">
              <h5 className="fw-bold text-dark mb-2">Student Leaderboard</h5>
              <p className="text-muted small mb-4">Check how you rank among fellow student debaters across participating schools.</p>
              <Link to="/leaderboard" className="btn btn-dv-secondary btn-sm d-inline-flex align-items-center gap-1">
                <Award size={14} /> View Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
