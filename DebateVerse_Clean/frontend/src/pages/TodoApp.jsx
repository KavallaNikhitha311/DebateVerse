import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

export const TodoApp = () => {
  const { user } = useAuth();
  const storageKey = `debateverse_todos_${user?._id || 'guest'}`;

  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [
        { id: 1, text: 'Find 2 articles explaining why homework helps students practice', priority: 'High', debateTopic: 'Homework Ban', completed: true },
        { id: 2, text: 'Think of 3 practical examples of how AI can assist study sessions', priority: 'High', debateTopic: 'AI in Assignments', completed: false },
        { id: 3, text: 'List the top pros and cons of online learning vs in-person classes', priority: 'Medium', debateTopic: 'Online Classes', completed: false },
        { id: 4, text: 'Review the 3-step argument guide in the Knowledge Hub', priority: 'Low', debateTopic: 'General Prep', completed: false }
      ];
    } catch (e) {
      return [];
    }
  });

  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [debateTopic, setDebateTopic] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(todos));
    } catch (e) {
      console.warn('Could not save todos to localStorage:', e);
    }
  }, [todos, storageKey]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: taskText.trim(),
      priority,
      debateTopic: debateTopic.trim() || 'General Prep',
      completed: false,
      createdAt: new Date().toLocaleDateString()
    };

    setTodos([newTodo, ...todos]);
    setTaskText('');
    setDebateTopic('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: 780 }}>
        {/* Banner */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 dv-badge-primary mb-2">
            <CheckSquare size={14} />
            <span>Debater Preparation Workspace</span>
          </div>
          <h1 className="display-6 fw-bold text-dark mb-2">Debate Preparation Checklist</h1>
          <p className="text-muted fs-6">
            Keep track of research points, examples to look up, and ideas to prepare before entering the debate round.
          </p>
        </div>

        {/* Add Task Card */}
        <div className="dv-card p-4 mb-4">
          <h5 className="fw-bold text-dark mb-3">Add a Preparation Note or Task</h5>
          <form onSubmit={handleAddTodo} className="d-flex flex-column gap-3">
            <div>
              <input
                type="text"
                className="form-control dv-input"
                placeholder="What point, study, or counter-argument do you want to prepare?..."
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                required
              />
            </div>

            <div className="row g-2">
              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control dv-input"
                  placeholder="Associated Debate Topic (e.g., Homework Ban)..."
                  value={debateTopic}
                  onChange={(e) => setDebateTopic(e.target.value)}
                />
              </div>

              <div className="col-6 col-md-4">
                <select
                  className="form-select dv-input"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div className="col-6 col-md-2">
                <button type="submit" className="btn btn-dv-primary w-100 d-flex align-items-center justify-content-center gap-1">
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Filter & Progress Header */}
        <div className="d-flex align-items-center justify-content-between mb-3 px-1">
          <div className="d-flex align-items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`btn btn-sm ${filter === 'all' ? 'btn-dv-primary fw-semibold' : 'btn-dv-secondary'} rounded-pill`}
            >
              All ({todos.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`btn btn-sm ${filter === 'pending' ? 'btn-dv-primary fw-semibold' : 'btn-dv-secondary'} rounded-pill`}
            >
              Pending ({todos.length - completedCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`btn btn-sm ${filter === 'completed' ? 'btn-dv-primary fw-semibold' : 'btn-dv-secondary'} rounded-pill`}
            >
              Completed ({completedCount})
            </button>
          </div>

          <span className="text-muted small">
            {completedCount} of {todos.length} items checked off
          </span>
        </div>

        {/* Task List */}
        <div className="d-flex flex-column gap-2">
          {filteredTodos.length === 0 ? (
            <div className="dv-card p-5 text-center text-muted small">
              No tasks match your selected filter. All caught up with your debate preparation!
            </div>
          ) : (
            filteredTodos.map((t) => (
              <div
                key={t.id}
                className="dv-card p-3 d-flex align-items-center justify-content-between gap-3"
                style={{ opacity: t.completed ? 0.7 : 1, backgroundColor: t.completed ? '#F8FAFC' : '#FFFFFF' }}
              >
                <div className="d-flex align-items-center gap-3 flex-grow-1">
                  <button
                    onClick={() => toggleTodo(t.id)}
                    className="btn btn-link p-0 text-decoration-none"
                    style={{ color: t.completed ? '#15803D' : '#4F46E5' }}
                    title={t.completed ? 'Mark pending' : 'Mark complete'}
                  >
                    {t.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                  </button>

                  <div className="flex-grow-1">
                    <div className={`text-dark small ${t.completed ? 'text-decoration-line-through text-muted' : 'fw-medium'}`}>
                      {t.text}
                    </div>
                    <div className="d-flex align-items-center gap-2 mt-1">
                      <span className="dv-badge-lavender" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                        {t.debateTopic}
                      </span>
                      <span className={`small ${t.priority === 'High' ? 'text-danger' : (t.priority === 'Medium' ? 'text-warning' : 'text-muted')}`} style={{ fontSize: '0.72rem' }}>
                        &bull; {t.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteTodo(t.id)}
                  className="btn btn-link text-muted p-1 hover-danger"
                  title="Delete item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
