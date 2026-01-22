import { useState, useEffect } from 'react'
import { api } from '../utils/api'

function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Gallery images from public folder
  const galleryImages = [
    '/assets/images/img1.jpg',
    '/assets/images/img2.jpg',
    '/assets/images/img3.jpg',
    '/assets/images/img4.jpg',
    '/assets/images/img5.jpg',
    '/assets/images/img6.jpg'
  ]

  useEffect(() => {
    const mockTestimonials = [
      {
        id: 1,
        name: 'ALEX RODRIGUEZ',
        text: 'Lost 30lbs in 3 months! The trainers are amazing and the community kept me motivated every single day.',
        result: 'Lost 30lbs',
        duration: '3 months',
        before: '/assets/images/before1.png',
        after: '/assets/images/after1.png'
      },
      {
        id: 2,
        name: 'TIM DAVID',
        text: 'Gained 15lbs of muscle and transformed my body composition. The strength program is incredible!',
        result: 'Gained 15lbs muscle',
        duration: '6 months',
        before: '/assets/images/before2.png',
        after: '/assets/images/after2.png'
      },
      {
        id: 3,
        name: 'JAMES WILSON',
        text: 'Went from barely being able to run to completing my first marathon. The cardio training changed my life.',
        result: 'Completed Marathon',
        duration: '8 months',
        before: '/assets/images/before3.png',
        after: '/assets/images/after3.png'
      }
    ]

    setTestimonials(mockTestimonials)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (testimonials.length === 0) return null

  const testimonial = testimonials[currentIndex]

  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{ background: 'var(--secondary)' }}
    >
      <div className="container">

        <h2 className="section-title fade-in-up">SUCCESS STORIES</h2>

        <div className="row align-items-center fade-in-up">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="card-glass p-4 h-100">
              <div className="position-relative" style={{ height: '400px' }}>
                <img
                  src={testimonial.before}
                  alt="Before"
                  className="img-fluid rounded"
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    width: '45%',
                    zIndex: 2,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                />
                <img
                  src={testimonial.after}
                  alt="After"
                  className="img-fluid rounded"
                  style={{
                    position: 'absolute',
                    right: '0',
                    bottom: '0',
                    width: '45%',
                    zIndex: 1,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    zIndex: 3
                  }}
                >
                  TRANSFORMATION
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card-glass p-5 h-100">
              <div className="testimonial-content">
                <div className="mb-4">
                  <h3 className="text-gradient">{testimonial.name}</h3>
                  <div className="d-flex gap-4 mt-2">
                    <span className="badge bg-dark">{testimonial.result}</span>
                    <span className="badge bg-dark">{testimonial.duration}</span>
                  </div>
                </div>

                <p
                  className="testimonial-text"
                  style={{ fontSize: '1.2rem', lineHeight: '1.8' }}
                >
                  "{testimonial.text}"
                </p>

                <div className="mt-5">
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-outline-light"
                      onClick={prevTestimonial}
                    >
                      ← Previous
                    </button>

                    <div className="d-flex gap-2">
                      {testimonials.map((_, idx) => (
                        <button
                          key={idx}
                          className={`btn btn-sm ${
                            idx === currentIndex
                              ? 'btn-primary'
                              : 'btn-outline-primary'
                          }`}
                          onClick={() => setCurrentIndex(idx)}
                          style={{
                            width: '10px',
                            height: '10px',
                            padding: 0,
                            borderRadius: '50%'
                          }}
                        ></button>
                      ))}
                    </div>

                    <button
                      className="btn btn-outline-light"
                      onClick={nextTestimonial}
                    >
                      Next →
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-5 fade-in-up">
          <h3 className="text-center mb-4">Gym Gallery</h3>

          <div className="row g-3">
            {galleryImages.map((img, index) => (
              <div key={index} className="col-md-4 col-6">
                <div
                  className="card-glass"
                  style={{ height: '200px', overflow: 'hidden' }}
                >
                  <img
                    src={img}
                    alt={`Gym ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Testimonials
