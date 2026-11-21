import React from 'react';
import { Eye, ShieldAlert, Sparkles } from 'lucide-react';

export default function HighlightedText({ text, highlights }) {
  if (!text) return null;

  if (!highlights || highlights.length === 0) {
    return (
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>
          <Eye size={18} color="var(--accent-emerald)" />
          <span>Analyzed Text Stream</span>
        </div>
        <div style={{ padding: '1rem', background: '#0a0e17', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.95rem', lineHeight: 1.7, color: '#e2e8f0' }}>
          {text}
        </div>
        <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={14} />
          No psychological manipulation phrases detected in this text.
        </div>
      </div>
    );
  }

  // Build rendered fragments from sorted character offsets
  const renderedElements = [];
  let currentIndex = 0;

  // Ensure highlights are sorted and non-overlapping for rendering
  const sorted = [...highlights].sort((a, b) => a.start - b.start);

  sorted.forEach((hl, idx) => {
    // If there is preceding normal text
    if (hl.start > currentIndex) {
      renderedElements.push(
        <span key={`text-${currentIndex}`}>
          {text.substring(currentIndex, hl.start)}
        </span>
      );
    }

    // Only render if hl.start >= currentIndex to avoid double rendering overlaps
    if (hl.start >= currentIndex) {
      const phraseText = text.substring(hl.start, hl.end);
      const highlightClass = `highlight-${hl.category}`;

      renderedElements.push(
        <mark
          key={`hl-${idx}-${hl.start}`}
          className={highlightClass}
          title={`${hl.tacticName}: "${hl.phrase}"`}
        >
          {phraseText}
        </mark>
      );
      currentIndex = hl.end;
    }
  });

  // Render remaining trailing text
  if (currentIndex < text.length) {
    renderedElements.push(
      <span key={`text-end-${currentIndex}`}>
        {text.substring(currentIndex)}
      </span>
    );
  }

  return (
    <div className="card" style={{ marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>
          <ShieldAlert size={18} color="var(--accent-amber)" />
          <span>In-Line Forensic Text Highlight</span>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.75rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--accent-amber)' }} />
            Urgency
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--accent-purple)' }} />
            Authority
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--accent-red)' }} />
            Guaranteed Returns
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--accent-cyan)' }} />
            Social Proof
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--accent-orange)' }} />
            Escalation
          </span>
        </div>
      </div>

      <div style={{ padding: '1.25rem', background: '#0a0e17', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '1rem', lineHeight: 1.8, color: '#f1f5f9' }}>
        {renderedElements}
      </div>
    </div>
  );
}
