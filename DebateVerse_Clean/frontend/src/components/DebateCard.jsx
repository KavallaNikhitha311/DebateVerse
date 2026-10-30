import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

export const DebateCard = ({ debate }) => {
  const isCompleted = debate.status === 'completed' || new Date(debate.deadline) <= new Date();

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Technology & AI': return 'dv-badge-lavender';
      case 'Education & Schools': return 'dv-badge-primary';
      case 'Society & Life': return 'dv-badge-blue';
      case 'Environment & Nature': return 'dv-badge-mint';
      case 'Culture & Gaming': return 'dv-badge-amber';
      default: return 'dv-badge-primary';
    }
  };

  return (
    <div className="dv-card p-4 h-100 d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between mb-3 gap-2">
        <span className={getCategoryBadgeClass(debate.category)}>
          {debate.category}
        </span>
        <CountdownTimer deadline={debate.deadline} />
      </div>

      <h5 className="fw-semibold text-dark mb-2 lh-snug">
        <Link to={`/debates/${debate._id}`} className="text-dark text-decoration-none">
          {debate.title}
        </Link>
      </h5>

      <p className="text-muted small mb-3 flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {debate.statement}
      </p>

      <div className="pt-3 border-top d-flex align-items-center justify-content-between text-muted small">
        <div className="d-flex align-items-center gap-3">
          <span className="d-flex align-items-center gap-1" title="Participants">
            <Users size={14} /> {debate.participants?.length || 0} debaters
          </span>
          <span className="d-flex align-items-center gap-1">
            <span className={`rounded-circle d-inline-block ${isCompleted ? 'bg-secondary' : 'bg-success'}`} style={{ width: 8, height: 8 }}></span>
            {isCompleted ? 'Finished' : 'Live'}
          </span>
        </div>

        <Link to={`/debates/${debate._id}`} className="btn btn-dv-secondary btn-sm d-flex align-items-center gap-1">
          <span>Enter Arena</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
};
