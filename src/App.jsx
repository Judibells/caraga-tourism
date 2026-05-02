import React, { useState, useEffect } from 'react';
import heroPhoto from './assets/caraga-hero.jpg'; 
import './App.css';

// --- TOURISM CONFIGURATION DATABASES ---
const STATUS_STATES = {
  OPEN:     { id: 'OPEN', label: 'All Destinations Open', dot: '#34D399' },
  PEAK:     { id: 'PEAK', label: 'Peak Surfing Season', dot: '#38bdf8' },
  MONSOON:  { id: 'MONSOON', label: 'Monsoon Advisories Active', dot: '#f59e0b' },
  CLOSED:   { id: 'CLOSED', label: 'Certain Areas Restricted', dot: '#ef4444' }
};

const THEME_STATES = {
  OCEAN:    { id: 'OCEAN', name: 'Siargao Deep Blue', sky: '#38BDF8', indigo: '#0284C7' },
  FOREST:   { id: 'FOREST', name: 'Enchanted Emerald', sky: '#34D399', indigo: '#059669' },
  SUNSET:   { id: 'SUNSET', name: 'Cloud 9 Sunset', sky: '#FBBF24', indigo: '#EA580C' },
  MYSTIC:   { id: 'MYSTIC', name: 'Dinagat Amethyst', sky: '#C084FC', indigo: '#7E22CE' }
};

const DESTINATIONS = ["Surfing Capital.", "Enchanted Rivers.", "Mystical Islands.", "Untamed Beauty."];

// --- VECTOR ICONS ---
const IconArrow = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
const IconExternal = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
const IconWave = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6 0 1.2.3 1.8.7l1.4 1c.6.4 1.2.7 1.8.7s1.2-.3 1.8-.7l1.4-1c.6-.4 1.2-.7 1.8-.7s1.2.3 1.8.7l1.4 1c.6.4 1.2.7 1.8.7s1.2-.3 1.8-.7l1.4-1c.6-.4 1.2-.7 1.8-.7"></path><path d="M2 12c.6 0 1.2.3 1.8.7l1.4 1c.6.4 1.2.7 1.8.7s1.2-.3 1.8-.7l1.4-1c.6-.4 1.2-.7 1.8-.7s1.2.3 1.8.7l1.4 1c.6.4 1.2.7 1.8.7s1.2-.3 1.8-.7l1.4-1c.6-.4 1.2-.7 1.8-.7"></path><path d="M2 18c.6 0 1.2.3 1.8.7l1.4 1c.6.4 1.2.7 1.8.7s1.2-.3 1.8-.7l1.4-1c.6-.4 1.2-.7 1.8-.7s1.2.3 1.8.7l1.4 1c.6.4 1.2.7 1.8.7s1.2-.3 1.8-.7l1.4-1c.6-.4 1.2-.7 1.8-.7"></path></svg>;
const IconDrop = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>;
const IconMap = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>;
const IconSun = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const IconLock = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  
  // Dynamic State
  const [currentStatus, setCurrentStatus] = useState(STATUS_STATES.OPEN);
  const [currentTheme, setCurrentTheme] = useState(THEME_STATES.OCEAN);

  // Security & Dev Tools State
  const [secretClicks, setSecretClicks] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    
    // 3D Text Rotator Timing
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % DESTINATIONS.length);
    }, 3000); 

    const savedStatus = localStorage.getItem('caraga_status');
    const savedTheme = localStorage.getItem('caraga_theme');
    if (savedStatus && STATUS_STATES[savedStatus]) setCurrentStatus(STATUS_STATES[savedStatus]);
    if (savedTheme && THEME_STATES[savedTheme]) setCurrentTheme(THEME_STATES[savedTheme]);
    
    return () => {
      clearTimeout(timer);
      clearInterval(roleTimer);
    };
  }, []);

  const handleSecretTrigger = () => {
    setSecretClicks(prev => prev + 1);
    if (secretClicks + 1 >= 5) {
      setShowAuthModal(true);
      setSecretClicks(0);
    }
    setTimeout(() => setSecretClicks(0), 2000);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (passwordInput === 'Judibells09222007helloaddu') {
      setIsAuthenticated(true);
      setAuthError(false);
      setPasswordInput('');
    } else {
      setAuthError(true);
      setPasswordInput('');
    }
  };

  const updateStatus = (key) => {
    setCurrentStatus(STATUS_STATES[key]);
    localStorage.setItem('caraga_status', key);
  };

  const updateTheme = (key) => {
    setCurrentTheme(THEME_STATES[key]);
    localStorage.setItem('caraga_theme', key);
  };

  return (
    <div className="prestige-root" style={{ '--accent-sky': currentTheme.sky, '--accent-indigo': currentTheme.indigo }}>
      
      {/* Zero-Lag Ambient Glow */}
      <div className="ambient-glow"></div>

      {/* --- COMMAND CENTER MODAL --- */}
      {showAuthModal && (
        <div className="command-overlay anim-fade">
          <div className="command-center">
            <div className="cmd-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IconLock /> {isAuthenticated ? 'CARAGA ADMIN PANEL' : 'AUTHORIZATION REQUIRED'}
              </span>
              <button onClick={() => setShowAuthModal(false)} className="cmd-close">×</button>
            </div>

            {!isAuthenticated ? (
              <form onSubmit={handleAuth} className="auth-form">
                <p>Enter administrator credentials to manage Region XIII alerts and site themes.</p>
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter Passphrase..." 
                  className={`auth-input ${authError ? 'input-error' : ''}`}
                  autoFocus
                />
                {authError && <span className="error-text">Access Denied. Invalid credentials.</span>}
                <button type="submit" className="btn-gradient" style={{ width: '100%', justifyContent: 'center', margin: '1rem 0 0 0' }}>Unlock System</button>
              </form>
            ) : (
              <div className="cmd-dashboard">
                <div className="cmd-section">
                  <h4>Tourism Advisory Routing</h4>
                  <div className="cmd-grid">
                    {Object.keys(STATUS_STATES).map(key => (
                      <button 
                        key={key} 
                        className={`cmd-btn ${currentStatus.id === key ? 'active' : ''}`}
                        onClick={() => updateStatus(key)}
                      >
                        <span className="dot" style={{ background: STATUS_STATES[key].dot }}></span>
                        {STATUS_STATES[key].label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cmd-section">
                  <h4>Global Site Theme</h4>
                  <div className="cmd-grid">
                    {Object.keys(THEME_STATES).map(key => (
                      <button 
                        key={key} 
                        className={`cmd-btn ${currentTheme.id === key ? 'active' : ''}`}
                        onClick={() => updateTheme(key)}
                      >
                        <span className="gradient-preview" style={{ background: `linear-gradient(135deg, ${THEME_STATES[key].sky}, ${THEME_STATES[key].indigo})` }}></span>
                        {THEME_STATES[key].name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- STANDARD UI --- */}
      <nav className="glass-nav anim-fade">
        <div className="nav-container">
          <div className="brand-logo" onClick={handleSecretTrigger} title="Admin Access">
            Caraga<span className="dot" style={{ color: currentTheme.sky }}>.</span>
          </div>
          <div className="nav-links">
            <a href="#destinations">Destinations</a>
            <a href="#plan">Plan Trip</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-grid">
          <div className={`hero-content ${isLoaded ? 'anim-slide-up' : ''}`}>
            
            <div className="status-badge" style={{ borderColor: `${currentStatus.dot}40`, background: `${currentStatus.dot}10`, color: currentStatus.dot }}>
              <span className="live-dot" style={{ background: currentStatus.dot, boxShadow: `0 0 10px ${currentStatus.dot}` }}></span>
              {currentStatus.label}
            </div>
            
            <h1 className="hero-title">
              Region XIII.<br />
              <div className="text-rotator-wrapper">
                <span key={roleIndex} className="text-gradient pop-word">
                  {DESTINATIONS[roleIndex]}
                </span>
              </div>
            </h1>
            
            <p className="hero-description">
              Discover the untouched beauty of Mindanao. From the world-class waves of Siargao to the crystal-clear depths of the Enchanted River, experience nature in its purest form.
            </p>
            
            <div className="hero-actions">
              <a href="#destinations" className="btn-gradient">
                Explore Destinations <IconArrow />
              </a>
              <a href="#plan" className="btn-outline">
                Travel Guide <IconExternal />
              </a>
            </div>
          </div>

          <div className={`hero-visual ${isLoaded ? 'anim-fade-slow' : ''}`}>
            <img src={heroPhoto} alt="Caraga Region" className="hero-image" />
          </div>
        </div>
      </header>

      {/* Destinations Bento Grid */}
      <section id="destinations" className="expertise-section">
        <div className="section-container">
          <h2 className="section-title">Key Destinations</h2>
          
          <div className="bento-grid">
            <div className="bento-card">
              <div className="card-icon"><IconWave /></div>
              <h3>Siargao Island</h3>
              <p>The Surfing Capital of the Philippines. Experience the legendary barrel waves of Cloud 9, island hop to Naked Island, and swim in the Magpupungko Rock Pools.</p>
              <div className="tech-tags">
                <span>Surfing</span><span>Nightlife</span><span>Islands</span>
              </div>
            </div>

            <div className="bento-card">
              <div className="card-icon"><IconDrop /></div>
              <h3>Enchanted River</h3>
              <p>Located in Hinatuan, Surigao del Sur. A deep, perfectly clear blue saltwater river that seemingly flows out of nowhere from a subterranean cave system.</p>
              <div className="tech-tags">
                <span>Swimming</span><span>Nature</span>
              </div>
            </div>

            <div className="bento-card">
              <div className="card-icon"><IconMap /></div>
              <h3>Dinagat Islands</h3>
              <p>A mystical province of untouched pristine beaches, towering rock formations, and rich biodiversity. Perfect for off-the-beaten-path explorers.</p>
              <div className="tech-tags">
                <span>Remote</span><span>White Sand</span>
              </div>
            </div>

            <div className="bento-card">
              <div className="card-icon"><IconSun /></div>
              <h3>Tinuy-an Falls</h3>
              <p>The "Niagara Falls of the Philippines" in Bislig City. A massive, multi-tiered waterfall spanning 95 meters wide with a stunning natural plunge pool.</p>
              <div className="tech-tags">
                <span>Waterfalls</span><span>Trekking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="plan" className="contact-section">
        <div className="section-container">
          <div className="contact-card">
            <div className="contact-header">
              <h2>Plan Your Adventure.</h2>
              <p>Get official guides, book certified local tours, and prepare for the trip of a lifetime to Region XIII.</p>
            </div>
            
            <div className="contact-links-grid">
              <a href="#" className="contact-item">
                <span className="contact-label">Official Tourism Office</span>
                <span className="contact-value">DOT Caraga Desk <IconExternal /></span>
              </a>
              <a href="#" className="contact-item">
                <span className="contact-label">Flight Info</span>
                <span className="contact-value">Sayak (IAO) / Butuan (BXU) <IconExternal /></span>
              </a>
              <a href="https://www.instagram.com/tourismcaraga" target="_blank" rel="noreferrer" className="contact-item">
                <span className="contact-label">Instagram</span>
                <span className="contact-value">@TourismCaraga <IconExternal /></span>
              </a>
              <a href="#" className="contact-item">
                <span className="contact-label">Local Transport</span>
                <span className="contact-value">Luxury Loop Routes <IconExternal /></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="prestige-footer">
        <div className="footer-container">
          <div className="footer-left">
            <span className="footer-name">© {new Date().getFullYear()} Caraga Tourism.</span>
            <span className="footer-major">Region XII • Philippines</span>
          </div>
          <div className="footer-right">
            Designed by Jude Robin P. Sumalinab
          </div>
        </div>
      </footer>
    </div>
  );
}