const API_URL = 'http://localhost:5000';

export const api = {
  // Members
  getMembers: () => fetch(`${API_URL}/members`).then(res => res.json()),
  addMember: (member) => 
    fetch(`${API_URL}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(member)
    }),
    
  // Trainers
  getTrainers: () => fetch(`${API_URL}/trainers`).then(res => res.json()),
  
  // Classes
  getClasses: () => fetch(`${API_URL}/classes`).then(res => res.json()),
  bookClass: (booking) =>
    fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    }),
    
  // Business constraint: Check if class is full
  isClassFull: async (classId) => {
    const bookings = await fetch(`${API_URL}/bookings?classId=${classId}`).then(res => res.json());
    const classInfo = await fetch(`${API_URL}/classes/${classId}`).then(res => res.json());
    return bookings.length >= classInfo.capacity;
  }
};