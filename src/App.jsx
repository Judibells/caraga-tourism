import React, { useState, useEffect } from 'react';
import { MapPin, Moon, Sun, X, Compass, ArrowUpRight, Zap, Camera, Shield, Globe, Navigation } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import './App.css';

const destinationsData = [
  { 
    id: 1, title: "Pusan Point", category: "Landmark", img: "/pusan-point.jpg", coords: "7.2861,126.5803", 
    desc: "The easternmost inland point of the Philippines. Witness the very first sunrise in the country by the rugged limestone cliffs. It houses a historic lighthouse and ruins that date back decades.",
    route: "Travel through Brgy. Santiago. The road is scenic but rugged. Local habal-habal drivers are available at the Poblacion." 
  },
  { 
    id: 2, title: "Kapuka Falls", category: "Nature", img: "/kapuka-falls.jpg", coords: "7.4429756,126.4410606", 
    desc: "A majestic veil of turquoise water hidden within the lush limestone forests. It remains a pristine sanctuary for eco-adventurers seeking the untouched beauty of Caraga.",
    route: "Register at Lamiawan Brgy. Hall. Take a habal-habal to Sitio Gab, followed by a guided jungle trek." 
  },
  { 
    id: 3, title: "San Salvador Church", category: "Heritage", img: "/san-salvador-church.jpg", coords: "7.3276903,126.5660034", 
    desc: "Built in 1884 using coral stones and egg whites as binder. One of the oldest and best-preserved stone churches in the Davao Region, standing as a testament to local faith and history.",
    route: "Located at the heart of the Caraga Poblacion. An iconic landmark visible from the main highway." 
  },
  { 
    id: 4, title: "Batinao's Haven", category: "Relax", img: "/batinao-haven.jpg", coords: "7.3345909,126.4668172", 
    desc: "A cold, crystal-clear river resort providing a natural hydromassage and a cooling escape from the tropical sun. It is a favorite local sanctuary for relaxation.",
    route: "Hired tricycles or habal-habal from the town center provide easy access to this forested river park." 
  }
];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isReady, setIsReady] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const timer = setTimeout(() => setIsReady(true), 2500);
    return () => clearTimeout(timer);
  }, [theme]);

  const handleNavigate = (coords) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${coords}`, '_blank');
  };

  return (
    <div className="app-container">
      <div className="noise-overlay"></div>
      <motion.div className="progress-bar" style={{ scaleX }} />

      <AnimatePresence>
        {!isReady && (
          <motion.div className="preloader" exit={{ y: "-100%" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
            <div className="loader-box">
              <h1 className="glitch">CARAGA</h1>
              <div className="load-bar"><motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2 }} className="fill" /></div>
              <p>ENGINEERED BY JUDE ROBIN P. SUMALINAB</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="elite-nav">
        <h1>CARAGA<span>2026</span></h1>
        <div className="nav-links">
          <a href="#expedition">Expedition</a>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="theme-btn">
            {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
          </button>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-img" style={{ backgroundImage: `url('/pusan-point.jpg')` }}></div>
        <div className="hero-overlay"></div>
        <motion.div className="hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8 }}>
          <div className="tagline"><Compass size={16}/> EASTERNMOST FRONTIER</div>
          <h2>THE FIRST <span>LIGHT</span></h2>
          <p>A premier digital manifest documenting the pristine beauty of Caraga, Davao Oriental.</p>
        </motion.div>
      </header>

      <section className="intel-section">
        <div className="intel-header">
          <span>01 / CORE INTEL</span>
          <h2>CULTURAL MANIFEST</h2>
        </div>
        <div className="intel-grid">
          <div className="intel-card">
            <Camera size={32} color="var(--highlight)" />
            <h3>Visual Heritage</h3>
            <p>Capturing the rugged limestone textures and Pacific horizons. This project serves as a visual repository for the province's unique aesthetic signature.</p>
          </div>
          <div className="intel-card">
            <Shield size={32} color="var(--highlight)" />
            <h3>Ancestral Roots</h3>
            <p>Respecting the Mandaya heritage that forms the foundation of Caraga. We document the stone structures that have survived for centuries.</p>
          </div>
          <div className="intel-card">
            <Globe size={32} color="var(--highlight)" />
            <h3>Eco-Strategy</h3>
            <p>Advocating for untouched nature. This digital guide encourages responsible exploration of hidden sanctuaries.</p>
          </div>
        </div>
      </section>

      <main id="expedition" className="grid-section">
        <h2 className="section-title">THE EXHIBITS</h2>
        <div className="dest-grid">
          {destinationsData.map(spot => (
            <motion.div key={spot.id} className="card" whileHover={{ y: -15 }} onClick={() => setSelectedSpot(spot)}>
              <div className="card-img" style={{ backgroundImage: `url('${spot.img}')` }}>
                <div className="card-grad"></div>
                <span className="cat-badge">{spot.category}</span>
              </div>
              <div className="card-body">
                <h3>{spot.title}</h3>
                <ArrowUpRight className="icon" />
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <section className="transit-section">
        <div className="transit-container">
          <div className="transit-info">
            <span className="tag">02 / LOGISTICS</span>
            <h2>TRANSIT PROTOCOL</h2>
            <p>Due to current regional shifts, fixed fare prices are omitted. Please coordinate with terminal dispatchers for updated rates.</p>
          </div>
          <div className="transit-rows">
            <div className="row"><span>DIRECT VAN (VICTORIA PLAZA)</span><strong>~5.0H</strong></div>
            <div className="row"><span>VAN TRANSFER (VIA MATI CITY)</span><strong>~7.0H</strong></div>
            <div className="row"><span>BACHELOR TOURS (DCOTT)</span><strong>~9.0H</strong></div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedSpot && (
          <motion.div className="modal-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedSpot(null)}>
            <motion.div className="modal-content" initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} onClick={e => e.stopPropagation()}>
              <button className="close" onClick={() => setSelectedSpot(null)}><X /></button>
              <div className="modal-img" style={{ backgroundImage: `url('${selectedSpot.img}')` }}></div>
              <div className="modal-text">
                <span className="label">{selectedSpot.category}</span>
                <h2>{selectedSpot.title}</h2>
                <p>{selectedSpot.desc}</p>
                <button className="nav-trigger" onClick={() => handleNavigate(selectedSpot.coords)}>
                  <Navigation size={18} /> START GOOGLE MAPS NAVIGATION
                </button>
                <div className="route-box">
                  <MapPin size={20} color="var(--highlight)" />
                  <span>{selectedSpot.route}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
{/* GMAIL-DIRECT CONTACT */}
<section className="contact-small">
  <div className="contact-wrap">
    <div className="gateway-label">
      <Zap size={14} color="var(--highlight)" />
      <span>OFFICIAL GATEWAY</span>
    </div>
    <a 
      href="https://mail.google.com/mail/?view=cm&fs=1&to=jrsumalinab@gmail.com" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="small-email"
    >
      jrsumalinab@gmail.com
    </a>
  </div>
</section>

      <footer className="footer">
        <div className="footer-top">
          <div className="brand">CARAGA<span>2026</span></div>
          <div className="credit">
            <p>LEAD SOFTWARE ENGINEER</p>
            <h3>JUDE ROBIN P. SUMALINAB</h3>
          </div>
        </div>
        <div className="footer-bottom">
          <p>SECTION CS1A • ADDU COMPUTER SCIENCE</p>
          <div className="stack">REACT • FRAMER MOTION • GOOGLE MAPS API</div>
        </div>
      </footer>
    </div>
  );
}