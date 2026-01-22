// Format date to readable string
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Calculate BMI category
export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: 'Underweight', color: '#2196F3' }
  if (bmi < 25) return { category: 'Normal', color: '#4CAF50' }
  if (bmi < 30) return { category: 'Overweight', color: '#FF9800' }
  return { category: 'Obese', color: '#F44336' }
}

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Validate phone number
export const validatePhone = (phone) => {
  const re = /^[\+]?[1-9][\d]{0,15}$/
  return re.test(phone.replace(/[\s\-\(\)]/g, ''))
}

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Calculate age from birthdate
export const calculateAge = (birthdate) => {
  const today = new Date()
  const birthDate = new Date(birthdate)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Filter array by search term
export const filterBySearch = (array, searchTerm, fields) => {
  if (!searchTerm) return array
  
  const term = searchTerm.toLowerCase()
  return array.filter(item => 
    fields.some(field => 
      String(item[field]).toLowerCase().includes(term)
    )
  )
}

// Sort array by field
export const sortArray = (array, field, direction = 'asc') => {
  return [...array].sort((a, b) => {
    if (a[field] < b[field]) return direction === 'asc' ? -1 : 1
    if (a[field] > b[field]) return direction === 'asc' ? 1 : -1
    return 0
  })
}

// Paginate array
export const paginate = (array, page, pageSize) => {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return array.slice(start, end)
}