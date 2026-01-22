import { useState } from 'react'

function Membership() {
  const [plans] = useState([
    {
      id: 1,
      name: 'BASIC',
      price: 29,
      duration: 'month',
      features: [
        'Full Gym Access',
        'Locker Room',
        'Free Wi-Fi',
        'Basic Classes',
        'No Contract'
      ],
      popular: false
    },
    {
      id: 2,
      name: 'PRO',
      price: 59,
      duration: 'month',
      features: [
        'All Basic Features',
        'All Group Classes',
        'Personal Trainer (2 sessions/month)',
        'Nutrition Plan',
        'Guest Pass (2/month)',
        'No Contract'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'ELITE',
      price: 99,
      duration: 'month',
      features: [
        'All Pro Features',
        'Unlimited Personal Training',
        '24/7 Access',
        'Guest Passes (Unlimited)',
        'Massage Therapy (2/month)',
        'Premium Locker',
        'No Contract'
      ],
      popular: false
    }
  ])

  const [billingCycle, setBillingCycle] = useState('monthly')

  const calculatePrice = (price) => {
    if (billingCycle === 'annual') {
      return Math.round(price * 12 * 0.8) // 20% discount
    }
    return price
  }

  const handleSelectPlan = (plan) => {
    // Business Constraint: Check if user is trying to downgrade
    const currentPlan = localStorage.getItem('currentPlan')
    if (currentPlan && currentPlan === 'PRO' && plan.name === 'BASIC') {
      alert('Cannot downgrade from PRO to BASIC plan mid-cycle')
      return
    }
    
    alert(`Selected ${plan.name} plan for $${calculatePrice(plan.price)}!`)
    localStorage.setItem('currentPlan', plan.name)
  }

  return (
    <section id="membership" className="section-padding" style={{ background: 'var(--secondary)' }}>
      <div className="container">
        <h2 className="section-title fade-in-up">MEMBERSHIP PLANS</h2>
        
        <div className="text-center mb-5 fade-in-up">
          <div className="btn-group" role="group">
            <button
              className={`btn ${billingCycle === 'monthly' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly Billing
            </button>
            <button
              className={`btn ${billingCycle === 'annual' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setBillingCycle('annual')}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="membership-cards">
          {plans.map((plan, index) => (
            <div 
              key={plan.id} 
              className={`card-glass membership-card fade-in-up`}
              style={{ animationDelay: `${index * 0.2}s`, position: 'relative' }}
            >
              {plan.popular && (
                <div className="popular-badge">MOST POPULAR</div>
              )}
              
              <h3 className="text-gradient" style={{ fontSize: '2rem', fontWeight: '700' }}>
                {plan.name}
              </h3>
              
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">{calculatePrice(plan.price)}</span>
                <span className="period">/{billingCycle === 'annual' ? 'year' : 'month'}</span>
              </div>
              
              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              
              <button
                className="btn btn-gradient w-100"
                onClick={() => handleSelectPlan(plan)}
              >
                SELECT PLAN
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Membership