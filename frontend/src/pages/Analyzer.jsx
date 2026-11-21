import React, { useState, useEffect } from 'react';
import { analyzeConversation, fetchSamples } from '../services/api';
import RiskMeter from '../components/RiskMeter';
import HighlightedText from '../components/HighlightedText';
import TacticCard from '../components/TacticCard';
import { ShieldAlert, RefreshCw, Trash2, Download, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function Analyzer() {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [samples, setSamples] = useState([]);
  const [selectedSampleId, setSelectedSampleId] = useState('');

  useEffect(() => {
    fetchSamples()
      .then(data => setSamples(data))
      .catch(err => console.error('Failed to load sample conversations:', err));
  }, []);

  const handleSelectSample = (sampleId) => {
    setSelectedSampleId(sampleId);
    const sample = samples.find(s => s.id === sampleId);
    if (sample) {
      setInputText(sample.conversation);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError('Please enter or paste conversation text to analyze.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeConversation(inputText);
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message || 'An error occurred during analysis. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setAnalysisResult(null);
    setError(null);
    setSelectedSampleId('');
  };

  const handleExportJSON = () => {
    if (!analysisResult) return;
    const blob = new Blob([JSON.stringify(analysisResult, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scam-audit-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Conversation Analyzer
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Paste a suspicious investment dialogue, WhatsApp pitch, or social media DM to detect psychological manipulation tactics.
          </p>
        </div>

        {/* Input Card */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            {/* Quick Sample Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Load Sample Dialogue:
              </span>
              <select
                value={selectedSampleId}
                onChange={(e) => handleSelectSample(e.target.value)}
                style={{
                  background: '#0d131f',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              >
                <option value="">-- Choose preset conversation --</option>
                {samples.map((s) => (
                  <option key={s.id} value={s.id}>
                    [{s.category.replace('_', ' ')}] {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Button */}
            {inputText && (
              <button
                onClick={handleClear}
                style={{
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '4px'
                }}
              >
                <Trash2 size={14} />
                <span>Clear Input</span>
              </button>
            )}
          </div>

          {/* Text Area */}
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste investment dialogue, email, or chat messages here (e.g. 'Act fast! 100% guaranteed return of 25% daily...')."
            rows={6}
          />

          {/* Controls Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {inputText.length} characters (Max: 15,000)
            </span>

            <button
              className="nav-cta"
              onClick={handleAnalyze}
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
                padding: '0.65rem 1.5rem',
                fontSize: '0.95rem'
              }}
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Evaluating Tactics...</span>
                </>
              ) : (
                <>
                  <ShieldAlert size={16} />
                  <span>Analyze Conversation</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: '#fca5a5'
            }}
          >
            <AlertCircle size={20} color="var(--accent-red)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.9rem' }}>{error}</span>
          </div>
        )}

        {/* Results Section */}
        {analysisResult && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Tactical Analysis & Risk Telemetry
                </h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Evaluated {analysisResult.meta.sentenceCount} sentences • {analysisResult.detectedTacticsCount} / {analysisResult.meta.totalTacticsEvaluated} tactics identified
                </div>
              </div>

              <button
                onClick={handleExportJSON}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Download size={15} />
                <span>Export Audit JSON</span>
              </button>
            </div>

            {/* Split Grid: Risk Meter & Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <RiskMeter riskAssessment={analysisResult.riskAssessment} />

              {/* Actionable Defense Checklist */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={18} color="var(--accent-cyan)" />
                    <span>Recommended Defensive Protocol</span>
                  </h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {analysisResult.riskAssessment.actionableAdvice.map((advice, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>•</span>
                        <span>{advice}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>Tactic Synergy Multiplier: {analysisResult.riskAssessment.synergyMultiplier.toFixed(2)}x</span>
                  <span>Execution: 100% In-Memory</span>
                </div>
              </div>
            </div>

            {/* In-Line Highlighted Text */}
            <HighlightedText
              text={analysisResult.analyzedText}
              highlights={analysisResult.highlights}
            />

            {/* Tactic Cards */}
            <div style={{ marginTop: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Detailed Tactic Breakdown
              </h3>
              {analysisResult.tactics.map(tactic => (
                <TacticCard key={tactic.id} tactic={tactic} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
