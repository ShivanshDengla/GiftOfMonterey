import './App.css'

function App() {
  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Gift of Monterey</h1>
          <p className="hero-subtitle">Experience Luxury at Old Monterey Inn</p>
          <p className="hero-description">
            Purchase gift cards for the award-winning Old Monterey Inn using WLD through the Unlock app
          </p>
          <div className="hero-buttons">
            <a href="#unlock-app" className="btn btn-primary">Learn About Unlock</a>
            <a href="#gift-cards" className="btn btn-secondary">Gift Card Info</a>
          </div>
        </div>
      </section>

      {/* About Old Monterey Inn */}
      <section className="about-inn">
        <div className="container">
          <h2>About Old Monterey Inn</h2>
          <div className="inn-content">
            <div className="inn-text">
              <p>
                Set in the heart of beautiful Monterey, California, Old Monterey Inn is a special retreat 
                that embodies the spirit of Old World romance. Our elegant estate transports you to another 
                time and place, surrounded by lush English gardens and the soothing melody of water features 
                under majestic live oak trees.
              </p>
              <p>
                Originally owned by the mayor of Monterey, this historic property has been carefully preserved 
                to maintain its cultural significance and architectural beauty. The inn represents a perfect 
                blend of historical charm and modern luxury.
              </p>
            </div>
            <div className="inn-features">
              <div className="feature">
                <h3>🏆 Award Winning</h3>
                <p>4 Diamond AAA rated with national acclaim</p>
              </div>
              <div className="feature">
                <h3>🌹 English Gardens</h3>
                <p>Lush rose gardens and fairytale-like landscapes</p>
              </div>
              <div className="feature">
                <h3>🏛️ Historic Charm</h3>
                <p>Preserved cultural heritage and architectural beauty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unlock App Section */}
      <section id="unlock-app" className="unlock-section">
        <div className="container">
          <h2>Purchase with Unlock & WLD</h2>
          <div className="unlock-content">
            <div className="unlock-text">
              <h3>What is Unlock?</h3>
              <p>
                Unlock is a revolutionary app in the World ecosystem that enables seamless digital payments 
                using WLD (World Token). It's designed to make cryptocurrency transactions as simple as 
                traditional payments.
              </p>
              <h3>How to Purchase Gift Cards</h3>
              <div className="steps">
                <div className="step">
                  <span className="step-number">1</span>
                  <p>Download the Unlock app from your app store</p>
                </div>
                <div className="step">
                  <span className="step-number">2</span>
                  <p>Set up your World account and acquire WLD tokens</p>
                </div>
                <div className="step">
                  <span className="step-number">3</span>
                  <p>Browse available Old Monterey Inn gift cards</p>
                </div>
                <div className="step">
                  <span className="step-number">4</span>
                  <p>Complete your purchase using WLD directly in the app</p>
                </div>
              </div>
            </div>
            <div className="unlock-benefits">
              <h3>Benefits of Using WLD</h3>
              <ul>
                <li>✅ Fast and secure transactions</li>
                <li>✅ Lower transaction fees</li>
                <li>✅ Global accessibility</li>
                <li>✅ Transparent blockchain technology</li>
                <li>✅ No traditional banking required</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Cards Section */}
      <section id="gift-cards" className="gift-cards-section">
        <div className="container">
          <h2>Gift Cards for Old Monterey Inn</h2>
          <div className="gift-cards-content">
            <div className="gift-card-info">
              <h3>Perfect for Any Occasion</h3>
              <p>
                Our gift cards are perfect for romantic getaways, anniversaries, honeymoons, 
                or simply treating someone special to a luxurious Monterey experience.
              </p>
              <div className="gift-card-features">
                <div className="feature-item">
                  <h4>🎁 Flexible Amounts</h4>
                  <p>Choose any amount that fits your budget</p>
                </div>
                <div className="feature-item">
                  <h4>📅 No Expiration</h4>
                  <p>Gift cards never expire, giving recipients flexibility</p>
                </div>
                <div className="feature-item">
                  <h4>💎 Luxury Experience</h4>
                  <p>Access to all inn amenities and services</p>
                </div>
              </div>
            </div>
            <div className="gift-card-usage">
              <h3>How to Use Your Gift Card</h3>
              <ol>
                <li>Present your digital gift card at check-in</li>
                <li>Apply the credit to your room, dining, or spa services</li>
                <li>Enjoy the full Old Monterey Inn experience</li>
                <li>Any remaining balance stays on the card for future visits</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2>Contact & Location</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Old Monterey Inn</h3>
              <p>500 Martin Street<br />
              Monterey, CA 93940</p>
              <p>Phone: 831-375-8284</p>
              <p>Email: omi@oldmontereyinn.com</p>
            </div>
            <div className="contact-cta">
              <h3>Ready to Experience Luxury?</h3>
              <p>Download the Unlock app today and purchase your Old Monterey Inn gift card with WLD</p>
              <a href="#" className="btn btn-primary">Get Unlock App</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Gift of Monterey. Powered by Unlock & World App.</p>
          <p>Experience the luxury of Old Monterey Inn with cryptocurrency convenience.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
