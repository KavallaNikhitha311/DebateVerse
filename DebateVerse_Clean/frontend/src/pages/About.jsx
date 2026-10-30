import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ShieldCheck, Award, BookOpen, Clock, CheckCircle } from 'lucide-react';

export const About = () => {
  return (
    <div className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: 860 }}>
        <div className="text-center mb-5">
          <span className="dv-badge-primary mb-2 d-inline-block">About DebateVerse</span>
          <h1 className="display-5 fw-bold text-dark mb-3">Learn to Disagree Respectfully</h1>
          <p className="text-muted fs-5">
            DebateVerse is an interactive platform built for students to exchange ideas, practice constructive arguments, and learn how to view topics from multiple sides.
          </p>
        </div>

        <div className="dv-card p-4 p-md-5 mb-4">
          <h4 className="fw-bold text-dark mb-3">Why DebateVerse Exists</h4>
          <p className="text-secondary lh-lg mb-4">
            Most online discussions quickly turn into shouting matches. DebateVerse creates a calmer, structured environment where ideas are judged by their clarity and evidence, not by who yells the loudest. Debating helps you think critically, write persuasively, and understand opinions different from your own.
          </p>

          <h5 className="fw-semibold text-dark mb-3">How the Platform Works</h5>
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <div className="p-3 rounded-3 section-alt border h-100">
                <div className="d-flex align-items-center gap-2 mb-2 text-dark fw-semibold">
                  <Clock size={16} /> 1. Timed Debate Rounds
                </div>
                <p className="text-muted small mb-0">
                  Each debate has a countdown timer so discussions remain lively and prompt. Once the round completes, final votes are calculated.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="p-3 rounded-3 section-alt border h-100">
                <div className="d-flex align-items-center gap-2 mb-2 text-dark fw-semibold">
                  <MessageSquare size={16} /> 2. Support & Oppose Sides
                </div>
                <p className="text-muted small mb-0">
                  Choose which stance you support and post your reason. Both sides are displayed side-by-side so everyone can see both viewpoints.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="p-3 rounded-3 section-alt border h-100">
                <div className="d-flex align-items-center gap-2 mb-2 text-dark fw-semibold">
                  <Award size={16} /> 3. Fair Peer Voting
                </div>
                <p className="text-muted small mb-0">
                  Students vote for the argument that they found most convincing. Every student gets exactly one vote per debate topic.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="p-3 rounded-3 section-alt border h-100">
                <div className="d-flex align-items-center gap-2 mb-2 text-dark fw-semibold">
                  <ShieldCheck size={16} /> 4. AI Feedback Helper
                </div>
                <p className="text-muted small mb-0">
                  Before posting, you can test your argument in our AI Lab to get feedback on clarity, structure, and potential counter-points.
                </p>
              </div>
            </div>
          </div>

          <h5 className="fw-semibold text-dark mb-3">DebateVerse Community Guidelines</h5>
          <div className="p-4 rounded-3 section-alt border mb-4">
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0 small text-secondary">
              <li className="d-flex align-items-start gap-2">
                <CheckCircle size={16} className="text-success mt-1 flex-shrink-0" />
                <span><strong>Be Civil:</strong> Critique the argument, never attack the person making it.</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <CheckCircle size={16} className="text-success mt-1 flex-shrink-0" />
                <span><strong>Explain Your Reasons:</strong> Give at least one fact, personal experience, or logical point.</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <CheckCircle size={16} className="text-success mt-1 flex-shrink-0" />
                <span><strong>Stay Open-Minded:</strong> Read the other side's arguments honestly before voting.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link to="/debates" className="btn btn-dv-primary px-4 py-2">Start Exploring Debates</Link>
        </div>
      </div>
    </div>
  );
};
