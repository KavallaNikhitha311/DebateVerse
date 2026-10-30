import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { DebatesArena } from './pages/DebatesArena';
import { DebateDetails } from './pages/DebateDetails';
import { CreateDebate } from './pages/CreateDebate';
import { Dashboard } from './pages/Dashboard';
import { KnowledgeHub } from './pages/KnowledgeHub';
import { ResourcesLibrary } from './pages/ResourcesLibrary';
import { Leaderboard } from './pages/Leaderboard';
import { AiDebateLab } from './pages/AiDebateLab';
import { TodoApp } from './pages/TodoApp';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: 'var(--bg-main)' }}>
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/debates" element={<DebatesArena />} />
              <Route path="/debates/:id" element={<DebateDetails />} />
              <Route
                path="/debates/create"
                element={
                  <ProtectedRoute>
                    <CreateDebate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/blog" element={<KnowledgeHub />} />
              <Route path="/resources" element={<ResourcesLibrary />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/ai-lab" element={<AiDebateLab />} />
              <Route path="/todo" element={<TodoApp />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
