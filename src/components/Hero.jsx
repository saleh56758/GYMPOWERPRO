import { useState } from 'react'

function Hero() {
  const [email, setEmail] = useState('')

  const handleJoinNow = () => {
    if (email) {
      alert(`Welcome! We'll contact you at ${email}`)
      setEmail('')
    } else {
      alert('Please enter your email to join')
    }
  }

  return (
    <section className="hero-section section-padding">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title text-gradient fade-in-up">
            TRANSFORM YOUR BODY
          </h1>
          <h2 className="hero-subtitle fade-in-up">
            Strength • Discipline • Results
          </h2>
          <p className="hero-text fade-in-up">
            Join 5000+ members achieving their fitness goals with certified trainers, 
            modern equipment, and proven programs.
          </p>
          
          <div className="hero-buttons fade-in-up">
            <button className="btn btn-gradient" onClick={handleJoinNow}>
              START FREE TRIAL
            </button>
            <button className="btn btn-outline-light" onClick={() => document.getElementById('membership').scrollIntoView()}>
              VIEW PLANS
            </button>
          </div>
          
          <div className="input-group mt-4 fade-in-up" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email for free trial"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
            />
            <button className="btn btn-primary" onClick={handleJoinNow}>
              Join Now
            </button>
          </div>
          
          <div className="stats fade-in-up">
            <div className="stat-item">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Active Members</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Access</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Certified Trainers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Classes Weekly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero