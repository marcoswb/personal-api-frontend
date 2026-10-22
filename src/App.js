import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Root from './components/Root';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/projects" element={<Navigate to={{ pathname: '/', hash: '#projects' }} replace />} />
      <Route path="/experience" element={<Navigate to={{ pathname: '/', hash: '#experience' }} replace />} />
      <Route path="/formation" element={<Navigate to={{ pathname: '/', hash: '#experience' }} replace />} />
      <Route path="/contacts" element={<Navigate to={{ pathname: '/', hash: '#contact' }} replace />} />
      <Route path="/blog" element={<Navigate to={{ pathname: '/', hash: '#contact' }} replace />} />
    </Routes>
  );
}

export default App;
