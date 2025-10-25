import './App.css'
import { useEffect, useRef, useState } from 'react'

function App() {
  const canvasRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let animationFrameId

    const state = {
      width: 0,
      height: 0,
      particles: [],
      lastTimestamp: 0
    }

    function resize() {
      state.width = canvas.parentElement?.clientWidth || window.innerWidth
      state.height = canvas.parentElement?.clientHeight || 400
      canvas.width = state.width
      canvas.height = state.height
    }

    function createParticles() {
      const count = Math.max(40, Math.floor(state.width / 30))
      state.particles = new Array(count).fill(0).map(() => ({
        x: Math.random() * state.width,
        y: Math.random() * state.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.8
      }))
    }

    function drawGrid() {
      const spacing = 40
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1
      for (let x = 0; x < state.width; x += spacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, state.height)
        ctx.stroke()
      }
      for (let y = 0; y < state.height; y += spacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(state.width, y)
        ctx.stroke()
      }
    }

    function tick(ts) {
      const dt = Math.min(32, ts - state.lastTimestamp)
      state.lastTimestamp = ts
      ctx.clearRect(0, 0, state.width, state.height)

      drawGrid()

      // glow
      ctx.shadowColor = 'rgba(116,139,255,0.35)'
      ctx.shadowBlur = 8

      // update and draw particles
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      state.particles.forEach(p => {
        p.x += p.vx * dt * 0.06
        p.y += p.vy * dt * 0.06
        if (p.x < 0 || p.x > state.width) p.vx *= -1
        if (p.y < 0 || p.y > state.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // connect nearby particles
      ctx.shadowBlur = 0
      for (let i = 0; i < state.particles.length; i++) {
        for (let j = i + 1; j < state.particles.length; j++) {
          const a = state.particles[i]
          const b = state.particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          const maxDist = 120
          if (d2 < maxDist * maxDist) {
            const alpha = 1 - Math.sqrt(d2) / maxDist
            ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.25})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(tick)
    }

    const handleResize = () => {
      resize()
      createParticles()
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    animationFrameId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Handle page load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Handle mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll('section')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      {/* Loading Screen */}
      <div className={`loading-screen ${isLoaded ? 'fade-out' : ''}`}>
        <div className="loading-content">
          <div className="loading-logo">
            <div className="logo-circle"></div>
            <div className="logo-text">Gift of Monterey</div>
          </div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>


      {/* Hero Section */}
      <section className="hero">
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
        <div className="hero-bg-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            <span className="badge-text">Award-Winning Luxury</span>
          </div>
          <h1 className="hero-title">
            <span className="title-line">Gift of</span>
            <span className="title-line highlight">Monterey</span>
          </h1>
          <p className="hero-subtitle">Experience Luxury at Old Monterey Inn</p>
          <p className="hero-description">
            Purchase gift cards for the award-winning Old Monterey Inn using WLD through the Unlock app
          </p>
          <div className="hero-buttons">
            <a href="https://world.org/mini-app?app_id=app_e782944e2aa46f482a7f87e188bd0349" target="_blank" rel="noopener noreferrer" className="btn btn-primary neon">
              <span className="btn-text">Open World App</span>
              <span className="btn-icon">→</span>
            </a>
            <a href="https://oldmontereyinn.com/" className="btn btn-secondary glass" target="_blank" rel="noopener noreferrer">
              <span className="btn-text">Gift Certificates</span>
              <span className="btn-icon">💎</span>
            </a>
          </div>
          <div className="hero-stats verified">
            <div className="badge-item">
              AAA Four Diamond
            </div>
            <div className="badge-item">
              Conde Nast Traveler Gold List
            </div>
            <div className="badge-item">
              Featured on Today Show
            </div>
            <div className="badge-item">
              1,000 Places to See Before You Die
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </section>

      {/* About Old Monterey Inn */}
      <section className="about-inn">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Old Monterey Inn</h2>
            <div className="section-divider"></div>
          </div>
          <div className="inn-content">
            <div className="inn-text">
              <div className="text-block">
                <p>
                  Set in the heart of beautiful Monterey, California, Old Monterey Inn is a special retreat 
                  that embodies the spirit of Old World romance. Our elegant estate transports you to another 
                  time and place, surrounded by lush English gardens and the soothing melody of water features 
                  under majestic live oak trees.
                </p>
              </div>
              <div className="text-block">
                <p>
                  Originally owned by the mayor of Monterey, this historic property has been carefully preserved 
                  to maintain its cultural significance and architectural beauty. The inn represents a perfect 
                  blend of historical charm and modern luxury.
                </p>
              </div>
            </div>
            <div className="inn-features">
              <div className="feature-card">
                <div className="feature-icon">🏆</div>
                <div className="feature-content">
                  <h3>Award Winning</h3>
                  <p>4 Diamond AAA rated with national acclaim</p>
                </div>
                <div className="feature-glow"></div>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌹</div>
                <div className="feature-content">
                  <h3>English Gardens</h3>
                  <p>Lush rose gardens and fairytale-like landscapes</p>
                </div>
                <div className="feature-glow"></div>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🏛️</div>
                <div className="feature-content">
                  <h3>Historic Charm</h3>
                  <p>Preserved cultural heritage and architectural beauty</p>
                </div>
                <div className="feature-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="image-gallery">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Experience Old Monterey Inn</h2>
            <div className="section-divider"></div>
            <p className="gallery-subtitle">Discover the beauty and elegance of our historic property</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item featured">
              <div className="gallery-image">
                <img src="/Images/garden.jpg" alt="Beautiful English Gardens at Old Monterey Inn" />
                <div className="gallery-overlay">
                  <div className="gallery-content">
                    <h3>English Gardens</h3>
                    <p>Lush rose gardens and fairytale-like landscapes</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-image">
                <img src="/Images/room.jpg" alt="Elegant Guest Room at Old Monterey Inn" />
                <div className="gallery-overlay">
                  <div className="gallery-content">
                    <h3>Elegant Rooms</h3>
                    <p>Historic charm meets modern luxury</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-image">
                <img src="/Images/dinner.jpg" alt="Fine Dining Experience at Old Monterey Inn" />
                <div className="gallery-overlay">
                  <div className="gallery-content">
                    <h3>Fine Dining</h3>
                    <p>Exceptional culinary experiences</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-image">
                <img src="/Images/mayfield.jpg" alt="Historic Mayfield House at Old Monterey Inn" />
                <div className="gallery-overlay">
                  <div className="gallery-content">
                    <h3>Historic Architecture</h3>
                    <p>Preserved cultural heritage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unlock App Section */}
      <section id="unlock-app" className="unlock-section">
        <div className="unlock-bg-pattern"></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Purchase with Unlock & WLD</h2>
            <div className="section-divider"></div>
          </div>
          <div className="unlock-content">
            <div className="unlock-steps">
              <div className="steps-header">
                <h3>How to Purchase Gift Cards</h3>
              </div>
              <div className="steps">
                <div className="step-card">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Download App</h4>
                    <p>Download the Unlock app from your app store</p>
                  </div>
                  <div className="step-arrow">↓</div>
                </div>
                <div className="step-card">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Setup Account</h4>
                    <p>Set up your World account and acquire WLD tokens</p>
                  </div>
                  <div className="step-arrow">⚙</div>
                </div>
                <div className="step-card">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Browse Cards</h4>
                    <p>Browse available Old Monterey Inn gift cards</p>
                  </div>
                  <div className="step-arrow">○</div>
                </div>
                <div className="step-card">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Complete Purchase</h4>
                    <p>Complete your purchase using WLD directly in the app</p>
                  </div>
                  <div className="step-arrow">✓</div>
                </div>
              </div>
            </div>
            <div className="unlock-benefits">
              <div className="benefits-header">
                <h3>Benefits of Using WLD</h3>
                <div className="benefits-icon">⚡</div>
              </div>
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">🚀</div>
                  <div className="benefit-text">
                    <h4>Fast Transactions</h4>
                    <p>Lightning-fast processing</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🔒</div>
                  <div className="benefit-text">
                    <h4>Secure</h4>
                    <p>Blockchain security</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">💰</div>
                  <div className="benefit-text">
                    <h4>Low Fees</h4>
                    <p>Minimal transaction costs</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🌍</div>
                  <div className="benefit-text">
                    <h4>Global Access</h4>
                    <p>Worldwide availability</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🏦</div>
                  <div className="benefit-text">
                    <h4>No Banking</h4>
                    <p>Traditional banking not required</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Certificates Section (links to official site) */}
      <section id="gift-cards" className="gift-cards-section">
        <div className="gift-cards-bg"></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Gift Certificates</h2>
            <div className="section-divider"></div>
          </div>
          <div className="gift-cards-content">
            <div className="gift-card-info">
              <div className="info-header">
                <h3>Give the Gift of Old World Charm</h3>
                <div className="info-icon">🎁</div>
              </div>
              <p>
                Treat someone special to a romantic stay at Old Monterey Inn — a luxury bed & breakfast in Monterey, California known for its lush English gardens, Old World sophistication, and intimate guest rooms.
              </p>
            </div>
            <div className="gift-card-usage">
              <div className="usage-header">
                <h3>About the Inn</h3>
                <div className="usage-icon">🏨</div>
              </div>
              <p>
                Old Monterey Inn is an award-winning, AAA Four Diamond bed and breakfast, featured on the Today Show, and listed on Condé Nast Traveler's Readers Choice Gold List and in "1,000 Places to See Before You Die."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-bg-pattern"></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Contact & Location</h2>
            <div className="section-divider"></div>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-header">
                <h3>Old Monterey Inn</h3>
                <div className="contact-icon">🏨</div>
              </div>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-item-icon">📍</div>
                  <div className="contact-item-text">
                    <h4>Address</h4>
                    <p>500 Martin Street<br />Monterey, CA 93940</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">📞</div>
                  <div className="contact-item-text">
                    <h4>Phone</h4>
                    <p>831-375-8284</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">✉️</div>
                  <div className="contact-item-text">
                    <h4>Email</h4>
                    <p>omi@oldmontereyinn.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-cta">
              <div className="cta-content">
                <h3>Ready to Experience Luxury?</h3>
                <p>Download the Unlock app today and purchase your Old Monterey Inn gift card with WLD</p>
                <a href="https://world.org/mini-app?app_id=app_e782944e2aa46f482a7f87e188bd0349" className="btn btn-primary cta-btn" target="_blank" rel="noopener noreferrer">
                  <span className="btn-text">Get Unlock App</span>
                  <span className="btn-icon">📱</span>
                </a>
              </div>
              <div className="cta-visual">
                <div className="cta-card">
                  <div className="card-shine"></div>
                  <div className="card-content">
                    <div className="card-icon">💳</div>
                    <h4>Digital Gift Card</h4>
                    <p>Purchase with WLD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-bg"></div>
        <div className="container">
          <div className="footer-content">
            <div className="footer-main">
              <div className="footer-logo">
                <h3>Gift of Monterey</h3>
                <p>Luxury redefined through cryptocurrency</p>
                <div className="social-links">
                    <a href="https://www.facebook.com/OldMontereyInn/" target="_blank" rel="noopener noreferrer" className="social-logo" aria-label="Facebook">
                      <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/oldmontereyinn/" target="_blank" rel="noopener noreferrer" className="social-logo" aria-label="Instagram">
                      <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              <div className="footer-links">
                <div className="footer-section">
                  <h4>Quick Links</h4>
                  <a href="#unlock-app">About Unlock</a>
                  <a href="#gift-cards">Gift Cards</a>
                  <a href="#contact">Contact</a>
                </div>
                <div className="footer-section">
                  <h4>Technology</h4>
                  <a href="#">World App</a>
                  <a href="#">WLD Token</a>
                  <a href="#">Blockchain</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2025 Gift of Monterey. Powered by Unlock.</p>
              <p>Experience the luxury of Old Monterey Inn with cryptocurrency convenience.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
