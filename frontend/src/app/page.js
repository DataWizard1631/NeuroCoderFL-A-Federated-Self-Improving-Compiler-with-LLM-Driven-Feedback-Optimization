"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [msg, setMsg] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:8000/hello')
      .then((res) => res.json())
      .then((data) => setMsg(data.message))
      .catch((err) => {
        console.error(err);
        setMsg('Error fetching message');
      });
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>NeuroCoderFL</h1>
      <p>
        <Link href="/ast">
          → Try the JS AST parser
        </Link>
      </p>
    </main>
  );
}
