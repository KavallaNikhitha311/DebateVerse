import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="dv-footer py-5 mt-auto">
      <div className="container">
        <div className="row g-4 justify-content-between">
          {/* Column 1: Brand & About */}
          <div className="col-12 col-md-5">
            <div className="d-flex align-items-center gap-2 mb-2">
              <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: 32, height: 32, backgroundColor: '#4F46E5', color: '#FFFFFF' }}>
                <MessageSquare size={17} />
              </div>
              <span className="fw-bold fs-5 text-dark">Debate<span style={{ color: '#4F46E5' }}>Verse</span></span>
            </div>
            <p className="text-muted small mb-3" style={{ maxWidth: 360 }}>
              An interactive online debate and discussion platform empowering students to explore different perspectives, defend opinions with evidence, and develop critical communication skills.
            </p>
            <div className="dv-badge-primary d-inline-block small">
              Educational Debate Community
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="col-6 col-md-3">
            <h6 className="fw-semibold text-dark mb-3 small text-uppercase tracking-wider">Explore Platform</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-muted">
              <li><Link to="/debates" className="text-secondary">All Debates</Link></li>
              <li><Link to="/blog" className="text-secondary">Knowledge Hub</Link></li>
              <li><Link to="/resources" className="text-secondary">Reference Library</Link></li>
              <li><Link to="/leaderboard" className="text-secondary">Student Leaderboard</Link></li>
              <li><Link to="/ai-lab" className="text-secondary">AI Argument Analyzer</Link></li>
              <li><Link to="/todo" className="text-secondary">Prep Checklist</Link></li>
            </ul>
          </div>

          {/* Column 3: Debate Rules & Conduct */}
          <div className="col-6 col-md-4">
            <h6 className="fw-semibold text-dark mb-3 small text-uppercase tracking-wider">Debate Ethics & Rules</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-muted">
              <li className="d-flex align-items-start gap-2">
                <ShieldCheck size={15} className="mt-1 text-primary flex-shrink-0" />
                <span><strong>Respectful Disagreement:</strong> Focus on arguments, not individuals.</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <ShieldCheck size={15} className="mt-1 text-primary flex-shrink-0" />
                <span><strong>Evidence-Based:</strong> Support claims with credible facts and sources.</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <ShieldCheck size={15} className="mt-1 text-primary flex-shrink-0" />
                <span><strong>Fair Voting:</strong> One objective vote per debater per round.</span>
              </li>
            </ul>
            <Link to="/about" className="btn btn-dv-secondary btn-sm mt-2">Read About DebateVerse</Link>
          </div>
        </div>

        <div className="border-top pt-4 mt-4 d-flex flex-column flex-sm-row align-items-center justify-content-between text-muted small">
          <div>
            &copy; {new Date().getFullYear()} DebateVerse. Clean, modern, respectful student debate platform.
          </div>
          <div className="mt-2 mt-sm-0">
            <span>Built for student discussions, opinions, and constructive dialogue</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
