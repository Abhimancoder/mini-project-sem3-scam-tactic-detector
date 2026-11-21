import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, AlertOctagon, Info } from 'lucide-react';

export default function RiskMeter({ riskAssessment }) {
  if (!riskAssessment) return null;

  const { score, level, label, color, description, synergyMultiplier, disclaimer } = riskAssessment;

  // SVG Gauge calculations
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  // Use a 270 degree arc (3/4 of a circle)
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * Math.min(100, Math.max(0, score))) / 100;

  const getRiskIcon = () => {
    switch (level) {
      case 'SAFE':
        return <CheckCircle size={28} color="#10b981" />;
      case 'LOW_RISK':
        return <Info size={28} color="#3b82f6" />;
      case 'MODERATE_RISK':
        return <AlertTriangle size={28} color="#f59e0b" />;
      case 'HIGH_RISK':
        return <ShieldAlert size={28} color="#f97316" />;
      case 'CRITICAL_RISK':
      default:
        return <AlertOctagon size={28} color="#ef4444" />;
    }
  };

  const getBadgeClass = () => {
    switch (level) {
      case 'SAFE': return 'badge-safe';
      case 'LOW_RISK': return 'badge-low';
      case 'MODERATE_RISK': return 'badge-moderate';
      case 'HIGH_RISK': return 'badge-high';
      default: return 'badge-critical';
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(135deg)' }}>
          {/* Background Track */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="transparent"
            stroke="#1e293b"
            strokeWidth="12"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Active Score Arc */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="12"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.3s ease' }}
          />
        </svg>

        {/* Center Content */}
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ marginBottom: '0.2rem' }}>{getRiskIcon()}</div>
          <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
            {score}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Risk Index
          </span>
        </div>
      </div>

      <div style={{ marginTop: '0.75rem' }}>
        <span className={`badge ${getBadgeClass()}`} style={{ fontSize: '0.85rem', padding: '0.35rem 0.85rem' }}>
          {label}
        </span>
      </div>

      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '340px', lineHeight: 1.5 }}>
        {description}
      </p>

      {synergyMultiplier > 1.0 && (
        <div style={{
          marginTop: '1rem',
          padding: '0.4rem 0.8rem',
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: '6px',
          fontSize: '0.75rem',
          color: '#fca5a5'
        }}>
          Multi-tactic escalation detected (×{synergyMultiplier.toFixed(2)} psychological synergy)
        </div>
      )}

      <div style={{ marginTop: '1.25rem', fontSize: '0.725rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
        {disclaimer}
      </div>
    </div>
  );
}
