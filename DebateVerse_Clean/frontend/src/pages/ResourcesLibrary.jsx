import React, { useState, useEffect } from 'react';
import { booksApi } from '../services/api';
import { BookOpen, Search, Plus, Edit2, Trash2 } from 'lucide-react';

export const ResourcesLibrary = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formError, setFormError] = useState('');

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Debate Strategy');
  const [description, setDescription] = useState('');
  const [publicationYear, setPublicationYear] = useState('2022');
  const [coverImage, setCoverImage] = useState('');

  const categories = ['All', 'Debate Strategy', 'Public Speaking', 'Critical Thinking', 'Everyday Logic', 'Communication'];

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (search.trim()) params.search = search.trim();

      const res = await booksApi.getAll(params);
      if (res.success && res.books) {
        setBooks(res.books);
      }
    } catch (err) {
      console.warn('Could not load books:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  const handleOpenCreate = () => {
    setEditingBook(null);
    setTitle('');
    setAuthor('');
    setCategory('Debate Strategy');
    setDescription('');
    setPublicationYear('2022');
    setCoverImage('');
    setFormError('');
    setShowModal(true);
  };

  const handleOpenEdit = (b) => {
    setEditingBook(b);
    setTitle(b.title);
    setAuthor(b.author);
    setCategory(b.category);
    setDescription(b.description);
    setPublicationYear(b.publicationYear);
    setCoverImage(b.coverImage || '');
    setFormError('');
    setShowModal(true);
  };

  const handleSaveBook = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      const payload = {
        title,
        author,
        category,
        description,
        publicationYear: Number(publicationYear),
        coverImage
      };

      if (editingBook) {
        await booksApi.update(editingBook._id, payload);
      } else {
        await booksApi.create(payload);
      }
      setShowModal(false);
      fetchBooks();
    } catch (err) {
      setFormError(err.message || 'Operation failed.');
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource book?')) return;
    try {
      await booksApi.delete(id);
      fetchBooks();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        {/* Banner */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
          <div>
            <div className="d-inline-flex align-items-center gap-2 dv-badge-primary mb-2">
              <BookOpen size={14} />
              <span>Reference Library</span>
            </div>
            <h1 className="display-6 fw-bold text-dark mb-1">Debate & Public Speaking Books</h1>
            <p className="text-muted small mb-0">Recommended handbooks and literature to help improve reasoning, communication, and speech delivery.</p>
          </div>
          <div>
            <button onClick={handleOpenCreate} className="btn btn-dv-primary d-inline-flex align-items-center gap-2">
              <Plus size={16} />
              <span>Add Resource Book</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="dv-card p-3 p-md-4 mb-4">
          <form onSubmit={handleSearch} className="row g-2 align-items-center">
            <div className="col-12 col-md-9">
              <div className="position-relative">
                <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type="text"
                  className="form-control dv-input ps-5"
                  placeholder="Search by book title, author, or keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-3">
              <button type="submit" className="btn btn-dv-secondary w-100">Search Library</button>
            </div>
          </form>

          <div className="d-flex flex-wrap align-items-center gap-2 mt-3 pt-3 border-top">
            <span className="text-muted small me-1">Category:</span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`btn btn-sm ${selectedCategory === c ? 'btn-dv-primary fw-semibold' : 'btn-dv-secondary'} rounded-pill`}
                style={{ fontSize: '0.8rem', padding: '0.25rem 0.8rem' }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-secondary" role="status"></div>
            <p className="text-muted small mt-2">Loading library books...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="dv-card p-5 text-center text-muted">
            <h5 className="fw-semibold text-dark mb-2">No books found</h5>
            <p className="small mb-3">Add a new book or adjust your search filter.</p>
            <button onClick={handleOpenCreate} className="btn btn-dv-primary">Add Book</button>
          </div>
        ) : (
          <div className="row g-4">
            {books.map((b) => (
              <div className="col-12 col-md-6 col-lg-4" key={b._id}>
                <div className="dv-card h-100 d-flex flex-column overflow-hidden">
                  <div style={{ height: 160, backgroundColor: '#F8FAFC', overflow: 'hidden' }}>
                    <img
                      src={b.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'}
                      alt={b.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="dv-badge-lavender small">{b.category}</span>
                      <span className="text-muted small">{b.publicationYear}</span>
                    </div>

                    <h5 className="fw-bold text-dark mb-1 lh-snug">{b.title}</h5>
                    <div className="text-muted small mb-3">By {b.author}</div>

                    <p className="text-secondary small mb-4 flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {b.description}
                    </p>

                    <div className="pt-3 border-top d-flex align-items-center justify-content-between text-muted small mt-auto">
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>Resource Book</span>
                      <div className="d-flex align-items-center gap-1">
                        <button onClick={() => handleOpenEdit(b)} className="btn btn-link text-muted p-1" title="Edit book">
                          <Edit2 size={15} />
                        </button>
                        <button onClick={() => handleDeleteBook(b._id)} className="btn btn-link text-danger p-1" title="Delete book">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(3px)' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content dv-card border-0">
                <div className="modal-header border-bottom py-3">
                  <h5 className="modal-title fw-bold text-dark">{editingBook ? 'Edit Book' : 'Add New Book'}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                </div>
                <form onSubmit={handleSaveBook}>
                  <div className="modal-body p-4 d-flex flex-column gap-3">
                    {formError && (
                      <div className="alert alert-danger small py-2 mb-0" role="alert">{formError}</div>
                    )}
                    <div>
                      <label className="form-label fw-semibold text-dark small mb-1">Book Title *</label>
                      <input type="text" className="form-control dv-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div>
                      <label className="form-label fw-semibold text-dark small mb-1">Author *</label>
                      <input type="text" className="form-control dv-input" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                    </div>
                    <div className="row g-2">
                      <div className="col-8">
                        <label className="form-label fw-semibold text-dark small mb-1">Category *</label>
                        <select className="form-select dv-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                          {categories.filter(c => c !== 'All').map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-4">
                        <label className="form-label fw-semibold text-dark small mb-1">Year *</label>
                        <input type="number" className="form-control dv-input" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} required />
                      </div>
                    </div>
                    <div>
                      <label className="form-label fw-semibold text-dark small mb-1">Description *</label>
                      <textarea className="form-control dv-input" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div>
                      <label className="form-label fw-semibold text-dark small mb-1">Cover Image URL (optional)</label>
                      <input type="url" className="form-control dv-input" placeholder="https://..." value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
                    </div>
                  </div>
                  <div className="modal-footer border-top py-2">
                    <button type="button" className="btn btn-dv-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-dv-primary">{editingBook ? 'Update Book' : 'Add to Library'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
