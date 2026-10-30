import React, { useState } from 'react';
import { aiApi } from '../services/api';
import { Sparkles, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const AiDebateLab = () => {
  const [topic, setTopic] = useState('Should homework be banned in primary and middle schools?');
  const [side, setSide] = useState('support');
  const [content, setContent] = useState(
    'Eliminating daily homework reduces unnecessary anxiety for young students and gives them more time for sleep, sports, and family activities. Studies show that excessive homework does not significantly improve academic test scores in younger grades.'
  );
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const samplePrompts = [
    {
      topic: 'Should homework be banned in primary and middle schools?',
      side: 'support',
      content: 'Eliminating daily homework reduces unnecessary anxiety for young students and gives them more time for sleep, sports, and family activities. Studies show that excessive homework does not significantly improve academic test scores in younger grades.'
    },
    {
      topic: 'Is social media doing more harm than good to teenagers?',
      side: 'support',
      content: 'Constant exposure to curated social media feeds fuels social anxiety, sleep deprivation, and unrealistic appearance standards among teenagers, leading to documented spikes in youth mental health distress.'
    },
    {
      topic: 'Should college education be completely free for all students?',
      side: 'oppose',
      content: 'While free college sounds appealing, offering universal free tuition places a massive burden on taxpayers and may devalue degrees if graduation requirements are lowered to accommodate unsustainable enrollment numbers.'
    }
  ];

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await aiApi.analyze({ topic, side, content });
      if (res.success && res.analysis) {
        setAnalysis(res.analysis);
      }
    } catch (err) {
      setError(err.message || 'Analysis service error.');
    } finally {
      setLoading(false);
    }
  };

  const loadSample = (s) => {
    setTopic(s.topic);
    setSide(s.side);
    setContent(s.content);
    setAnalysis(null);
  };

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: 880 }}>
        {/* Banner */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 dv-badge-primary mb-2">
            <Sparkles size={14} />
            <span>AI Argument Helper</span>
          </div>
          <h1 className="display-6 fw-bold text-dark mb-2">AI Argument Analyzer</h1>
          <p className="text-muted fs-6" style={{ maxWidth: 650, margin: '0 auto' }}>
            Test your argument before posting it to a debate. Get instant feedback on clarity, relevance, and what counter-arguments you might face.
          </p>
        </div>

        {/* Input Card */}
        <div className="dv-card p-4 p-md-5 mb-5">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
            <h5 className="fw-bold text-dark mb-0">Draft Your Argument</h5>
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted small">Try Example:</span>
              <button
                type="button"
                onClick={() => loadSample(samplePrompts[0])}
                className="btn btn-dv-secondary btn-sm py-1 px-2"
                style={{ fontSize: '0.75rem' }}
              >
                Homework Ban
              </button>
              <button
                type="button"
                onClick={() => loadSample(samplePrompts[1])}
                className="btn btn-dv-secondary btn-sm py-1 px-2"
                style={{ fontSize: '0.75rem' }}
              >
                Social Media
              </button>
              <button
                type="button"
                onClick={() => loadSample(samplePrompts[2])}
                className="btn btn-dv-secondary btn-sm py-1 px-2"
                style={{ fontSize: '0.75rem' }}
              >
                Free College
              </button>
            </div>
          </div>

          <form onSubmit={handleAnalyze} className="d-flex flex-column gap-3">
            <div>
              <label className="form-label fw-semibold text-dark small mb-1">Debate Question / Topic *</label>
              <input
                type="text"
                className="form-control dv-input"
                placeholder="e.g., Should video gaming be considered a sport?..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="form-label fw-semibold text-dark small mb-1">Your Stance *</label>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={() => setSide('support')}
                  className={`btn flex-grow-1 ${side === 'support' ? 'btn-dv-mint fw-bold' : 'btn-dv-secondary'}`}
                >
                  Support (Yes)
                </button>
                <button
                  type="button"
                  onClick={() => setSide('oppose')}
                  className={`btn flex-grow-1 ${side === 'oppose' ? 'btn-dv-coral fw-bold' : 'btn-dv-secondary'}`}
                >
                  Oppose (No)
                </button>
              </div>
            </div>

            <div>
              <label className="form-label fw-semibold text-dark small mb-1">Your Argument Draft *</label>
              <textarea
                className="form-control dv-input"
                rows="5"
                placeholder="Write your explanation, reasoning, or examples..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <div className="d-flex justify-content-between text-muted small mt-1">
                <span>{content.trim().split(/\s+/).filter(Boolean).length} words</span>
                <span>Minimum 15 characters</span>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger small py-2 mb-0" role="alert">
                {error}
              </div>
            )}

            <div className="pt-2 d-flex justify-content-end">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-dv-primary d-inline-flex align-items-center gap-2 px-4 py-2"
              >
                <Sparkles size={16} />
                <span>{loading ? 'Analyzing Argument...' : 'Analyze Argument'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Analysis Output Section */}
        {analysis && (
          <div className="dv-card p-4 p-md-5 section-alt border mb-4" style={{ borderColor: '#E2E8F0' }}>
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2 mb-4 pb-3 border-bottom">
              <div>
                <h4 className="fw-bold text-dark mb-1">Argument Review</h4>
                <p className="text-muted small mb-0">Here is how to make your point even stronger.</p>
              </div>
              <span className="dv-badge-primary small">
                {analysis.engine}
              </span>
            </div>

            {/* Score Cards */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-6">
                <div className="p-3 bg-white rounded-3 border">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-semibold text-dark small">Clarity Score</span>
                    <span className="fw-bold" style={{ color: '#15803D' }}>{analysis.clarityScore}%</span>
                  </div>
                  <div className="progress mb-2" style={{ height: 6 }}>
                    <div className="progress-bar" style={{ width: `${analysis.clarityScore}%`, backgroundColor: '#4F46E5' }}></div>
                  </div>
                  <p className="text-muted small mb-0">{analysis.clarityFeedback}</p>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="p-3 bg-white rounded-3 border">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-semibold text-dark small">Topic Relevance</span>
                    <span className="fw-bold" style={{ color: '#4338CA' }}>{analysis.relevanceScore}%</span>
                  </div>
                  <div className="progress mb-2" style={{ height: 6 }}>
                    <div className="progress-bar" style={{ width: `${analysis.relevanceScore}%`, backgroundColor: '#6366F1' }}></div>
                  </div>
                  <p className="text-muted small mb-0">{analysis.relevanceFeedback}</p>
                </div>
              </div>
            </div>

            {/* Logical Structure & Improvements */}
            <div className="d-flex flex-column gap-3 mb-4">
              <div className="p-3 bg-white rounded-3 border">
                <h6 className="fw-bold text-dark mb-1 small text-uppercase tracking-wider">Argument Flow & Structure</h6>
                <p className="text-secondary small mb-0">{analysis.logicalStructure}</p>
              </div>

              <div className="p-3 bg-white rounded-3 border">
                <h6 className="fw-bold text-dark mb-2 small text-uppercase tracking-wider">Opponent Points to Watch Out For</h6>
                <ul className="mb-0 text-secondary small ps-3">
                  {analysis.potentialCounterarguments?.map((counter, i) => (
                    <li key={i} className="mb-1">{counter}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-white rounded-3 border">
                <h6 className="fw-bold text-dark mb-1 small text-uppercase tracking-wider">How to Improve Persuasion</h6>
                <p className="text-secondary small mb-0">{analysis.reasoningImprovement}</p>
              </div>

              <div className="p-3 rounded-3 border small" style={{ backgroundColor: '#F8FAFC' }}>
                <strong className="text-dark d-block mb-1">&bull; Fact Checking Tip:</strong>
                <span className="text-muted">{analysis.sourceVerificationTip}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="p-3 bg-white rounded-3 border">
              <strong className="fw-semibold text-dark small d-block mb-1">Overall Assessment:</strong>
              <p className="text-secondary small mb-0">{analysis.summary}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
