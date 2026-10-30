import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { debatesApi } from '../services/api';
import { DebateCard } from '../components/DebateCard';
import { StatCard } from '../components/StatCard';
import { 
  MessageSquare, Sparkles, Award, Users, BookOpen, Clock, 
  ArrowRight, CheckCircle2, Flame, Compass, ChevronRight 
} from 'lucide-react';

export const Home = () => {
  const [featuredDebates, setFeaturedDebates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDebates = async () => {
      try {
        const res = await debatesApi.getAll({ sortBy: 'popular' });
        if (res.success && res.debates) {
          setFeaturedDebates(res.debates.slice(0, 3));
        }
      } catch (err) {
        console.warn('Could not load featured debates:', err.message);
      } finally {
        setLoading(false);
      }
    };
    loadDebates();
  }, []);

  const categories = [
    { name: 'Education & Schools', color: 'indigo', count: 'Active Topics', desc: 'Homework, exams, online vs offline classes, school uniforms.' },
    { name: 'Technology & AI', color: 'lavender', count: 'Active Topics', desc: 'AI in studies, smartphones, social media, screen time.' },
    { name: 'Society & Life', color: 'blue', count: 'Active Topics', desc: 'Free college, youth voting, modern lifestyle choices.' },
    { name: 'Environment & Nature', color: 'mint', count: 'Active Topics', desc: 'Plastic bans, solar power, wildlife protection, recycling.' },
    { name: 'Culture & Gaming', color: 'amber', count: 'Active Topics', desc: 'Video games, books vs movies, e-sports, creative hobbies.' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-5 border-bottom" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container py-lg-4">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-7">
              <div className="d-inline-flex align-items-center gap-2 dv-badge-primary mb-3">
                <Sparkles size={14} />
                <span>An Interactive Online Debate & Discussion Platform</span>
              </div>
              <h1 className="display-4 fw-bold text-dark lh-tight mb-3">
                Speak your mind. Defend your stance. <span style={{ color: '#4F46E5' }}>Think deeper.</span>
              </h1>
              <p className="text-muted fs-5 mb-4 lh-base" style={{ maxWidth: 580 }}>
                DebateVerse is a friendly, student-centered space where you can join debates on everyday topics, share convincing arguments, vote for good ideas, and practice public speaking.
              </p>
              
              <div className="d-flex flex-wrap align-items-center gap-3">
                <Link to="/debates" className="btn btn-dv-primary d-inline-flex align-items-center gap-2 px-4 py-2 fs-6">
                  <span>Explore Debates</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/debates/create" className="btn btn-dv-secondary d-inline-flex align-items-center gap-2 px-4 py-2 fs-6">
                  <MessageSquare size={16} />
                  <span>Start a Debate</span>
                </Link>
                <Link to="/about" className="btn btn-link text-secondary text-decoration-none px-2">
                  How it Works &rarr;
                </Link>
              </div>

              <div className="d-flex flex-wrap align-items-center gap-4 mt-4 pt-3 border-top text-muted small">
                <span className="d-flex align-items-center gap-1">
                  <CheckCircle2 size={16} style={{ color: '#15803D' }} /> Timed Rounds & Live Deadlines
                </span>
                <span className="d-flex align-items-center gap-1">
                  <CheckCircle2 size={16} style={{ color: '#15803D' }} /> AI & Logic Argument Helper
                </span>
                <span className="d-flex align-items-center gap-1">
                  <CheckCircle2 size={16} style={{ color: '#15803D' }} /> One Vote per Student
                </span>
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="p-4 rounded-4" style={{ backgroundColor: 'var(--bg-section-alt)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-card)' }}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="dv-badge-lavender small">How Debates Work</span>
                  <span className="text-muted small">3 Simple Steps</span>
                </div>
                <h5 className="fw-semibold text-dark mb-3">Participate in 3 Steps</h5>
                
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-start gap-3 p-3 bg-white rounded-3 border">
                    <div className="p-2 rounded-3 dv-badge-primary d-flex align-items-center justify-content-center">
                      <Compass size={16} />
                    </div>
                    <div>
                      <h6 className="fw-semibold text-dark mb-1 small">1. Pick a Side</h6>
                      <p className="text-muted small mb-0">Choose Support or Oppose on any debate topic you find interesting.</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 p-3 bg-white rounded-3 border">
                    <div className="p-2 rounded-3 dv-badge-mint d-flex align-items-center justify-content-center">
                      <MessageSquare size={16} />
                    </div>
                    <div>
                      <h6 className="fw-semibold text-dark mb-1 small">2. Share Your Reason</h6>
                      <p className="text-muted small mb-0">Write clear points, facts, or examples that explain your viewpoint.</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 p-3 bg-white rounded-3 border">
                    <div className="p-2 rounded-3 dv-badge-lavender d-flex align-items-center justify-content-center">
                      <Award size={16} />
                    </div>
                    <div>
                      <h6 className="fw-semibold text-dark mb-1 small">3. Vote & Win Points</h6>
                      <p className="text-muted small mb-0">Vote for the best arguments and earn points to climb the leaderboard.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Overview Statistics */}
      <section className="py-4 border-bottom section-alt">
        <div className="container">
          <div className="row g-3">
            <div className="col-6 col-md-3">
              <StatCard title="Active Debates" value="10+" subtitle="Ongoing timed topics" icon={Clock} color="indigo" />
            </div>
            <div className="col-6 col-md-3">
              <StatCard title="Debaters" value="250+" subtitle="Active student thinkers" icon={Users} color="lavender" />
            </div>
            <div className="col-6 col-md-3">
              <StatCard title="Arguments Shared" value="1,200+" subtitle="Thoughts and viewpoints" icon={MessageSquare} color="mint" />
            </div>
            <div className="col-6 col-md-3">
              <StatCard title="Debate Books" value="15" subtitle="Reading and guidebooks" icon={BookOpen} color="blue" />
            </div>
          </div>
        </div>
      </section>

      {/* Trending & Featured Debates */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <Flame size={18} style={{ color: '#4F46E5' }} />
                <h3 className="fw-bold text-dark mb-0">Popular Student Debates</h3>
              </div>
              <p className="text-muted small mb-0">Jump into active topics that students are discussing right now.</p>
            </div>
            <Link to="/debates" className="btn btn-dv-secondary btn-sm d-inline-flex align-items-center gap-1">
              <span>View All Debates</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-5 text-muted">Loading debates...</div>
          ) : (
            <div className="row g-4">
              {featuredDebates.map(debate => (
                <div className="col-12 col-md-4" key={debate._id}>
                  <DebateCard debate={debate} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Debate Categories */}
      <section className="py-5 section-alt border-top border-bottom">
        <div className="container">
          <div className="text-center mb-5" style={{ maxWidth: 620, margin: '0 auto' }}>
            <span className="dv-badge-lavender mb-2 d-inline-block">Topics & Categories</span>
            <h3 className="fw-bold text-dark mb-2">Explore What Interests You</h3>
            <p className="text-muted small">Choose any subject area and discover simple, thought-provoking questions.</p>
          </div>

          <div className="row g-3">
            {categories.map((cat, idx) => (
              <div className="col-12 col-sm-6 col-lg" key={idx}>
                <Link to={`/debates?category=${encodeURIComponent(cat.name)}`} className="text-decoration-none">
                  <div className="dv-card p-4 h-100 text-center">
                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: 44, height: 44, backgroundColor: '#EEF2FF', color: '#4F46E5' }}>
                      <Compass size={20} />
                    </div>
                    <h6 className="fw-bold text-dark mb-1">{cat.name}</h6>
                    <p className="text-muted small mb-2">{cat.desc}</p>
                    <span className="dv-badge-primary small" style={{ fontSize: '0.72rem' }}>Browse Debates &rarr;</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Call to Action */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div className="p-5 rounded-4 text-center border" style={{ backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }}>
            <div className="d-inline-flex align-items-center gap-2 dv-badge-primary mb-3">
              <Award size={15} />
              <span>Join DebateVerse</span>
            </div>
            <h2 className="display-6 fw-bold text-dark mb-3">Ready to share your voice with fellow students?</h2>
            <p className="text-muted fs-6 mb-4 mx-auto" style={{ maxWidth: 540 }}>
              Create an account in 30 seconds, pick a side on any debate, share your argument, and see who agrees with you.
            </p>
            <div className="d-flex align-items-center justify-content-center gap-3">
              <Link to="/register" className="btn btn-dv-primary px-4 py-2">Create Student Account</Link>
              <Link to="/login" className="btn btn-dv-secondary px-4 py-2">Sign In</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
