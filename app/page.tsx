import Navbar from "./components/Navbar";
import "./page.css";

export default function Home() {
  return (
    <main>

      <Navbar />

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-content">

          <p className="eyebrow">
            PROFESSIONAL TECHNOLOGY SERVICES
          </p>

          <h1>
            Smart Electrical &amp;
            <br />
            Technology Solutions
          </h1>

          <p className="hero-description">
            Reliable electrical, electronics, solar, networking
            and technology services in Nakuru and beyond.
          </p>

          <div className="hero-buttons">
            <a href="#booking" className="primary-button">
              Book a Service
            </a>

            <a href="#services" className="secondary-button">
              Our Services
            </a>
          </div>

        </div>
      </section>


      {/* ABOUT */}
      <section id="about" className="section about-section">

        <p className="section-label">
          ABOUT US
        </p>

        <h2>
          Dr Doi Technologies
        </h2>

        <p>
          Dr Doi Technologies provides professional electrical,
          electronics, solar, networking and ICT solutions for
          homes, businesses and organizations in Nakuru and
          surrounding areas.
        </p>

        <p>
          Our goal is to provide reliable, affordable and
          innovative technology solutions that solve real-world
          problems.
        </p>

      </section>


      {/* SERVICES */}
      <section id="services" className="section services-section">

        <p className="section-label">
          OUR SERVICES
        </p>

        <h2>
          What We Do
        </h2>

        <div className="services-grid">

          <div className="service-card">
            <div className="service-icon">⚡</div>
            <h3>Electrical Services</h3>
            <p>
              Electrical installation, maintenance,
              troubleshooting and repair services.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">☀️</div>
            <h3>Solar Solutions</h3>
            <p>
              Solar installation, maintenance and
              energy solutions for homes and businesses.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">🔌</div>
            <h3>Electronics Repair</h3>
            <p>
              Diagnosis, repair and maintenance of
              electronic equipment and systems.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">🌐</div>
            <h3>Networking &amp; ICT</h3>
            <p>
              Wi-Fi, Ethernet networking, computer
              and ICT installation services.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">🛠️</div>
            <h3>Technology Solutions</h3>
            <p>
              Smart technology, automation and
              customized technology solutions.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">🔧</div>
            <h3>Maintenance &amp; Repair</h3>
            <p>
              Professional troubleshooting and
              maintenance for electrical and technology systems.
            </p>
          </div>

        </div>

      </section>


      {/* BOOKING */}
      <section id="booking" className="booking-section">

        <div className="booking-content">

          <p className="section-label">
            NEED OUR SERVICES?
          </p>

          <h2>
            Book a Service Today
          </h2>

          <p>
            Contact Dr Doi Technologies for reliable
            electrical, solar, electronics and ICT services.
          </p>

          <a
            href="https://wa.me/254114280995?text=Hello%20Dr%20Doi%20Technologies%2C%20I%20would%20like%20to%20book%20a%20service."
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button"
          >
            Book via WhatsApp
          </a>

        </div>

      </section>


      {/* CONTACT */}
      <section id="contact" className="section contact-section">

        <p className="section-label">
          CONTACT US
        </p>

        <h2>
          Dr Doi Technologies
        </h2>

        <p>
          Nakuru, Kenya
        </p>

        <p>
          Electrical • Electronics • Solar • ICT Solutions
        </p>

        <a
          href="https://wa.me/254114280995"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-button"
        >
          WhatsApp Us
        </a>

      </section>


      {/* FOOTER */}
      <footer className="footer">

        <p>
          © {new Date().getFullYear()} Dr Doi Technologies.
          All rights reserved.
        </p>

        <p>
          Electrical • Electronics • Solar • ICT Solutions
        </p>

      </footer>

    </main>
  );
}
