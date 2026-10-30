import React, { useState, useEffect } from 'react';
import { analyticsApi } from '../services/api';
import { Trophy, Award, BarChart2, MessageSquare, ThumbsUp, CheckCircle } from 'lucide-react';

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [leadRes, dashRes] = await Promise.all([
          analyticsApi.getLeaderboard(),
          analyticsApi.getDashboard()
        ]);

        if (leadRes.success) setLeaderboard(leadRes.leaderboard || []);
        if (dashRes.success) setDashboardData(dashRes);
      } catch (err) {
        console.warn('Analytics loading error:', err.message);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        {/* Banner */}
        <div className="text-center mb-5" style={{ maxWidth: 780, margin: '0 auto' }}>
          <div className="d-inline-flex align-items-center gap-2 dv-badge-primary mb-2">
            <BarChart2 size={14} />
            <span>Debater Rankings & Analytics</span>
          </div>
          <h1 className="display-6 fw-bold text-dark mb-2">Student Leaderboard</h1>
          <p className="text-muted fs-6">
            Real-time rankings based on debate participation, constructive arguments submitted, and peer votes received.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="d-flex justify-content-center mb-4">
          <div className="p-1 rounded-pill bg-light border d-inline-flex gap-1">
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`btn btn-sm rounded-pill px-4 py-2 ${activeTab === 'leaderboard' ? 'btn-dv-primary fw-semibold' : 'btn-link text-secondary text-decoration-none'}`}
            >
              Top Debaters
            </button>
            <button
              onClick={() => setActiveTab('platform')}
              className={`btn btn-sm rounded-pill px-4 py-2 ${activeTab === 'platform' ? 'btn-dv-primary fw-semibold' : 'btn-link text-secondary text-decoration-none'}`}
            >
              Debate Activity Insights
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-secondary" role="status"></div>
            <p className="text-muted small mt-2">Loading leaderboard stats...</p>
          </div>
        ) : (
          <div>
            {/* Tab 1: Leaderboard */}
            {activeTab === 'leaderboard' && (
              <div className="dv-card p-4 p-md-5 mb-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <h4 className="fw-bold text-dark mb-1">Debater Rankings</h4>
                    <p className="text-muted small mb-0">Ranked by total points earned through arguments and community votes.</p>
                  </div>
                  <span className="dv-badge-lavender small">Updated Real-Time</span>
                </div>

                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light text-muted small text-uppercase tracking-wider">
                      <tr>
                        <th style={{ width: '8%' }}>Rank</th>
                        <th>Student Name & College</th>
                        <th className="text-center">Arguments Posted</th>
                        <th className="text-center">Votes Won</th>
                        <th className="text-end">Total Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((s) => (
                        <tr key={s.id}>
                          <td>
                            <div className="d-flex align-items-center justify-content-center rounded-circle fw-bold" style={{
                              width: 32,
                              height: 32,
                              backgroundColor: s.rank === 1 ? '#FEF3C7' : (s.rank === 2 ? '#E0E7FF' : '#F8FAFC'),
                              border: `1px solid ${s.rank === 1 ? '#FDE68A' : '#E2E8F0'}`,
                              color: '#0F172A'
                            }}>
                              {s.rank === 1 ? '🥇' : (s.rank === 2 ? '🥈' : (s.rank === 3 ? '🥉' : s.rank))}
                            </div>
                          </td>
                          <td>
                            <div className="fw-semibold text-dark">{s.name}</div>
                            <div className="text-muted small">{s.college}</div>
                          </td>
                          <td className="text-center">
                            <span className="dv-badge-mint small">{s.argumentsCount}</span>
                          </td>
                          <td className="text-center">
                            <span className="dv-badge-primary small">{s.votesReceived}</span>
                          </td>
                          <td className="text-end">
                            <span className="fs-5 fw-bold text-dark">{s.totalPoints}</span>
                            <span className="text-muted small ms-1">pts</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: Platform Debate Activity Insights */}
            {activeTab === 'platform' && dashboardData && (
              <div className="d-flex flex-column gap-4">
                <div className="row g-4">
                  {/* Category Breakdown */}
                  <div className="col-12 col-md-6">
                    <div className="dv-card p-4 h-100">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="fw-bold text-dark mb-0">Debates by Subject Area</h5>
                        <span className="dv-badge-mint small">Popular Disciplines</span>
                      </div>
                      <p className="text-muted small mb-3">Distribution of debate topics created across categories.</p>

                      <div className="d-flex flex-column gap-3">
                        {dashboardData.categoryCounts?.map((c) => (
                          <div key={c._id} className="d-flex align-items-center justify-content-between p-3 bg-white rounded-3 border">
                            <span className="fw-semibold text-dark small">{c._id}</span>
                            <span className="dv-badge-primary">{c.count} debates</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Active vs Concluded */}
                  <div className="col-12 col-md-6">
                    <div className="dv-card p-4 h-100">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="fw-bold text-dark mb-0">Round Status</h5>
                        <span className="dv-badge-lavender small">Participation</span>
                      </div>
                      <p className="text-muted small mb-3">Active discussions currently open for arguments and votes.</p>

                      <div className="d-flex flex-column gap-3">
                        {dashboardData.statusCounts?.map((s) => (
                          <div key={s._id} className="d-flex align-items-center justify-content-between p-3 bg-white rounded-3 border">
                            <span className="fw-semibold text-dark text-capitalize small">{s._id} Rounds</span>
                            <span className="dv-badge-mint">{s.count} topics</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stance Breakdown (Support vs Oppose) */}
                {dashboardData.voteTotalsBySide && (
                  <div className="dv-card p-4">
                    <h5 className="fw-bold text-dark mb-1">Overall Stance Breakdown</h5>
                    <p className="text-muted small mb-4">Total arguments and peer votes across Support and Oppose stances.</p>
                    <div className="row g-3">
                      {dashboardData.voteTotalsBySide.map((side) => (
                        <div className="col-12 col-md-6" key={side._id}>
                          <div className="p-4 rounded-3 border" style={{ backgroundColor: side._id === 'support' ? '#F0FDF4' : '#FEF2F2', borderColor: side._id === 'support' ? '#BBF7D0' : '#FECACA' }}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="fw-bold text-uppercase fs-6" style={{ color: side._id === 'support' ? '#15803D' : '#991B1B' }}>
                                {side._id === 'support' ? 'Support Stance (Yes)' : 'Oppose Stance (No)'}
                              </span>
                              <span className="badge" style={{ backgroundColor: side._id === 'support' ? '#DCFCE7' : '#FEE2E2', color: side._id === 'support' ? '#166534' : '#991B1B' }}>
                                {side.totalArguments} Arguments
                              </span>
                            </div>
                            <div className="fs-3 fw-bold text-dark">{side.totalVotes} votes</div>
                            <span className="text-muted small">Casted by student peers</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
