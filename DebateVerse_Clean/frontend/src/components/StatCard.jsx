import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, color = 'indigo' }) => {
  const colorMap = {
    indigo: { bg: '#EEF2FF', border: '#C7D2FE', text: '#4338CA' },
    lavender: { bg: '#F3E8FF', border: '#E9D5FF', text: '#6B21A8' },
    blue: { bg: '#E0F2FE', border: '#BAE6FD', text: '#0369A1' },
    mint: { bg: '#DCFCE7', border: '#BBF7D0', text: '#15803D' },
    amber: { bg: '#FEF3C7', border: '#FDE68A', text: '#B45309' }
  };

  const currentTheme = colorMap[color] || colorMap.indigo;

  return (
    <div className="dv-card p-4 h-100">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <span className="text-muted small fw-medium text-uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: 36, height: 36, backgroundColor: currentTheme.bg, border: `1px solid ${currentTheme.border}`, color: currentTheme.text }}>
            <Icon size={18} />
          </div>
        )}
      </div>
      <div className="fs-3 fw-bold text-dark mb-1">{value}</div>
      {subtitle && <div className="text-muted small">{subtitle}</div>}
    </div>
  );
};
