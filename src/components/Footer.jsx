function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="footer-logo text-gradient">GYMPOWER PRO</div>
            <p style={{ color: '#aaa' }}>
              Transform your body, strengthen your mind. Join our community of fitness enthusiasts.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon"><i>F</i></a>
              <a href="#" className="social-icon"><i>I</i></a>
              <a href="#" className="social-icon"><i>T</i></a>
              <a href="#" className="social-icon"><i>Y</i></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <div className="footer-links">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="#membership">Membership</a></li>
                <li><a href="#schedule">Class Schedule</a></li>
                <li><a href="#trainers">Trainers</a></li>
                <li><a href="#tools">Fitness Tools</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-links">
              <h5>Contact Info</h5>
              <ul>
                <li>📍 123 Fitness Street</li>
                <li>📞 (555) 123-4567</li>
                <li>✉️ info@gympower.com</li>
                <li>🕒 Open 24/7</li>
              </ul>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-links">
              <h5>Newsletter</h5>
              <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
                Subscribe for fitness tips and special offers
              </p>
              <div className="input-group mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Your email"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                />
                <button className="btn btn-gradient" type="button">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 GymPower Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer