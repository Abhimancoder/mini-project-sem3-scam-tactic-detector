import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, ShieldAlert, AlertTriangle } from 'lucide-react';

export default function TacticCard({ tactic }) {
  const [expanded, setExpanded] = useState(tactic.detected);

  const getBorderColor = () => {
    if (!tactic.detected) return 'var(--border-color)';
    switch (tactic.id) {
      case 'urgency': return 'rgba(245, 158, 11, 0.5)';
      case 'authority': return 'rgba(168, 85, 247, 0.5)';
      case 'guaranteed_returns': return 'rgba(239, 68, 68, 0.5)';
      case 'social_proof': return 'rgba(56, 189, 248, 0.5)';
      case 'escalation': return 'rgba(249, 115, 22, 0.5)';
      default: return 'var(--border-color)';
    }
  };

  const getConfidenceBadge = () => {
    if (!tactic.detected) {
      return (
        <span className="badge" style={{ background: 'rgba(100, 116, 139, 0.15)', color: 'var(--text-muted)', border: '1px solid rgba(100, 116, 139, 0.3)' }}>
          NOT DETECTED
        </span>
      );
    }
    const color = tactic.confidence === 'HIGH' ? 'var(--accent-red)' : 'var(--accent-amber)';
    return (
      <span className="badge" style={{ background: `${color}15`, color, border: `1px solid ${color}40` }}>
        {tactic.confidence} CONFIDENCE
      </span>
    );
  };

  return (
    <div
      className="card"
      style={{
        borderLeft: tactic.detected ? `4px solid ${getBorderColor()}` : '1px solid var(--border-color)',
        marginBottom: '1rem',
        padding: '1.25rem',
        background: tactic.detected ? 'rgba(22, 32, 50, 0.85)' : 'rgba(17, 24, 39, 0.4)'
      }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {tactic.detected ? (
            <ShieldAlert size={20} color="var(--accent-red)" />
          ) : (
            <CheckCircle2 size={20} color="var(--accent-emerald)" />
          )}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 600 }}>
              {tactic.name}
            </h4>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Category: {tactic.category}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {getConfidenceBadge()}
          <button
            style={{ background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}
            aria-label="Toggle details"
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
            {tactic.explanation}
          </p>

          {tactic.detected && tactic.evidencePhrases && tactic.evidencePhrases.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Flagged Linguistic Evidence:
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                {tactic.evidencePhrases.map((phrase, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#fca5a5',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px'
                    }}
                  >
                    "{phrase}"
                  </span>
                ))}
              </div>
            </div>
          )}

          {tactic.detected && tactic.warning && (
            <div
              style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '6px',
                padding: '0.75rem 1rem',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}
            >
              <AlertTriangle size={18} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.825rem', color: 'var(--accent-amber)', display: 'block', marginBottom: '0.2rem' }}>
                  Defensive Countermeasure
                </strong>
                <span style={{ fontSize: '0.825rem', color: '#fef3c7', lineHeight: 1.5 }}>
                  {tactic.warning}
                </span>
              </div>
            </div>
          )}

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <strong>Action:</strong> {tactic.recommendedAction}
          </div>
        </div>
      )}
    </div>
  );
}
