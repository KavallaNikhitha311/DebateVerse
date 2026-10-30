import React, { useState } from 'react';
import { BookOpen, Search, Clock, ArrowRight } from 'lucide-react';

export const KnowledgeHub = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ['All', 'Debate Basics', 'Critical Thinking', 'Speaking Tips', 'Everyday Logic'];

  const articles = [
    {
      id: 1,
      title: 'How to Build a Clear Argument in 3 Simple Steps (Claim, Reason, Example)',
      category: 'Debate Basics',
      author: 'Alex Morgan',
      date: 'October 20, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=700&q=80',
      summary: 'The easiest way to make people listen to your point: state your claim, give your why, and share a concrete example.',
      content: `A good argument does not need to be complicated. In fact, the simpler you state it, the easier it is for people to understand.
      
1. Your Claim: State your opinion directly in one clear sentence (e.g. "Schools should start at 9:00 AM instead of 8:00 AM").
2. Your Reason: Explain why this claim is true (e.g. "Because teenagers naturally have later sleep cycles and perform better with adequate rest").
3. Your Example: Provide a real-world story, fact, or study (e.g. "Schools in Seattle that delayed start times saw a 4.5% increase in student grades").
      
When you connect these three pieces, your viewpoint transforms from a random opinion into a persuasive argument.`,
      proStance: 'Keeps your points memorable, focused, and easy for the audience to follow.',
      conStance: 'Requires you to pick one strong idea rather than throwing five messy points at once.'
    },
    {
      id: 2,
      title: 'How to Disagree Respectfully Without Getting Angry',
      category: 'Speaking Tips',
      author: 'Sarah Chen',
      date: 'October 16, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80',
      summary: 'Why listening to the other side first is the secret weapon to winning respect in any discussion.',
      content: `When someone disagrees with us, our instinct is often to interrupt or dismiss them. But the best debaters do the opposite: they listen carefully.
      
Before you respond, summarize their point: "So you believe that uniforms save parents money, right?"
When the other person feels heard, their defenses drop, and they will genuinely listen to your counter-point. Debate is not about embarrassing the other person—it is about finding truth together.`,
      proStance: 'Builds mutual respect and prevents discussions from turning into personal insults.',
      conStance: 'Takes patience and self-control when emotions run high.'
    },
    {
      id: 3,
      title: 'Spotting Common Thinking Traps: Strawman and Ad Hominem',
      category: 'Critical Thinking',
      author: 'David Kumar',
      date: 'October 10, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80',
      summary: 'Learn two very common unfair debate tactics and how you can easily avoid them.',
      content: `Logical fallacies are shortcuts people take when their argument is weak:
      
1. The Strawman: Twisting what someone said into an extreme version. For example, if someone says "We should have fewer tests," and you reply "So you want students to learn nothing at all!"
2. Ad Hominem: Attacking the person instead of the argument. Calling someone names rather than explaining why their point is incorrect.
      
Spotting these traps helps you stay calm and answer only the real facts.`,
      proStance: 'Protects you from being tricked by misleading rhetoric online.',
      conStance: 'Requires you to inspect arguments objectively rather than reacting to labels.'
    },
    {
      id: 4,
      title: 'How to Prepare Before Speaking: Overcoming Stage Fright',
      category: 'Speaking Tips',
      author: 'Maya Lin',
      date: 'October 04, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80',
      summary: 'Simple breathing techniques and bullet-point notes that help anyone speak with confidence.',
      content: `Almost everyone feels nervous before speaking in front of peers. 
      
Instead of writing a full script that you try to memorize, write down 3 simple bullet points on an index card.
Take two slow breaths before you begin. Speak slightly slower than you normally do. Your ideas will sound clearer, and your confidence will naturally grow!`,
      proStance: 'Turns anxiety into focused, energetic delivery.',
      conStance: 'Takes a few practice runs to feel completely natural.'
    }
  ];

  const filtered = articles.filter(a => {
    const matchCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        {/* Banner */}
        <div className="text-center mb-5" style={{ maxWidth: 760, margin: '0 auto' }}>
          <div className="d-inline-flex align-items-center gap-2 dv-badge-primary mb-2">
            <BookOpen size={14} />
            <span>Debate Guides & Learning Hub</span>
          </div>
          <h1 className="display-6 fw-bold text-dark mb-2">Debate Knowledge Hub</h1>
          <p className="text-muted fs-6">
            Helpful tips on formulating strong arguments, listening actively, and speaking with confidence.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="dv-card p-4 mb-5">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-6">
              <div className="position-relative">
                <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type="text"
                  className="form-control dv-input ps-5"
                  placeholder="Search guides, tips, or articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`btn btn-sm ${selectedCategory === cat ? 'btn-dv-primary fw-semibold' : 'btn-dv-secondary'} rounded-pill`}
                    style={{ fontSize: '0.8rem', padding: '0.25rem 0.8rem' }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="row g-4">
          {filtered.map((art) => (
            <div className="col-12 col-md-6" key={art.id}>
              <div className="dv-card h-100 overflow-hidden d-flex flex-column">
                <img
                  src={art.image}
                  alt={art.title}
                  style={{ width: '100%', height: 210, objectFit: 'cover' }}
                />
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="dv-badge-lavender small">{art.category}</span>
                    <span className="text-muted small d-flex align-items-center gap-1">
                      <Clock size={12} /> {art.readTime}
                    </span>
                  </div>

                  <h5 className="fw-bold text-dark mb-2 lh-snug">{art.title}</h5>
                  <p className="text-secondary small mb-3 flex-grow-1">{art.summary}</p>

                  <div className="pt-3 border-top d-flex align-items-center justify-content-between text-muted small mt-auto">
                    <span>By {art.author} &bull; {art.date}</span>
                    <button
                      onClick={() => setActiveArticle(art)}
                      className="btn btn-dv-secondary btn-sm d-flex align-items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Article Full Modal */}
        {activeArticle && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(3px)' }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content dv-card border-0">
                <div className="modal-header border-bottom py-3">
                  <div>
                    <span className="dv-badge-primary small me-2">{activeArticle.category}</span>
                    <span className="text-muted small">{activeArticle.readTime} &bull; By {activeArticle.author}</span>
                  </div>
                  <button type="button" className="btn-close" onClick={() => setActiveArticle(null)} aria-label="Close"></button>
                </div>
                <div className="modal-body p-4 p-md-5">
                  <h3 className="fw-bold text-dark mb-3">{activeArticle.title}</h3>
                  <img src={activeArticle.image} alt={activeArticle.title} className="rounded-3 w-100 mb-4" style={{ maxHeight: 260, objectFit: 'cover' }} />
                  <div className="text-secondary lh-lg mb-4" style={{ whiteSpace: 'pre-line' }}>
                    {activeArticle.content}
                  </div>
                </div>
                <div className="modal-footer border-top py-2">
                  <button type="button" className="btn btn-dv-secondary" onClick={() => setActiveArticle(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
