"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [msg, setMsg] = useState('Connecting...');
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setIsLoaded(true);
    fetch('http://localhost:8000/hello')
      .then((res) => res.json())
      .then((data) => setMsg(data.message))
      .catch((err) => {
        console.error(err);
        setMsg('Error connecting to server');
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Professional Navigation Header */}
      <header className="border-b border-neutral-800 bg-neutral-950 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-200 rounded-md flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-neutral-900 dark:text-white">NeuroCoderFL</h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Enterprise Compiler Platform</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light' : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('features')} 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'features' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light' : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800'}`}
            >
              Features
            </button>
            <Link 
              href="/ast" 
              className="px-4 py-2 rounded-md text-sm font-medium text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
            >
              AST Parser
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${msg && msg.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}></span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${msg && msg.includes('Error') ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                {msg && msg.includes('Error') ? 'Offline' : 'Online'}
              </span>
            </div>
            <Link href="/ast" className="btn-primary text-sm font-medium px-4 py-2 rounded-md bg-primary hover:bg-primary-dark text-white shadow-sm transition-colors hidden sm:flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
              Try Parser
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {activeTab === 'overview' && (
          <section className="py-20 bg-black overflow-hidden relative">

            <div className="container mx-auto px-4 relative z-1">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <div className="inline-block mb-4 px-3 py-1 bg-neutral-200 text-black rounded-full">
                  <span className="text-black text-sm font-semibold">Enterprise-Grade Platform</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
                  Next-Generation <span className="text-white underline">Compiler Technology</span> with Neural Networks
                </h1>
                <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  NeuroCoderFL combines federated learning with LLM-driven feedback to create a self-improving compiler that optimizes code while preserving privacy.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/ast" className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Try AST Parser
                  </Link>
                  <button className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Documentation
                  </button>
                </div>
              </div>
              
              {/* Status Card */}
              <div className="max-w-5xl mx-auto mt-16">
                <div className="bg-black shadow-lg rounded-xl border border-neutral-700 overflow-hidden transition-all hover:shadow-xl">
                  <div className="px-6 py-5 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <h3 className="font-bold text-lg text-white">System Status Dashboard</h3>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${msg && msg.includes('Error') ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'}`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${msg && msg.includes('Error') ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></span>
                      {msg && msg.includes('Error') ? 'System Disruption' : 'All Systems Operational'}
                    </span>
                  </div>
                  <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                    <div className="px-6 py-5 flex justify-between items-center transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-750">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-white">API Server</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">Backend processing server</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className={`px-3 py-1 rounded-md text-sm font-medium ${msg && msg.includes('Error') ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'}`}>
                          <div className="flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 ${msg && msg.includes('Error') ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></span>
                            <span>{msg}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-5 flex justify-between items-center transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-750">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-white">AST Parser</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">JavaScript parsing service</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="px-3 py-1 rounded-md bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-sm font-medium">
                          <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full mr-2 bg-green-500"></span>
                            <span>Available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-5 flex justify-between items-center transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-750">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-white">LLM Integration</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">AI-powered optimization</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="px-3 py-1 rounded-md bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 text-sm font-medium">
                          <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full mr-2 bg-yellow-500"></span>
                            <span>Coming Soon</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'features' && (
          <section className="py-20 bg-black">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto mb-16">
                <div className="text-center mb-12">
                  <div className="inline-block mb-4 px-3 py-1 bg-neutral-200 text-black rounded-full">
                    <span className="text-black text-sm font-semibold">Advanced Functionality</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Platform Capabilities</h2>
                  <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
                    Explore the powerful features that make NeuroCoderFL the leading choice for next-generation compiler technology.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-black rounded-xl shadow-lg border border-neutral-700 p-6 transition-all hover:shadow-xl hover:transform hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-lg bg-neutral-200 text-black flex items-center justify-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary dark:text-primary-light"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-white">AST Parser</h3>
                    <p className="text-neutral-300 mb-5 leading-relaxed">Parse JavaScript code into Abstract Syntax Trees for advanced analysis and transformation.</p>
                    <Link href="/ast" className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-sm transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      Try Parser
                    </Link>
                  </div>
                  
                  <div className="bg-black rounded-xl shadow-lg border border-neutral-700 p-6 transition-all hover:shadow-xl hover:transform hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-lg bg-neutral-200 text-black flex items-center justify-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary dark:text-secondary-light"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m2 12 20 0"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-white">Federated Learning</h3>
                    <p className="text-neutral-300 mb-5 leading-relaxed">Collaborate on model training while preserving data privacy across distributed systems.</p>
                    <button 
                      className="inline-flex items-center px-4 py-2 bg-white hover:bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-650 text-neutral-800 dark:text-white border border-neutral-200 dark:border-neutral-600 font-medium rounded-lg shadow-sm transition-colors" 
                      onClick={() => alert('Coming soon!')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Learn More
                    </button>
                  </div>
                  
                  <div className="bg-black rounded-xl shadow-lg border border-neutral-700 p-6 transition-all hover:shadow-xl hover:transform hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-lg bg-neutral-200 text-black flex items-center justify-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent dark:text-accent-light"><path d="M12 2v1"/><path d="M12 21v1"/><path d="m4.93 4.93 .7.7"/><path d="m18.36 18.36 .7.7"/><path d="M2 12h1"/><path d="M21 12h1"/><path d="m4.93 19.07 .7-.7"/><path d="m18.36 5.64 .7-.7"/><circle cx="12" cy="12" r="4"/></svg>
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-white">LLM Integration</h3>
                    <p className="text-neutral-300 mb-5 leading-relaxed">Leverage large language models for intelligent code optimization and feedback.</p>
                    <button 
                      className="inline-flex items-center px-4 py-2 bg-white hover:bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-650 text-neutral-800 dark:text-white border border-neutral-200 dark:border-neutral-600 font-medium rounded-lg shadow-sm transition-colors" 
                      onClick={() => alert('Coming soon!')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-neutral-200 rounded-md flex items-center justify-center shadow-sm mr-3">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">NeuroCoderFL</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Enterprise Compiler Platform</p>
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                Advanced compiler technology with neural networks and federated learning capabilities.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Products</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/ast" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors text-sm">
                    AST Parser
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors text-sm">
                    Code Optimizer
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors text-sm">
                    Neural Compiler
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors text-sm">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors text-sm">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors text-sm">
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors text-sm">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors text-sm">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors text-sm">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center">
            <span className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 md:mb-0">© {new Date().getFullYear()} NeuroCoderFL. All rights reserved.</span>
            
            <div className="flex space-x-6">
              <a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
