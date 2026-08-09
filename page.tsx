import "./page.css";
import Navbar from "./components/Navbar";

const services = [
  ["Refrigerator Repair", "All types of fridges repaired.", "❄️"],
  ["Air Conditioner Repair", "Installation, servicing & repair.", "❄️"],
  ["Washing Machine Repair", "Top and front-load machines.", "◉"],
  ["TV Repair", "LED, LCD, Smart TVs & more.", "▣"],
  ["Woofer & Home Theatre", "Repair of audio systems.", "🔊"],
  ["Electric Fan Repair", "All types of fans serviced.", "✥"],
  ["Electric Kettle Repair", "Boiling issues fixed.", "♨"],
  ["Motor & Water Pump Repair", "All motor and pump types.", "⚙"],
  ["Solar Installation", "Solar systems setup.", "☀️"],
  ["Solar Water Heater", "Energy-saving solutions.", "♨"],
  ["Electrical Wiring", "Domestic & commercial installations.", "⌂"],
  ["CCTV Installation", "Security systems you can trust.", "◉"],
  ["Computer & Laptop Repair", "Hardware & software solutions.", "▣"],
  ["Printer Repair", "All printer types.", "▤"],
  ["Wi-Fi & Networking", "Home & office network solutions.", "⌁"],
  ["3D AutoCAD Design", "3D modelling & design.", "CAD"],
  ["Architectural Drawings", "Plans, layouts & engineering drawings.", "▥"],
  ["ICT Support", "IT solutions for homes & businesses.", "▦"],
];

const reasons = [
  ["✓", "Quality Workmanship", "We deliver work that lasts."],
  ["₵", "Affordable Pricing", "Competitive prices for all."],
  ["◷", "On-Time Service", "We respect your time."],
  ["♙", "Customer Satisfaction", "Your satisfaction is our priority."],
  ["✓", "Trusted & Reliable", "A name you can trust in Nakuru."],
];

export default function Home() {
  return (
    <main>
      <Navbar />

      <section id="home" className="hero">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="welcome">WELCOME TO</div>
          <h1>
            DR DOI
            <span>TECHNOLOGIES</span>
          </h1>
          <p>
            Professional Electrical, Electronics, ICT & Engineering Solutions
            <br />
            in Nakuru and its Environs.
          </p>

          <div className="hero-points">
            <span>✓ Reliable</span>
            <span>♙ Affordable</span>
            <span>✓ Professional</span>
            <span>◷ On-Time</span>
          </div>

          <div className="hero-buttons">
            <a
              className="btn whatsapp"
              href="https://wa.me/254740568226?text=Hello%20Dr%20Doi%20Technologies,%20I%20would%20like%20to%20book%20a%20service."
              target="_blank"
              rel="noopener noreferrer"
            >
              ◉ &nbsp; Book a Service
            </a>
            <a className="btn call" href="tel:+254740568226">
              ☎ &nbsp; Call Now
            </a>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="electric-ring">⚡</div>
          <div className="circuit circuit-one" />
          <div className="circuit circuit-two" />
          <div className="circuit circuit-three" />
          <div className="tool-card">⚙<br /><small>POWER • CONTROL • ICT</small></div>
        </div>
      </section>

      <section className="stats">
        <div><strong>500+</strong><span>Happy Clients</span></div>
        <div><strong>1000+</strong><span>Projects Completed</span></div>
        <div><strong>5+</strong><span>Years Experience</span></div>
        <div><strong>24/7</strong><span>Support Available</span></div>
      </section>

      <section id="about" className="section about">
        <div className="section-heading">
          <small>ABOUT US</small>
          <h2>Why Choose <span>Dr Doi Technologies?</span></h2>
        </div>
        <div className="about-layout">
          <div className="about-text">
            <p>
              We are a trusted and professional technical team providing
              affordable, reliable and high-quality engineering solutions to
              homes, offices and businesses in Nakuru and its environs.
            </p>
            <p>
              From appliance repair and electrical installation to solar,
              CCTV, networking and engineering design, we bring practical
              solutions directly to our customers.
            </p>
            <a className="small-btn" href="#services">Explore Services →</a>
          </div>
          <div className="about-badge">
            <div className="big-bolt">⚡</div>
            <strong>DR DOI</strong>
            <span>TECHNOLOGIES</span>
            <small>Electrical • Electronics • ICT Solutions</small>
          </div>
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="section-heading center">
          <small>OUR SERVICES</small>
          <h2>What <span>We Offer</span></h2>
        </div>

        <div className="services-grid">
          {services.map(([title, description, icon]) => (
            <article className="service-card" key={title}>
              <div className="service-icon">{icon}</div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-strip">
        {reasons.map(([icon, title, text]) => (
          <div key={title}>
            <b>{icon}</b>
            <span><strong>{title}</strong>{text}</span>
          </div>
        ))}
      </section>

      <section id="gallery" className="section gallery-section">
        <div className="section-heading">
          <small>OUR WORK</small>
          <h2>Service <span>Gallery</span></h2>
        </div>
        <div className="gallery-grid">
          <div className="gallery-item electrical">ELECTRICAL<br /><strong>INSTALLATION</strong></div>
          <div className="gallery-item solar">SOLAR<br /><strong>SOLUTIONS</strong></div>
          <div className="gallery-item cctv">CCTV<br /><strong>SECURITY</strong></div>
          <div className="gallery-item cooling">AC &<br /><strong>REFRIGERATION</strong></div>
          <div className="gallery-item ict">ICT &<br /><strong>NETWORKING</strong></div>
          <div className="gallery-item design">3D<br /><strong>DESIGN</strong></div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div>
          <small>GET IN TOUCH</small>
          <h2>Need a Repair<br />or Installation?</h2>
          <p>We are ready to help. Book a service via WhatsApp or call us directly.</p>
        </div>
        <div className="contact-actions">
          <a
            className="btn whatsapp"
            href="https://wa.me/254740568226?text=Hello%20Dr%20Doi%20Technologies,%20I%20need%20a%20service."
            target="_blank"
            rel="noopener noreferrer"
          >
            ◉ &nbsp; Chat on WhatsApp
          </a>
          <a className="btn call" href="tel:+254740568226">☎ &nbsp; Call: 0740 568 226</a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <img src="/images/logo.svg" alt="Dr Doi Technologies logo" />
          <p>Professional solutions for homes and businesses.</p>
        </div>

        <div>
          <h3>QUICK LINKS</h3>
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </div>

        <div>
          <h3>OUR SERVICES</h3>
          <span>Electrical Services</span>
          <span>Electronics Repair</span>
          <span>ICT Solutions</span>
          <span>Solar Solutions</span>
          <span>CCTV & Security</span>
          <span>AutoCAD & Designs</span>
        </div>

        <div>
          <h3>CONTACT US</h3>
          <span>☎ 0740 568 226</span>
          <span>☎ 0114 280 995</span>
          <span>✉ drdoitechnologies@gmail.com</span>
          <span>⌖ Nakuru, Kenya</span>
        </div>
      </footer>

      <div className="copyright">
        © {new Date().getFullYear()} Dr Doi Technologies. All Rights Reserved.
      </div>

      <a
        className="floating-whatsapp"
        href="https://wa.me/254740568226"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        ◉
      </a>
    </main>
  );
}
