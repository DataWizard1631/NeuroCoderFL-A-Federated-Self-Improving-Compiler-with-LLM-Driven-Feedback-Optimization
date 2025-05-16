"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function ASTPage() {
  const [code, setCode] = useState(
`function add(a, b) {
  return a + b;
}`
  );
  const [ast, setAst] = useState(null);
  const [styleScore, setStyleScore] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const parseCode = async () => {
    setError('');
    setAst(null);
    setStyleScore(null);
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const scoreStyle = async () => {
    setError('');
    setStyleScore(null);
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Professional Navigation Header */}
      <header className="border-b border-neutral-800 bg-neutral-950 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-neutral-200 rounded-md flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-lg">N</span>
            </div>
            <div>
              <h1 className="font-semibold text-lg leading-tight">NeuroCoderFL</h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">AST Parser</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-md text-sm font-medium text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
            >
              Overview
            </Link>
            <Link 
              href="/" 
              className="px-4 py-2 rounded-md text-sm font-medium text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
            >
              Features
            </Link>
            <Link 
              href="/ast" 
              className="px-4 py-2 rounded-md text-sm font-medium bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white transition-colors"
            >
              AST Parser
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link href="/" className="btn btn-secondary hidden sm:flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><path d="m15 18-6-6 6-6"/></svg>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-black p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-black rounded-xl shadow-sm border border-neutral-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
              <h1 className="text-2xl font-bold text-white">JavaScript AST Parser & Style Analyzer</h1>
              <p className="text-neutral-300 mt-1">Parse JavaScript code into Abstract Syntax Trees and analyze code style</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Code Input Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="code-input" className="block text-sm font-medium text-neutral-300">
                      JavaScript Code
                    </label>
                    <div className="relative">
                      <textarea
                        id="code-input"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        rows={12}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-black text-white font-mono text-sm focus:ring-2 focus:ring-white focus:border-white transition-shadow"
                        placeholder="Enter your JavaScript code here..."
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={parseCode}
                      disabled={loading}
                      className="px-4 py-2 bg-white hover:bg-neutral-200 text-black font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          Parse AST
                        </>
                      )}
                    </button>
                    <button
                      onClick={scoreStyle}
                      disabled={loading}
                      className="px-4 py-2 bg-white hover:bg-neutral-200 text-black font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                          </svg>
                          Score Style
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Results Section */}
                <div className="space-y-4">
                  {error && (
                    <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/30 dark:border-red-800 rounded-lg">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                      </div>
                    </div>
                  )}
                  
                  {styleScore !== null && (
                    <div className={`p-4 border rounded-lg ${styleScore >= 0.7 ? 'border-green-200 bg-green-50 dark:bg-green-900/30 dark:border-green-800' : styleScore >= 0.4 ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/30 dark:border-yellow-800' : 'border-red-200 bg-red-50 dark:bg-red-900/30 dark:border-red-800'}`}>
                      <h3 className="font-semibold text-lg mb-2">Style Analysis</h3>
                      <div className="flex items-center mb-2">
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${styleScore >= 0.7 ? 'bg-green-500' : styleScore >= 0.4 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                            style={{ width: `${styleScore * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-3 font-semibold">{(styleScore * 100).toFixed(0)}%</span>
                      </div>
                      <p className={`text-sm ${styleScore >= 0.7 ? 'text-green-700 dark:text-green-400' : styleScore >= 0.4 ? 'text-yellow-700 dark:text-yellow-400' : 'text-red-700 dark:text-red-400'}`}>
                        {styleScore >= 0.7 ? '✓ Excellent code style' : styleScore >= 0.4 ? '⚠ Acceptable but could be improved' : '✗ Needs significant improvement'}
                      </p>
                    </div>
                  )}
                  
                  {ast && (
                    <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
                      <div className="bg-neutral-100 dark:bg-neutral-750 px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                        <h3 className="font-semibold">Abstract Syntax Tree</h3>
                      </div>
                      <div className="overflow-auto max-h-[400px]">
                        <pre className="p-4 text-xs font-mono bg-white dark:bg-neutral-850 text-neutral-800 dark:text-neutral-200">
                          {JSON.stringify(ast, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  {!error && !ast && !styleScore && (
                    <div className="h-full flex items-center justify-center p-8 text-center border border-dashed border-neutral-700 rounded-lg bg-black">
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-neutral-400 dark:text-neutral-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-lg font-medium text-neutral-300 mb-1">No Results Yet</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xs mx-auto">
                          Enter your JavaScript code and click either "Parse AST" or "Score Style" to see results
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-neutral-200 rounded-md flex items-center justify-center shadow-sm mr-3">
                <span className="text-white font-semibold text-sm">N</span>
              </div>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">© {new Date().getFullYear()} NeuroCoderFL. All rights reserved.</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">Documentation</a>
              <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
