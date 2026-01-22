import { useState } from 'react'
import { validateEmail, validatePhone } from '../utils/helpers'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiryType: 'membership'
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    console.log('Form submitted:', formData)
    setSubmitted(true)
    
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        inquiryType: 'membership'
      })
      setSubmitted(false)
    }, 3000)
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hello! I'm interested in joining GymPower Pro. Can you provide more information?`)
    window.open(`https://wa.me/15551234567?text=${message}`, '_blank')
  }

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--secondary)' }}>
      <div className="container">
        <h2 className="section-title fade-in-up">CONTACT US</h2>
        
        <div className="row fade-in-up align-items-stretch">
          {/* Left Column */}
          <div className="col-lg-6 mb-5 mb-lg-0 d-flex flex-column">
            <div className="card-glass p-4 flex-grow-1 d-flex flex-column">
              <h4 className="text-gradient mb-4">Get in Touch</h4>

              {/* Map */}
              <div style={{ flex: 1, borderRadius: '10px', overflow: 'hidden', marginBottom: '15px' }}>
                <iframe
                  title="Gym Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.70845103909!2d71.76263877581017!3d29.378824675265555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b91d700eac173%3A0x1bc6048ec98cce78!2sThe%20Islamia%20University%20of%20Bahawalpur%20-%20IUB%20Baghdad-ul-Jadeed%20Campus!5e0!3m2!1sen!2s!4v1766652431498!5m2!1sen!2s"
                ></iframe>
              </div>

              <div className="mb-4">
                <h5>📞 Contact Info</h5>
                <p>Phone: (555) 123-4567<br />
                   Email: info@gympower.com<br />
                   Hours: Open 24/7</p>
              </div>
              
              <div>
                <h5>💬 Quick Connect</h5>
                <div className="d-flex gap-3 mt-3">
                  <button className="btn btn-gradient" onClick={handleWhatsApp}>
                    WhatsApp
                  </button>
                  <button 
                    className="btn btn-outline-light"
                    onClick={() => window.location.href = 'tel:+92123456789'}
                  >
                    Call Now
                  </button>
                  <button 
                    className="btn btn-outline-light"
                    onClick={() => window.location.href = 'mailto:info@gympower.com'}
                  >
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-6 d-flex flex-column">
            <div className="card-glass p-4 flex-grow-1 d-flex flex-column">
              <h4 className="text-gradient mb-4">Send Message</h4>

              {submitted ? (
                <div className="alert alert-success">
                  Thank you! We'll contact you within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="d-flex flex-column flex-grow-1">
                  <div className="mb-3">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Phone (optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Inquiry Type</label>
                    <select
                      name="inquiryType"
                      className="form-select"
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      <option value="membership">Membership</option>
                      <option value="personal-training">Personal Training</option>
                      <option value="classes">Group Classes</option>
                      <option value="corporate">Corporate Membership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Message *</label>
                    <textarea
                      name="message"
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about your fitness goals..."
                    ></textarea>
                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                  </div>
                  
                  <button type="submit" className="btn btn-gradient w-100">
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
