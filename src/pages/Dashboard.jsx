import { useState, useEffect } from 'react'

function Dashboard() {
  const [user, setUser] = useState({
    name: 'John Doe',
    membership: 'PRO',
    joinDate: '2024-01-15',
    attendance: 45,
    nextPayment: '2024-04-15',
    weight: 75,
    goalWeight: 70
  })

  const [bookings, setBookings] = useState([
    { id: 1, class: 'Morning Yoga', date: '2024-03-20', time: '07:00', status: 'confirmed' },
    { id: 2, class: 'Strength Training', date: '2024-03-21', time: '18:00', status: 'confirmed' },
    { id: 3, class: 'HIIT Burn', date: '2024-03-22', time: '08:00', status: 'pending' }
  ])

  const [progress, setProgress] = useState([
    { month: 'Jan', weight: 80 },
    { month: 'Feb', weight: 78 },
    { month: 'Mar', weight: 75 }
  ])

  const [stats, setStats] = useState({
    workoutsThisMonth: 12,
    caloriesBurned: 8500,
    avgWorkoutTime: '45 min',
    streak: 7
  })

  const handleCancelBooking = (bookingId) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId))
    alert('Booking cancelled successfully')
  }

  const updateWeight = () => {
    const newWeight = prompt('Enter current weight (kg):', user.weight)
    if (newWeight && !isNaN(newWeight)) {
      setUser(prev => ({ ...prev, weight: parseFloat(newWeight) }))
      
      // Add to progress
      const currentMonth = new Date().toLocaleString('default', { month: 'short' })
      setProgress(prev => [...prev, { month: currentMonth, weight: parseFloat(newWeight) }])
      
      alert('Weight updated successfully!')
    }
  }

  return (
    <div className="container py-5 mt-5">
      <h1 className="text-gradient mb-5">Member Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="dashboard-grid mb-5">
        <div className="card-glass p-4">
          <h6>Current Membership</h6>
          <div className="metric-value">{user.membership}</div>
          <p className="text-muted mb-0">Next payment: {user.nextPayment}</p>
        </div>
        
        <div className="card-glass p-4">
          <h6>Workouts This Month</h6>
          <div className="metric-value">{stats.workoutsThisMonth}</div>
          <p className="text-muted mb-0">Avg: {stats.avgWorkoutTime}</p>
        </div>
        
        <div className="card-glass p-4">
          <h6>Attendance</h6>
          <div className="metric-value">{user.attendance}</div>
          <p className="text-muted mb-0">Total workouts</p>
        </div>
        
        <div className="card-glass p-4">
          <h6>Current Streak</h6>
          <div className="metric-value">{stats.streak} days</div>
          <p className="text-muted mb-0">Keep it up!</p>
        </div>
      </div>
      
      <div className="row">
        {/* Progress Tracking */}
        <div className="col-lg-6 mb-4">
          <div className="card-glass p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="text-gradient">Progress Tracking</h4>
              <button className="btn btn-sm btn-gradient" onClick={updateWeight}>
                Update Weight
              </button>
            </div>
            
            <div className="text-center mb-4">
              <div className="display-4" style={{ color: 'var(--primary)' }}>
                {user.weight} kg
              </div>
              <p className="text-muted">Current Weight</p>
              
              <div className="mt-3">
                <span>Goal: {user.goalWeight} kg</span>
                <div className="progress mt-2" style={{ height: '10px' }}>
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${Math.min(100, ((80 - user.weight) / (80 - user.goalWeight)) * 100)}%`,
                      background: 'linear-gradient(45deg, var(--primary), var(--accent))'
                    }}
                  ></div>
                </div>
              </div>
            </div>
            
            <h6 className="mb-3">Weight Progress</h6>
            <div style={{ height: '200px' }}>
              {/* Simple chart */}
              <div className="d-flex align-items-end h-100">
                {progress.map((item, index) => (
                  <div key={index} className="flex-fill mx-2">
                    <div 
                      className="bg-primary rounded-top"
                      style={{ 
                        height: `${(item.weight / 80) * 100}%`,
                        background: 'linear-gradient(to top, var(--primary), var(--accent))'
                      }}
                    ></div>
                    <div className="text-center mt-2">
                      <small>{item.month}</small><br />
                      <small>{item.weight}kg</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Bookings */}
        <div className="col-lg-6 mb-4">
          <div className="card-glass p-4 h-100">
            <h4 className="text-gradient mb-4">Upcoming Bookings</h4>
            
            {bookings.length === 0 ? (
              <p className="text-center text-muted">No upcoming bookings</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.class}</td>
                        <td>{booking.date}</td>
                        <td>{booking.time}</td>
                        <td>
                          <span className={`badge ${booking.status === 'confirmed' ? 'bg-success' : 'bg-warning'}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div className="mt-4">
              <button 
                className="btn btn-gradient w-100"
                onClick={() => window.location.hash = '#schedule'}
              >
                Book More Classes
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="card-glass p-4 mt-4">
        <h4 className="text-gradient mb-4">Quick Actions</h4>
        <div className="row">
          <div className="col-md-3 col-6 mb-3">
            <button className="btn btn-outline-light w-100">
              Update Profile
            </button>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <button className="btn btn-outline-light w-100">
              View Payment History
            </button>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <button className="btn btn-outline-light w-100">
              Download Workout Plan
            </button>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <button className="btn btn-outline-light w-100">
              Book Trainer Session
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard