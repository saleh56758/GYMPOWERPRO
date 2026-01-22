import { useState } from 'react'

function Tools() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [bmiCategory, setBmiCategory] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [activityLevel, setActivityLevel] = useState('moderate')
  const [calories, setCalories] = useState(null)

  const calculateBMI = () => {
    // Business Constraint: Validate input range
    const h = parseFloat(height) / 100 // Convert cm to meters
    const w = parseFloat(weight)
    
    if (h < 0.5 || h > 2.5) {
      alert('Height must be between 50cm and 250cm')
      return
    }
    
    if (w < 10 || w > 300) {
      alert('Weight must be between 10kg and 300kg')
      return
    }
    
    if (!h || !w || h <= 0 || w <= 0) {
      alert('Please enter valid height and weight')
      return
    }
    
    const bmiValue = (w / (h * h)).toFixed(1)
    setBmi(bmiValue)
    
    // Determine category
    let category = ''
    let color = ''
    
    if (bmiValue < 18.5) {
      category = 'Underweight'
      color = '#2196F3'
    } else if (bmiValue < 25) {
      category = 'Normal'
      color = '#4CAF50'
    } else if (bmiValue < 30) {
      category = 'Overweight'
      color = '#FF9800'
    } else {
      category = 'Obese'
      color = '#F44336'
    }
    
    setBmiCategory({ text: category, color })
  }

  const calculateCalories = () => {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    const a = parseInt(age)
    
    if (!w || !h || !a) {
      alert('Please enter all details')
      return
    }
    
    // Basal Metabolic Rate calculation
    let bmr
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a)
    } else {
      bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a)
    }
    
    // Activity multiplier
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    }
    
    const dailyCalories = Math.round(bmr * multipliers[activityLevel])
    setCalories(dailyCalories)
  }

  const downloadWorkoutPlan = (level) => {
    const plans = {
      beginner: `BEGINNER WORKOUT PLAN (3 days/week)
Day 1: Full Body
- Squats: 3x10
- Push-ups: 3x8
- Rows: 3x10
- Plank: 3x30s

Day 2: Rest or Cardio
- 30 min walking/jogging

Day 3: Full Body
- Lunges: 3x10 each leg
- Dumbbell Press: 3x10
- Lat Pulldown: 3x10
- Leg Raises: 3x15

Repeat for 4 weeks`,
      
      intermediate: `INTERMEDIATE WORKOUT PLAN (4 days/week)
Day 1: Upper Body
- Bench Press: 4x8
- Pull-ups: 4x6
- Shoulder Press: 3x10
- Bicep Curls: 3x12
- Tricep Extensions: 3x12

Day 2: Lower Body
- Squats: 4x8
- Deadlifts: 3x8
- Leg Press: 3x10
- Calf Raises: 4x15

Day 3: Rest or Cardio
- HIIT: 20 mins

Day 4: Full Body
- Clean & Press: 4x6
- Dips: 3x10
- Rows: 3x10
- Plank: 3x60s`,
      
      advanced: `ADVANCED WORKOUT PLAN (5-6 days/week)
Push Day:
- Bench Press: 5x5
- Incline Press: 4x8
- Shoulder Press: 4x8
- Tricep Work: 3x10-12

Pull Day:
- Deadlifts: 5x3
- Pull-ups: 4x8
- Rows: 4x8
- Bicep Work: 3x10-12

Leg Day:
- Squats: 5x5
- Leg Press: 4x10
- RDLs: 3x10
- Lunges: 3x10 each

Repeat with variation`
    }
    
    const blob = new Blob([plans[level]], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${level}_workout_plan.txt`
    a.click()
    alert('Workout plan downloaded!')
  }

  return (
    <section id="tools" className="section-padding" style={{ background: 'var(--secondary)' }}>
      <div className="container">
        <h2 className="section-title fade-in-up">FITNESS TOOLS</h2>
        
        <div className="row">
          {/* BMI Calculator */}
          <div className="col-lg-6 mb-5 fade-in-up">
            <div className="card-glass p-4 h-100">
              <h3 className="text-gradient mb-4">BMI Calculator</h3>
              
              <div className="mb-3">
                <label className="form-label">Height (cm)</label>
                <input
                  type="number"
                  className="form-control"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter height in cm"
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label">Weight (kg)</label>
                <input
                  type="number"
                  className="form-control"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight in kg"
                />
              </div>
              
              <button className="btn btn-gradient w-100 mb-4" onClick={calculateBMI}>
                CALCULATE BMI
              </button>
              
              {bmi && (
                <div className="text-center">
                  <h4>Your BMI: <span style={{ color: bmiCategory.color }}>{bmi}</span></h4>
                  <p style={{ color: bmiCategory.color, fontWeight: '600' }}>
                    {bmiCategory.text}
                  </p>
                  <div className="bmi-scale mt-3">
                    <div className="d-flex justify-content-between">
                      <span>Underweight</span>
                      <span>Normal</span>
                      <span>Overweight</span>
                      <span>Obese</span>
                    </div>
                    <div className="progress" style={{ height: '20px' }}>
                      <div className="progress-bar" style={{ width: '18.5%', background: '#2196F3' }}></div>
                      <div className="progress-bar" style={{ width: '24%', background: '#4CAF50' }}></div>
                      <div className="progress-bar" style={{ width: '30%', background: '#FF9800' }}></div>
                      <div className="progress-bar" style={{ width: '27.5%', background: '#F44336' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Calorie Calculator */}
          <div className="col-lg-6 mb-5 fade-in-up">
            <div className="card-glass p-4 h-100">
              <h3 className="text-gradient mb-4">Calorie Calculator</h3>
              
              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">Gender</label>
                  <select 
                    className="form-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Activity Level</label>
                <select 
                  className="form-select"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                >
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="light">Light (exercise 1-3 days/week)</option>
                  <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                  <option value="active">Active (exercise 6-7 days/week)</option>
                  <option value="veryActive">Very Active (hard exercise daily)</option>
                </select>
              </div>
              
              <button className="btn btn-gradient w-100 mb-4" onClick={calculateCalories}>
                CALCULATE CALORIES
              </button>
              
              {calories && (
                <div className="text-center">
                  <h4>Daily Calorie Needs:</h4>
                  <div className="display-4" style={{ color: 'var(--primary)' }}>
                    {calories}
                  </div>
                  <p className="text-muted">calories per day</p>
                  <div className="mt-3">
                    <p>To lose weight: <strong>{Math.round(calories * 0.8)}</strong> calories/day</p>
                    <p>To gain weight: <strong>{Math.round(calories * 1.2)}</strong> calories/day</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Workout Plans */}
        <div className="fade-in-up">
          <h3 className="text-center mb-4">Download Workout Plans</h3>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-3">
              <div className="card-glass p-4 text-center">
                <h4 className="mb-3">Beginner</h4>
                <p>Perfect for those starting their fitness journey</p>
                <button 
                  className="btn btn-gradient"
                  onClick={() => downloadWorkoutPlan('beginner')}
                >
                  Download Plan
                </button>
              </div>
            </div>
            
            <div className="col-md-4 mb-3">
              <div className="card-glass p-4 text-center">
                <h4 className="mb-3">Intermediate</h4>
                <p>For those with 3-6 months of training experience</p>
                <button 
                  className="btn btn-gradient"
                  onClick={() => downloadWorkoutPlan('intermediate')}
                >
                  Download Plan
                </button>
              </div>
            </div>
            
            <div className="col-md-4 mb-3">
              <div className="card-glass p-4 text-center">
                <h4 className="mb-3">Advanced</h4>
                <p>For experienced lifters looking to push limits</p>
                <button 
                  className="btn btn-gradient"
                  onClick={() => downloadWorkoutPlan('advanced')}
                >
                  Download Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tools