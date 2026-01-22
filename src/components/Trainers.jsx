import { useState } from 'react'

function Trainers() {
  const [trainers] = useState([
    {
      id: 1,
      name: 'Ahmad Ijaz',
      specialization: 'Strength Training & Powerlifting',
      experience: '8 years',
      certifications: ['NASM CPT', 'ACE', 'CrossFit L2'],
      bio: 'Specialized in strength training and powerlifting. Helped 200+ clients achieve their strength goals.',
      image: '/assets/images/trainer1.png'
    },
    {
      id: 2,
      name: 'Tayyab Zia',
      specialization: 'HIIT & Functional Training',
      experience: '6 years',
      certifications: ['ISSA', 'ACE', 'Precision Nutrition'],
      bio: 'HIIT specialist with focus on functional movements and metabolic conditioning.',
      image: '/assets/images/trainer2.png'
    },
    {
      id: 3,
      name: 'Muhammad Soban',
      specialization: 'Yoga & Mobility',
      experience: '10 years',
      certifications: ['RYT-500', 'Yoga Therapy', 'Pilates'],
      bio: 'Yoga and mobility expert helping clients improve flexibility and reduce injury risk.',
      image: '/assets/images/trainer3.png'
    }
  ])

  const [filter, setFilter] = useState('all')
  const [selectedTrainer, setSelectedTrainer] = useState(null)

  const filteredTrainers = filter === 'all' 
    ? trainers 
    : trainers.filter(t => t.specialization.toLowerCase().includes(filter.toLowerCase()))

  return (
    <section id="trainers" className="section-padding">
      <div className="container">
        <h2 className="section-title fade-in-up">OUR TRAINERS</h2>
        
        <div className="text-center mb-5 fade-in-up">
          <div className="btn-group flex-wrap" role="group">
            <button
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('all')}
            >
              All Trainers
            </button>
            <button
              className={`btn ${filter === 'strength' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('strength')}
            >
              Strength
            </button>
            <button
              className={`btn ${filter === 'hiit' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('hiit')}
            >
              HIIT
            </button>
            <button
              className={`btn ${filter === 'yoga' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('yoga')}
            >
              Yoga
            </button>
          </div>
        </div>

        <div className="row">
          {filteredTrainers.map((trainer) => (
            <div key={trainer.id} className="col-md-4 mb-4 text-center">
              <div className="trainer-image-container mb-4" 
                   style={{ 
                     width: '150px',
                     height: '150px',
                     borderRadius: '50%',
                     overflow: 'hidden',
                     margin: '0 auto',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     background: 'linear-gradient(45deg, var(--primary), var(--accent))'
                   }}>
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              
              <h4 className="text-gradient">{trainer.name}</h4>
              <p className="specialization">{trainer.specialization}</p>
              <p className="text-muted mb-3">Experience: {trainer.experience}</p>
              
              <div className="mb-4">
                <h6>Certifications:</h6>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  {trainer.certifications.map((cert, idx) => (
                    <span key={idx} className="badge bg-dark">{cert}</span>
                  ))}
                </div>
              </div>
              
              <button
                className="btn btn-gradient"
                onClick={() => setSelectedTrainer(trainer)}
                data-bs-toggle="modal"
                data-bs-target="#trainerModal"
              >
                VIEW PROFILE
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trainer Modal */}
      {selectedTrainer && (
        <div className="modal fade" id="trainerModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ background: 'var(--dark)', color: 'white' }}>
              <div className="modal-header">
                <h5 className="modal-title">{selectedTrainer.name}</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <p><strong>Specialization:</strong> {selectedTrainer.specialization}</p>
                <p><strong>Experience:</strong> {selectedTrainer.experience}</p>
                <p><strong>Bio:</strong> {selectedTrainer.bio}</p>
                <div className="mb-3">
                  <strong>Certifications:</strong>
                  <ul>
                    {selectedTrainer.certifications.map((cert, idx) => (
                      <li key={idx}>{cert}</li>
                    ))}
                  </ul>
                </div>
                <button className="btn btn-gradient w-100">
                  BOOK SESSION WITH {selectedTrainer.name.split(' ')[0]}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Trainers
