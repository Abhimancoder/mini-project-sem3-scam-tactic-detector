import React, { useState, useEffect } from 'react';
import { fetchTactics } from '../services/api';
import { BookOpen, AlertTriangle, ShieldCheck, Zap, Lock, Users, Target, ShieldAlert } from 'lucide-react';

export default function Education() {
  const [tactics, setTactics] = useState([]);

  useEffect(() => {
    fetchTactics()
      .then(data => setTactics(data))
      .catch(err => console.error('Failed to fetch tactics:', err));
  }, []);

  const getTacticIcon = (id) => {
    switch (id) {
      case 'urgency': return <Zap size={22} color="var(--accent-amber)" />;
      case 'authority': return <ShieldAlert size={22} color="var(--accent-purple)" />;
      case 'guaranteed_returns': return <Target size={22} color="var(--accent-red)" />;
      case 'social_proof': return <Users size={22} color="var(--accent-cyan)" />;
      case 'escalation': return <Lock size={22} color="var(--accent-orange)" />;
      default: return <BookOpen size={22} color="var(--accent-cyan)" />;
    }
  };

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent-cyan)', padding: '0.3rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem' }}>
            <BookOpen size={14} />
            <span>Fraud Prevention & Investor Awareness</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            The Psychology of Investment Fraud
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Scams succeed not because victims lack intelligence, but because fraudsters engineer high-stress cognitive scenarios that paralyze critical judgment. Master the five primary tactics below to safeguard yourself and others.
          </p>
        </div>

        {/* Tactics Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
          {tactics.map(tactic => (
            <div key={tactic.id} className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#0a0e17', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  {getTacticIcon(tactic.id)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {tactic.name}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Tactic ID: {tactic.id}
                  </span>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.975rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {tactic.description}
              </p>

              <div style={{ background: '#0a0e17', borderRadius: '8px', padding: '1.25rem', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Psychological Mechanism Exploited
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                  {tactic.psychologicalMechanism}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.25rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                    Common Predator Phrases
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {tactic.commonExamples.map((ex, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-amber)' }}>"</span>
                        <span style={{ fontStyle: 'italic' }}>{ex}</span>
                        <span style={{ color: 'var(--accent-amber)' }}>"</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                    Critical Red Flags
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {tactic.redFlags.map((flag, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-red)' }}>⚠️</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '6px', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck size={20} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: '#d1fae5', fontWeight: 500 }}>
                  <strong>Defensive Rule:</strong> {tactic.defensiveRule}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Fiduciary vs Predatory Table */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            Comparison: Legitimate Financial Advisory vs Predatory Scams
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Dimension</th>
                  <th style={{ padding: '0.75rem 1rem', color: 'var(--accent-emerald)' }}>Legitimate Financial Advisory</th>
                  <th style={{ padding: '0.75rem 1rem', color: 'var(--accent-red)' }}>Predatory Scam Scheme</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Decision Timeframe</td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>Encourages careful reading of prospectus and consultation with family/lawyers.</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#fca5a5' }}>Demands instantaneous wire/crypto transfers within minutes or hours.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Return Expectations</td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>Discloses market volatility and statutory capital loss risks.</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#fca5a5' }}>Promises 100% guaranteed profit, zero risk, and doubling money overnight.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Withdrawal Process</td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>Fees & taxes are deducted directly from balance upon execution.</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#fca5a5' }}>Demands separate advance deposits or "clearance fees" before releasing funds.</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Communication Channel</td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>Official corporate domains, verified apps, and certified in-branch meetings.</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#fca5a5' }}>Unsolicited Telegram, WhatsApp, or Instagram direct messages.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
