import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { debatesApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CountdownTimer } from '../components/CountdownTimer';
import { 
  Users, MessageSquare, ThumbsUp, CheckCircle, 
  ExternalLink, ArrowLeft, Trophy, Sparkles, Send 
} from 'lucide-react';

export const DebateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [debate, setDebate] = useState(null);
  const [argumentsList, setArgumentsList] = useState([]);
  const [userSide, setUserSide] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Argument Form State
  const [argContent, setArgContent] = useState('');
  const [sourceLink, setSourceLink] = useState('');
  const [submittingArg, setSubmittingArg] = useState(false);
  const [argMessage, setArgMessage] = useState({ type: '', text: '' });

  const loadDebateData = async () => {
    try {
      const res = await debatesApi.getById(id);
      if (res.success) {
        setDebate(res.debate);
        setArgumentsList(res.arguments || []);
        setUserSide(res.userParticipation);
        setHasVoted(res.hasVoted);
        setResult(res.result);
      }
    } catch (err) {
      setError(err.message || 'Could not load debate details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDebateData();
  }, [id]);

  const handleJoinSide = async (side) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      const res = await debatesApi.join(id, side);
      if (res.success) {
        setUserSide(side);
        await loadDebateData();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleVote = async (argumentId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      const res = await debatesApi.vote(id, argumentId);
      if (res.success) {
        setHasVoted(true);
        await loadDebateData();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmitArgument = async (e) => {
    e.preventDefault();
    setArgMessage({ type: '', text: '' });

    if (!userSide) {
      setArgMessage({ type: 'danger', text: 'Please select Support or Oppose to join the debate first!' });
      return;
    }

    if (argContent.trim().length < 10) {
      setArgMessage({ type: 'danger', text: 'Argument must be at least 10 characters long.' });
      return;
    }

    setSubmittingArg(true);
    try {
      const res = await debatesApi.submitArgument(id, {
        content: argContent,
        sourceLinks: sourceLink ? [sourceLink] : []
      });

      if (res.success) {
        setArgMessage({ type: 'success', text: 'Your argument was posted successfully! (+10 points)' });
        setArgContent('');
        setSourceLink('');
        await loadDebateData();
      }
    } catch (err) {
      setArgMessage({ type: 'danger', text: err.message || 'Submission failed.' });
    } finally {
      setSubmittingArg(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-secondary" role="status"></div>
        <p className="text-muted small mt-2">Loading debate...</p>
      </div>
    );
  }

  if (!debate) {
    return (
      <div className="container py-5 text-center">
        <h4 className="fw-bold">Debate not found</h4>
        <Link to="/debates" className="btn btn-dv-secondary mt-3">Back to Debates</Link>
      </div>
    );
  }

  const isCompleted = debate.status === 'completed' || new Date(debate.deadline) <= new Date();
  const supportArgs = argumentsList.filter((a) => a.side === 'support');
  const opposeArgs = argumentsList.filter((a) => a.side === 'oppose');

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        <button onClick={() => navigate('/debates')} className="btn btn-link text-muted p-0 d-flex align-items-center gap-1 mb-3 text-decoration-none">
          <ArrowLeft size={16} /> Back to Debates
        </button>

        {/* Main Debate Header Card */}
        <div className="dv-card p-4 p-md-5 mb-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
            <div className="d-flex align-items-center gap-2">
              <span className="dv-badge-lavender">{debate.category}</span>
              <span className="dv-badge-mint d-flex align-items-center gap-1">
                <Users size={12} /> {debate.participants?.length || 0} debaters
              </span>
            </div>
            <CountdownTimer deadline={debate.deadline} onExpire={loadDebateData} />
          </div>

          <h2 className="fw-bold text-dark mb-3 lh-snug">{debate.title}</h2>

          {/* Proposition Statement Callout */}
          <div className="p-3 rounded-3 border mb-4" style={{ backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }}>
            <span className="text-uppercase tracking-wider fw-bold small text-muted d-block mb-1">The Motion / Question</span>
            <p className="fs-5 fw-medium text-dark mb-0">"{debate.statement}"</p>
          </div>

          <p className="text-secondary mb-4">{debate.description}</p>

          <div className="d-flex flex-wrap align-items-center justify-content-between pt-3 border-top text-muted small">
            <div>
              Started by <span className="fw-semibold text-dark">{debate.createdBy?.name || 'Student Debater'}</span> ({debate.createdBy?.college || 'Campus Member'})
            </div>
            <div>
              Status: <span className="fw-medium text-dark">{isCompleted ? 'Round Completed' : 'Active Discussion'}</span>
            </div>
          </div>
        </div>

        {/* Concluded Round Results Banner */}
        {isCompleted && result && (
          <div className="dv-card p-4 mb-4 section-alt border" style={{ borderColor: '#E2E8F0' }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <Trophy size={20} style={{ color: '#D97706' }} />
              <h4 className="fw-bold text-dark mb-0">Debate Outcome & Results</h4>
            </div>
            <p className="text-muted small mb-3">Voting has closed for this debate. Here is how fellow students voted:</p>
            <div className="row g-3 text-center">
              <div className="col-4">
                <div className="p-3 bg-white rounded-3 border">
                  <span className="text-muted small d-block mb-1">Support Votes</span>
                  <span className="fs-4 fw-bold" style={{ color: '#15803D' }}>{result.supportVotes}</span>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 bg-white rounded-3 border">
                  <span className="text-muted small d-block mb-1">Oppose Votes</span>
                  <span className="fs-4 fw-bold" style={{ color: '#991B1B' }}>{result.opposeVotes}</span>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 bg-white rounded-3 border">
                  <span className="text-muted small d-block mb-1">Audience Verdict</span>
                  <span className="fs-5 fw-bold text-uppercase" style={{ color: result.winner === 'support' ? '#15803D' : (result.winner === 'oppose' ? '#991B1B' : '#4338CA') }}>
                    {result.winner === 'tie' ? 'Tie / Equal Votes' : `${result.winner} Won`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stance Selection Bar */}
        {!isCompleted && (
          <div className="dv-card p-4 mb-4">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
              <div>
                <h5 className="fw-bold text-dark mb-1">Choose Your Stance</h5>
                <p className="text-muted small mb-0">
                  {userSide ? (
                    <span>You are defending the <strong className="text-uppercase text-dark">{userSide}</strong> side.</span>
                  ) : (
                    <span>Which side do you agree with? Pick Support or Oppose to participate.</span>
                  )}
                </p>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  onClick={() => handleJoinSide('support')}
                  className={`btn ${userSide === 'support' ? 'btn-dv-mint fw-bold' : 'btn-dv-secondary'} d-flex align-items-center gap-2`}
                >
                  <CheckCircle size={16} />
                  <span>Support (Yes)</span>
                </button>
                <button
                  onClick={() => handleJoinSide('oppose')}
                  className={`btn ${userSide === 'oppose' ? 'btn-dv-coral fw-bold' : 'btn-dv-secondary'} d-flex align-items-center gap-2`}
                >
                  <CheckCircle size={16} />
                  <span>Oppose (No)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Argument Submission Form */}
        {!isCompleted && userSide && (
          <div className="dv-card p-4 mb-4">
            <h5 className="fw-bold text-dark mb-2">Submit an Argument on the {userSide.toUpperCase()} Side</h5>
            <p className="text-muted small mb-3">Write your reasoning clearly. You can also paste an optional web source or reference (+10 points).</p>

            {argMessage.text && (
              <div className={`alert alert-${argMessage.type} small py-2 mb-3`} role="alert">
                {argMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmitArgument} className="d-flex flex-column gap-3">
              <div>
                <textarea
                  className="form-control dv-input"
                  rows="4"
                  placeholder="Explain why you support or oppose this statement. Give at least one clear reason or example..."
                  value={argContent}
                  onChange={(e) => setArgContent(e.target.value)}
                  required
                />
                <div className="d-flex justify-content-between text-muted small mt-1">
                  <span>Minimum 10 characters</span>
                  <span>{argContent.length} characters</span>
                </div>
              </div>

              <div>
                <input
                  type="url"
                  className="form-control dv-input"
                  placeholder="Optional reference / article link (e.g., https://...)"
                  value={sourceLink}
                  onChange={(e) => setSourceLink(e.target.value)}
                />
              </div>

              <div className="d-flex align-items-center justify-content-between pt-2">
                <Link to="/ai-lab" className="text-secondary small d-flex align-items-center gap-1 text-decoration-none">
                  <Sparkles size={14} style={{ color: '#4F46E5' }} /> Test argument in AI Debate Lab first
                </Link>
                <button type="submit" disabled={submittingArg} className="btn btn-dv-primary d-flex align-items-center gap-2">
                  <Send size={15} />
                  <span>{submittingArg ? 'Posting...' : 'Submit Argument'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Dual Argument Columns: Support vs Oppose */}
        <div className="row g-4">
          {/* Support Column */}
          <div className="col-12 col-lg-6">
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
              <div className="d-flex align-items-center gap-2">
                <span className="dv-badge-mint fw-bold">SUPPORT ARGUMENTS (YES)</span>
                <span className="text-muted small">({supportArgs.length})</span>
              </div>
            </div>

            {supportArgs.length === 0 ? (
              <div className="dv-card p-4 text-center text-muted small">
                No arguments on the Support side yet. Be the first to share your view!
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {supportArgs.map((arg) => (
                  <div key={arg._id} className="dv-card p-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="fw-semibold text-dark small">{arg.studentId?.name || 'Student Debater'}</span>
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {new Date(arg.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-secondary small mb-3 lh-base">{arg.content}</p>

                    {arg.sourceLinks && arg.sourceLinks.length > 0 && (
                      <div className="mb-3">
                        {arg.sourceLinks.map((link, i) => (
                          <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="d-inline-flex align-items-center gap-1 text-muted small me-2 text-decoration-none">
                            <ExternalLink size={12} /> View Reference
                          </a>
                        ))}
                      </div>
                    )}

                    <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                      <span className="text-muted small fw-medium">{arg.votesCount || 0} votes</span>
                      {!isCompleted && (
                        <button
                          onClick={() => handleVote(arg._id)}
                          disabled={hasVoted || (user && user._id === arg.studentId?._id)}
                          className="btn btn-dv-secondary btn-sm d-flex align-items-center gap-1"
                        >
                          <ThumbsUp size={13} />
                          <span>{hasVoted ? 'Voted' : 'Vote Argument'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Oppose Column */}
          <div className="col-12 col-lg-6">
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
              <div className="d-flex align-items-center gap-2">
                <span className="dv-badge-coral fw-bold">OPPOSE ARGUMENTS (NO)</span>
                <span className="text-muted small">({opposeArgs.length})</span>
              </div>
            </div>

            {opposeArgs.length === 0 ? (
              <div className="dv-card p-4 text-center text-muted small">
                No arguments on the Oppose side yet. Be the first to counter!
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {opposeArgs.map((arg) => (
                  <div key={arg._id} className="dv-card p-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="fw-semibold text-dark small">{arg.studentId?.name || 'Student Debater'}</span>
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {new Date(arg.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-secondary small mb-3 lh-base">{arg.content}</p>

                    {arg.sourceLinks && arg.sourceLinks.length > 0 && (
                      <div className="mb-3">
                        {arg.sourceLinks.map((link, i) => (
                          <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="d-inline-flex align-items-center gap-1 text-muted small me-2 text-decoration-none">
                            <ExternalLink size={12} /> View Reference
                          </a>
                        ))}
                      </div>
                    )}

                    <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                      <span className="text-muted small fw-medium">{arg.votesCount || 0} votes</span>
                      {!isCompleted && (
                        <button
                          onClick={() => handleVote(arg._id)}
                          disabled={hasVoted || (user && user._id === arg.studentId?._id)}
                          className="btn btn-dv-secondary btn-sm d-flex align-items-center gap-1"
                        >
                          <ThumbsUp size={13} />
                          <span>{hasVoted ? 'Voted' : 'Vote Argument'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
