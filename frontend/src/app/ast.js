import { useState } from 'react';

export default function ASTPage() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [ast, setAst]   = useState(null);
  const [error, setError] = useState('');

  const parseCode = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:8000/parse_js', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: code,
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const json = await res.json();
      setAst(json.ast);
    } catch (e) {
      console.error(e);
      setError('Failed to parse code');
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>JS Code → AST</h1>

      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        rows={10}
        cols={60}
        style={{ fontFamily: 'monospace', marginBottom: '1rem' }}
      />

      <br />
      <button onClick={parseCode} style={{ padding: '0.5rem 1rem' }}>
        Parse AST
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {ast && (
        <pre
          style={{
            background: '#f0f0f0',
            padding: '1rem',
            overflowX: 'auto',
            marginTop: '1rem',
          }}
        >
          {JSON.stringify(ast, null, 2)}
        </pre>
      )}
    </main>
  );
}
