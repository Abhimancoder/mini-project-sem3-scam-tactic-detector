import React, { useEffect, useState } from 'react';
import { Shield, ShieldAlert, Cpu, BookOpen, Info, Activity } from 'lucide-react';
import { checkServerHealth } from '../services/api';

export default function Navbar({ activePage, setActivePage }) {
  const [serverOnline, setServerOnline] = useState(null);

  useEffect(() => {
    checkServerHealth().then(status => setServerOnline(status));
    const interval = setInterval(() => {
      checkServerHealth().then(status => setServerOnline(status));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      <div className="container nav-wrapper">
        <div className="brand-logo" onClick={() => setActivePage('home')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">
            <Shield size={22} />
          </div>
          <div>
            <span>Scam Tactic Detector</span>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 400 }}>
              Cognitive Threat Intelligence
            </div>
          </div>
        </div>

        <ul className="nav-links">
          <li>
            <button
              className={`nav-link-btn ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => setActivePage('home')}
            >
              Overview
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activePage === 'analyzer' ? 'active' : ''}`}
              onClick={() => setActivePage('analyzer')}
            >
              Analyzer
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activePage === 'education' ? 'active' : ''}`}
              onClick={() => setActivePage('education')}
            >
              Scam Encyclopedia
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activePage === 'about' ? 'active' : ''}`}
              onClick={() => setActivePage('about')}
            >
              About & Team
            </button>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            title={serverOnline ? 'Backend API Connected' : 'Backend API Disconnected'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              padding: '0.3rem 0.6rem',
              borderRadius: '999px',
              background: serverOnline ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              color: serverOnline ? 'var(--accent-emerald)' : 'var(--accent-red)',
              border: `1px solid ${serverOnline ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: serverOnline ? '#10b981' : '#ef4444',
                boxShadow: serverOnline ? '0 0 6px #10b981' : 'none'
              }}
            />
            {serverOnline ? 'API Active' : 'API Standby'}
          </div>

          <button className="nav-cta" onClick={() => setActivePage('analyzer')}>
            <ShieldAlert size={16} />
            <span>Audit Text</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
