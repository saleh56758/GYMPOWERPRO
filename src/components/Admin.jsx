import { useState, useEffect } from 'react'
import { api } from '../utils/api'

function Admin() {
  const [activeTab, setActiveTab] = useState('members')
  const [members, setMembers] = useState([])
  const [trainers, setTrainers] = useState([])
  const [classes, setClasses] = useState([])
  const [newMember, setNewMember] = useState({ name: '', email: '', phone: '', membership: 'BASIC' })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    setIsLoading(true)
    try {
      switch (activeTab) {
        case 'members':
          const membersData = await api.getMembers()
          setMembers(membersData)
          break
        case 'trainers':
          const trainersData = await api.getTrainers()
          setTrainers(trainersData)
          break
        case 'classes':
          const classesData = await api.getClasses()
          setClasses(classesData)
          break
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddMember = async (e) => {
    e.preventDefault()
    if (!newMember.name || !newMember.email) {
      alert('Name and email are required')
      return
    }

    try {
      await api.addMember(newMember)
      alert('Member added successfully')
      setNewMember({ name: '', email: '', phone: '', membership: 'BASIC' })
      loadData()
    } catch (error) {
      alert('Error adding member: ' + error.message)
    }
  }

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      if (type === 'member') {
        await api.deleteMember(id)
        setMembers(prev => prev.filter(m => m.id !== id))
      }
      // Add delete for other types as needed
      alert('Deleted successfully')
    } catch (error) {
      alert('Error deleting: ' + error.message)
    }
  }

  const renderTabContent = () => {
    if (isLoading) return <div className="text-center py-5">Loading...</div>

    switch (activeTab) {
      case 'members':
        return (
          <div>
            <h4 className="mb-4">Manage Members</h4>
            
            {/* Add Member Form */}
            <div className="card-glass p-4 mb-4">
              <h5>Add New Member</h5>
              <form onSubmit={handleAddMember}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone"
                      value={newMember.phone}
                      onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <select
                      className="form-select"
                      value={newMember.membership}
                      onChange={(e) => setNewMember({ ...newMember, membership: e.target.value })}
                    >
                      <option value="BASIC">BASIC</option>
                      <option value="PRO">PRO</option>
                      <option value="ELITE">ELITE</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-gradient">
                      Add Member
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Members Table */}
            <div className="table-responsive">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Membership</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(member => (
                    <tr key={member.id}>
                      <td>{member.id}</td>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member.phone || '-'}</td>
                      <td><span className="badge bg-primary">{member.membership}</span></td>
                      <td>{member.joinDate}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-light me-2">
                          Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete('member', member.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'trainers':
        return (
          <div>
            <h4 className="mb-4">Manage Trainers</h4>
            <div className="table-responsive">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Specialization</th>
                    <th>Experience</th>
                    <th>Certifications</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trainers.map(trainer => (
                    <tr key={trainer.id}>
                      <td>{trainer.id}</td>
                      <td>{trainer.name}</td>
                      <td>{trainer.specialization}</td>
                      <td>{trainer.experience}</td>
                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          {trainer.certifications?.map((cert, idx) => (
                            <span key={idx} className="badge bg-secondary">{cert}</span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-light me-2">
                          Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'classes':
        return (
          <div>
            <h4 className="mb-4">Manage Classes</h4>
            <div className="table-responsive">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Class Name</th>
                    <th>Type</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Trainer</th>
                    <th>Capacity</th>
                    <th>Booked</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map(cls => (
                    <tr key={cls.id}>
                      <td>{cls.id}</td>
                      <td>{cls.name}</td>
                      <td><span className="badge bg-info">{cls.type}</span></td>
                      <td>{cls.day}</td>
                      <td>{cls.time}</td>
                      <td>{cls.trainer}</td>
                      <td>{cls.capacity}</td>
                      <td>{cls.booked}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-light me-2">
                          Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      default:
        return <div>Select a tab to manage content</div>
    }
  }

  return (
    <div className="container py-5 mt-5">
      <h1 className="text-gradient mb-5">Admin Panel</h1>
      
      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'members' ? 'active' : ''}`}
            onClick={() => setActiveTab('members')}
          >
            Members
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'trainers' ? 'active' : ''}`}
            onClick={() => setActiveTab('trainers')}
          >
            Trainers
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'classes' ? 'active' : ''}`}
            onClick={() => setActiveTab('classes')}
          >
            Classes
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            Payments
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="card-glass p-4">
        {renderTabContent()}
      </div>
    </div>
  )
}

export default Admin