// frontend/src/pages/ast.js
"use client";
import { useState } from 'react';

export default function ASTPage() {
  const [code, setCode] = useState(
`function add(a, b) {
  return a + b;
}`
  );
  const [ast, setAst] = useState(null);
  const [styleScore, setStyleScore] = useState(null);
  const [error, setError] = useState('');

  const parseCode = async () => {
    setError('');
    setAst(null);
    setStyleScore(null);
    try {
      const res = await fetch('http://localhost:8000/parse_js', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: code,
      });
      if (!res.ok) throw new Error(`Parse error: ${res.status}`);
      const json = await res.json();
      setAst(json.ast);
    } catch (e) {
      console.error(e);
      setError('Failed to parse AST');
    }
  };

  const scoreStyle = async () => {
    setError('');
    setStyleScore(null);
    try {
      const res = await fetch('http://localhost:8000/score_style', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: code,
      });
      if (!res.ok) throw new Error(`Score error: ${res.status}`);
      const json = await res.json();
      setStyleScore(json.style_score);
    } catch (e) {
      console.error(e);
      setError('Failed to score style');
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>JS Code → AST & Style Score</h1>

      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        rows={10}
        cols={60}
        style={{ fontFamily: 'monospace', marginBottom: '1rem' }}
      />

      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={parseCode}
          style={{ padding: '0.5rem 1rem', marginRight: '1rem' }}
        >
          Parse AST
        </button>
        <button
          onClick={scoreStyle}
          style={{ padding: '0.5rem 1rem' }}
        >
          Score Style
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {ast && (
        <>
          <h2>AST</h2>
          <pre
            style={{
              background: '#f0f0f0',
              padding: '1rem',
              overflowX: 'auto',
              marginBottom: '1rem',
            }}
          >
            {JSON.stringify(ast, null, 2)}
          </pre>
        </>
      )}

      {styleScore !== null && (
        <p>
          <strong>Style Score:</strong> {styleScore.toFixed(2)}{' '}
          {styleScore >= 0.5 ? '👍 Good style' : '👎 Needs improvement'}
        </p>
      )}
    </main>
  );
}
