import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { debatesApi } from '../services/api';
import { DebateCard } from '../components/DebateCard';
import { Search, Plus, Clock } from 'lucide-react';

export const DebatesArena = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debates, setDebates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = [
    'All',
    'Education & Schools',
    'Technology & AI',
    'Society & Life',
    'Environment & Nature',
    'Culture & Gaming'
  ];

  const fetchDebates = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (search.trim()) params.search = search.trim();
      if (statusFilter !== 'all') params.status = statusFilter;
      if (sortBy) params.sortBy = sortBy;

      const res = await debatesApi.getAll(params);
      if (res.success && res.debates) {
        setDebates(res.debates);
      }
    } catch (err) {
      console.warn('Failed to load debates:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDebates();
  }, [selectedCategory, statusFilter, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDebates();
  };

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        {/* Header Banner */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
          <div>
            <div className="d-inline-flex align-items-center gap-2 dv-badge-primary mb-2">
              <Clock size={14} />
              <span>Live Debate Arena</span>
            </div>
            <h1 className="display-6 fw-bold text-dark mb-1">Student Debates</h1>
            <p className="text-muted small mb-0">Browse current debate topics, choose Support or Oppose, and cast your vote.</p>
          </div>
          <div>
            <Link to="/debates/create" className="btn btn-dv-primary d-inline-flex align-items-center gap-2">
              <Plus size={16} />
              <span>Start New Debate</span>
            </Link>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="dv-card p-3 p-md-4 mb-4">
          <form onSubmit={handleSearchSubmit} className="row g-3 align-items-center">
            <div className="col-12 col-md-5">
              <div className="position-relative">
                <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type="text"
                  className="form-control dv-input ps-5"
                  placeholder="Search debates by title or topic..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-6 col-md-3">
              <select
                className="form-select dv-input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Topics</option>
                <option value="active">Active & Timed Rounds</option>
                <option value="completed">Finished Rounds</option>
              </select>
            </div>

            <div className="col-6 col-md-3">
              <select
                className="form-select dv-input"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="deadline">Ending Soonest</option>
                <option value="popular">Most Debaters</option>
              </select>
            </div>

            <div className="col-12 col-md-1">
              <button type="submit" className="btn btn-dv-secondary w-100 d-flex align-items-center justify-content-center" title="Search">
                <Search size={16} />
              </button>
            </div>
          </form>

          {/* Category Filter Pills */}
          <div className="d-flex flex-wrap align-items-center gap-2 mt-3 pt-3 border-top">
            <span className="text-muted small fw-medium me-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-dv-primary fw-semibold' : 'btn-dv-secondary'} rounded-pill`}
                style={{ fontSize: '0.8rem', padding: '0.28rem 0.85rem' }}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSearchParams(cat === 'All' ? {} : { category: cat });
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Debates Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-secondary mb-2" role="status"></div>
            <p className="text-muted small">Loading debates...</p>
          </div>
        ) : debates.length === 0 ? (
          <div className="dv-card p-5 text-center my-4">
            <h5 className="fw-semibold text-dark mb-2">No debates found matching your search</h5>
            <p className="text-muted small mb-4">Try different keywords or create a brand new debate topic!</p>
            <Link to="/debates/create" className="btn btn-dv-primary">Start a Debate</Link>
          </div>
        ) : (
          <div className="row g-4">
            {debates.map((debate) => (
              <div className="col-12 col-md-6 col-lg-4" key={debate._id}>
                <DebateCard debate={debate} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
