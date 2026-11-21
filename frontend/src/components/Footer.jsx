import React from 'react';
import { Shield, Lock, FileText, Github } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.75rem' }}>
              <Shield size={18} color="var(--accent-cyan)" />
              <span>Scam Tactic Detector</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              An explainable natural language processing engine designed to safeguard retail investors by detecting psychological manipulation vectors in conversational communications.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Platform Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <li><a href="#analyzer" onClick={(e) => { e.preventDefault(); setActivePage('analyzer'); }}>Conversation Analyzer</a></li>
              <li><a href="#education" onClick={(e) => { e.preventDefault(); setActivePage('education'); }}>Psychological Tactics Encyclopedia</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); setActivePage('about'); }}>System Architecture & Team</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Team Governance</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>Abhiman</strong> — Project Lead, AI/ML, Backend<br />
              <strong>Aryan</strong> — Frontend Development & UI/UX<br />
              <strong>Rohit</strong> — Dataset & Research<br />
              <strong>Abhishek</strong> — Testing & Documentation
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem' }}>
          <div>
            Mini Project Semester 3 • MIT Licensed • Single-Operator Autonomous Workspace Execution
          </div>
          <div style={{ color: 'var(--text-muted)' }}>
            Disclaimer: Risk scores are rule-based heuristic indicators and not a statistically validated guarantee of fraud.
          </div>
        </div>
      </div>
    </footer>
  );
}
