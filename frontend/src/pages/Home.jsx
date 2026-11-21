import React from 'react';
import { Shield, ShieldAlert, Cpu, Lock, CheckCircle, ArrowRight, Zap, Target, BookOpen } from 'lucide-react';

export default function Home({ setActivePage }) {
  return (
    <div style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <div className="container">
        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto', marginBottom: '4.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '0.35rem 0.85rem', borderRadius: '999px', fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '1.5rem', fontWeight: 600 }}>
            <Zap size={14} />
            <span>Explainable Cognitive Threat Telemetry</span>
          </div>

          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1.25rem', color: '#ffffff' }}>
            Detect Psychological Manipulation in Investment Chats
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
            Scammers don't breach firewalls—they exploit human psychology. Our explainable NLP engine analyzes investment dialogues in real-time to identify artificial urgency, authority impersonation, impossible returns, and advance-fee entrapment.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="nav-cta"
              style={{ fontSize: '1rem', padding: '0.75rem 1.75rem' }}
              onClick={() => setActivePage('analyzer')}
            >
              <ShieldAlert size={18} />
              <span>Launch Conversation Analyzer</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => setActivePage('education')}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <BookOpen size={18} />
              <span>Explore Scam Taxonomy</span>
            </button>
          </div>
        </div>

        {/* The 5 Tactics Grid */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              The 5 Cognitive Attack Vectors We Detect
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              Every conversation is evaluated across five distinct psychological dimensions simultaneously.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="card" style={{ borderTop: '3px solid var(--accent-amber)' }}>
              <div style={{ color: 'var(--accent-amber)', marginBottom: '0.75rem' }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                1. Artificial Urgency
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Fabricated countdown clocks and limited slots engineered to trigger fear of missing out (FOMO) and short-circuit rational due diligence.
              </p>
            </div>

            <div className="card" style={{ borderTop: '3px solid var(--accent-purple)' }}>
              <div style={{ color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>
                <Shield size={24} />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                2. Authority Impersonation
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Falsified claims of regulatory oversight (SEBI, SEC, RBI) or institutional backing (Goldman, Barclays) used to enforce unquestioned obedience.
              </p>
            </div>

            <div className="card" style={{ borderTop: '3px solid var(--accent-red)' }}>
              <div style={{ color: 'var(--accent-red)', marginBottom: '0.75rem' }}>
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                3. Guaranteed Returns
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Promises of risk-free capital doubling and fixed daily or weekly yields that defy market fundamentals and statutory securities laws.
              </p>
            </div>

            <div className="card" style={{ borderTop: '3px solid var(--accent-cyan)' }}>
              <div style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
                <Cpu size={24} />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                4. Social Proof & Herd Pressure
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Fabricated community metrics, fake withdrawal screenshots, and Telegram testimonials engineered to manufacture false safety.
              </p>
            </div>

            <div className="card" style={{ borderTop: '3px solid var(--accent-orange)' }}>
              <div style={{ color: 'var(--accent-orange)', marginBottom: '0.75rem' }}>
                <Lock size={24} />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                5. Escalation & Sunk Cost
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Trapping victims into paying clearance fees, taxes, or VIP upgrades to unlock accrued balances or recover previous losses.
              </p>
            </div>
          </div>
        </div>

        {/* Architectural Principles */}
        <div className="card" style={{ padding: '2.5rem', background: 'linear-gradient(180deg, #162032 0%, #0d131f 100%)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            <div>
              <div style={{ color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                <CheckCircle size={22} />
              </div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Zero False Alarms on Safe Advice</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Context filtering and negation detection ensure statutory regulatory disclaimers and prudent long-term index discussions are not flagged.
              </p>
            </div>

            <div>
              <div style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                <Lock size={22} />
              </div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Total Privacy & Offline Safety</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                The NLP analysis runs in-memory. Conversations are never transmitted to external cloud LLMs or third-party servers.
              </p>
            </div>

            <div>
              <div style={{ color: 'var(--accent-purple)', marginBottom: '0.5rem' }}>
                <Cpu size={22} />
              </div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Explainable Evidence Extraction</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                No black-box guesses: every flagged tactic provides character-offset highlights, matched linguistic cues, and defensive actions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
