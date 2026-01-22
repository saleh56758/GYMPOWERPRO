import { useState } from 'react'

function Blog() {
  const [posts] = useState([
    {
      id: 1,
      title: '5 Essential Exercises for Building Strength',
      excerpt: 'Learn the foundational movements that will help you build a strong, functional body.',
      category: 'Workout',
      date: '2024-03-15',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'The Ultimate Nutrition Guide for Muscle Gain',
      excerpt: 'Discover the eating strategies that support muscle growth and recovery.',
      category: 'Nutrition',
      date: '2024-03-10',
      readTime: '8 min read'
    },
    {
      id: 3,
      title: 'How to Stay Motivated in Your Fitness Journey',
      excerpt: 'Practical tips to maintain consistency and achieve long-term results.',
      category: 'Lifestyle',
      date: '2024-03-05',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'HIIT vs Steady State Cardio: Which is Better?',
      excerpt: 'Comparing two popular cardio approaches for fat loss and fitness.',
      category: 'Workout',
      date: '2024-02-28',
      readTime: '7 min read'
    },
    {
      id: 5,
      title: 'The Importance of Proper Recovery',
      excerpt: 'Why recovery is just as important as training itself.',
      category: 'Recovery',
      date: '2024-02-20',
      readTime: '5 min read'
    },
    {
      id: 6,
      title: 'Supplements: What Actually Works',
      excerpt: 'Evidence-based guide to effective supplements for athletes.',
      category: 'Nutrition',
      date: '2024-02-15',
      readTime: '10 min read'
    }
  ])

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredPosts = posts.filter(post => {
    if (filter !== 'all' && post.category !== filter) return false
    if (search && !post.title.toLowerCase().includes(search.toLowerCase()) && 
        !post.excerpt.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const categories = ['all', ...new Set(posts.map(p => p.category))]

  return (
    <section id="blog" className="section-padding">
      <div className="container">
        <h2 className="section-title fade-in-up">FITNESS BLOG</h2>
        
        <div className="row mb-5 fade-in-up">
          <div className="col-md-8">
            <div className="btn-group flex-wrap" role="group">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
          </div>
        </div>

        <div className="row g-4">
          {filteredPosts.map((post, index) => (
            <div key={post.id} className="col-lg-4 col-md-6 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-glass h-100">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-dark">{post.category}</span>
                    <small className="text-muted">{post.readTime}</small>
                  </div>
                  
                  <h5 className="card-title mb-3">{post.title}</h5>
                  <p className="card-text text-muted">{post.excerpt}</p>
                  
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <small>{post.date}</small>
                    <button className="btn btn-sm btn-gradient">Read More →</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center mt-5 fade-in-up">
            <h4>No articles found</h4>
            <p>Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Blog