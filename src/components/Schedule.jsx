import { useState, useEffect } from 'react'
import { api } from '../utils/api'

function Schedule() {
  const [classes, setClasses] = useState([])
  const [filter, setFilter] = useState('all')
  const [dayFilter, setDayFilter] = useState('all')

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockClasses = [
      { id: 1, name: 'Morning Yoga', type: 'Yoga', time: '07:00', day: 'Monday', duration: '60 min', trainer: 'Sarah', capacity: 20, booked: 15 },
      { id: 2, name: 'HIIT Burn', type: 'HIIT', time: '08:00', day: 'Monday', duration: '45 min', trainer: 'Mike', capacity: 15, booked: 15 },
      { id: 3, name: 'Strength Training', type: 'Strength', time: '18:00', day: 'Tuesday', duration: '60 min', trainer: 'John', capacity: 25, booked: 20 },
      { id: 4, name: 'Cardio Blast', type: 'Cardio', time: '19:00', day: 'Wednesday', duration: '45 min', trainer: 'Lisa', capacity: 30, booked: 25 },
      { id: 5, name: 'Evening Yoga', type: 'Yoga', time: '20:00', day: 'Thursday', duration: '60 min', trainer: 'Sarah', capacity: 20, booked: 10 },
      { id: 6, name: 'Boxing', type: 'Combat', time: '17:00', day: 'Friday', duration: '60 min', trainer: 'Alex', capacity: 20, booked: 18 },
    ]
    setClasses(mockClasses)
  }, [])

  const filteredClasses = classes.filter(cls => {
    if (filter !== 'all' && cls.type !== filter) return false
    if (dayFilter !== 'all' && cls.day !== dayFilter) return false
    return true
  })

  const handleBookClass = async (classId) => {
    // Business Constraint: Check if class is full
    const classInfo = classes.find(c => c.id === classId)
    if (classInfo.booked >= classInfo.capacity) {
      alert('This class is full! Please choose another time.')
      return
    }

    // Check for overlapping bookings
    const userBookings = JSON.parse(localStorage.getItem('userBookings') || '[]')
    const selectedClass = classes.find(c => c.id === classId)
    
    const hasOverlap = userBookings.some(booking => 
      booking.day === selectedClass.day && booking.time === selectedClass.time
    )
    
    if (hasOverlap) {
      alert('You already have a class booked at this time!')
      return
    }

    // Book the class
    userBookings.push({
      id: classId,
      name: selectedClass.name,
      day: selectedClass.day,
      time: selectedClass.time,
      date: new Date().toISOString()
    })
    
    localStorage.setItem('userBookings', JSON.stringify(userBookings))
    
    // Update local state
    setClasses(prev => prev.map(c => 
      c.id === classId ? { ...c, booked: c.booked + 1 } : c
    ))
    
    alert('Class booked successfully!')
  }

  const getClassTypeColor = (type) => {
    const colors = {
      Yoga: '#4CAF50',
      HIIT: '#FF5722',
      Strength: '#2196F3',
      Cardio: '#E91E63',
      Combat: '#9C27B0'
    }
    return colors[type] || '#607D8B'
  }

  return (
    <section id="schedule" className="section-padding">
      <div className="container">
        <h2 className="section-title fade-in-up">CLASS SCHEDULE</h2>
        
        <div className="row mb-4 fade-in-up">
          <div className="col-md-6">
            <label className="form-label">Filter by Type:</label>
            <select 
              className="form-select" 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ background: 'rgba(227, 207, 207, 0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'blue' }}
            >
              <option value="all">All Classes</option>
              <option value="Yoga">Yoga</option>
              <option value="HIIT">HIIT</option>
              <option value="Strength">Strength</option>
              <option value="Cardio">Cardio</option>
              <option value="Combat">Combat</option>
            </select>
          </div>
          
          <div className="col-md-6">
            <label className="form-label">Filter by Day:</label>
            <select 
              className="form-select" 
              value={dayFilter}
              onChange={(e) => setDayFilter(e.target.value)}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'blue' }}
            >
              <option value="all">All Days</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
        </div>

        <div className="schedule-table fade-in-up">
          <div className="table-header">
            <div>Class</div>
            <div>Type</div>
            <div>Day</div>
            <div>Time</div>
            <div>Availability</div>
            <div>Action</div>
          </div>
          
          {filteredClasses.map(cls => (
            <div key={cls.id} className="table-row">
              <div>{cls.name}</div>
              <div>
                <span className="class-badge" style={{ background: getClassTypeColor(cls.type) }}>
                  {cls.type}
                </span>
              </div>
              <div>{cls.day}</div>
              <div>{cls.time}</div>
              <div>
                <div className="progress" style={{ height: '8px', background: 'rgba(255,255,255,0.1)' }}>
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${(cls.booked / cls.capacity) * 100}%`,
                      background: cls.booked >= cls.capacity ? '#dc3545' : '#28a745'
                    }}
                  ></div>
                </div>
                <small>{cls.booked}/{cls.capacity} spots</small>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-gradient"
                  onClick={() => handleBookClass(cls.id)}
                  disabled={cls.booked >= cls.capacity}
                >
                  {cls.booked >= cls.capacity ? 'FULL' : 'BOOK'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Schedule